import { analyzeSources, formatInstant, safeUrl } from './analyzer.js';
import { samples } from './samples.js';

const $ = id => document.getElementById(id);
let report = null;
let selectedId = '';
let checked = new Set();
let synthetic = false;
const el = (tag, className, value) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
};

function invalidate() {
  report = null; selectedId = ''; checked = new Set();
  $('report').hidden = true;
  $('export-calendar').disabled = true;
  $('status').textContent = 'Sources changed. Trace the rules again to rebuild the report.';
}
for (const control of $('source-form').querySelectorAll('input, textarea')) control.addEventListener('input', () => {
  invalidate();
  if (synthetic) $('sample-notice').textContent = 'Synthetic example or edited example — check all facts before treating this as a real event.';
});

function loadSample(name) {
  const sample = samples[name];
  invalidate(); synthetic = true;
  for (const [id,value] of Object.entries({ 'main-label':sample.label, 'main-url':sample.url, 'main-text':sample.text, 'update-label':sample.updateLabel, 'update-url':sample.updateUrl, 'update-text':sample.update })) $(id).value = value;
  $('sample-notice').hidden = false;
  $('sample-notice').textContent = 'Synthetic example — invented event, dates and prizes. Not the rules of any real competition.';
  $('form-error').hidden = true;
  $('status').textContent = 'Example loaded. Choose “Trace the rules” to analyze the actual text.';
  $('main-text').focus();
}
$('sample-conflict').addEventListener('click', () => loadSample('conflict'));
$('sample-ambiguous').addEventListener('click', () => loadSample('ambiguous'));

$('source-form').addEventListener('submit', event => {
  event.preventDefault();
  $('form-error').hidden = true;
  try {
    if (!$('main-text').value.trim()) throw new Error('Paste the main rules, or load a synthetic example.');
    for (const id of ['main-url','update-url']) if ($(id).value.trim() && !safeUrl($(id).value)) throw new Error('Source links must be valid HTTP or HTTPS URLs without usernames or passwords.');
    report = analyzeSources([
      { label:$('main-label').value, url:$('main-url').value, text:$('main-text').value },
      { label:$('update-label').value, url:$('update-url').value, text:$('update-text').value },
    ]);
    selectedId = ''; checked = new Set();
    renderReport();
    $('status').textContent = `${report.evidence.length} candidate evidence passages found. Review the original text and all warnings.`;
    $('report').hidden = false;
    $('report').focus({ preventScroll:true });
    $('report').scrollIntoView({ behavior:'smooth', block:'start' });
  } catch (error) {
    invalidate(); $('form-error').textContent = error.message; $('form-error').hidden = false;
    $('status').textContent = 'No report generated.';
  }
});

function evidenceButton(item) {
  const source = report.sources.find(s => s.id === item.sourceId);
  const button = el('button', 'evidence-ref', `[${item.evidenceId || item.id}] ${source.label} ↗`);
  button.type = 'button';
  button.addEventListener('click', () => openEvidence(item));
  return button;
}
function openEvidence(item) {
  const source = report.sources.find(s => s.id === item.sourceId);
  $('evidence-title').textContent = source.label;
  $('evidence-location').textContent = `Evidence ${item.evidenceId || item.id} · characters ${item.start+1}–${item.end} · pasted source`;
  $('evidence-link').replaceChildren();
  if (source.url) {
    const a = el('a', 'small', source.url); a.href = source.url; a.target='_blank'; a.rel='noopener noreferrer';
    $('evidence-link').append(a);
  }
  const mark = el('mark', '', source.text.slice(item.start,item.end));
  $('source-context').replaceChildren(document.createTextNode(source.text.slice(0,item.start)), mark, document.createTextNode(source.text.slice(item.end)));
  $('evidence-dialog').showModal();
  mark.scrollIntoView({ block:'center' });
}
$('close-evidence').addEventListener('click', () => $('evidence-dialog').close());

function renderReport() {
  $('report-summary').replaceChildren();
  for (const [number,label] of [[report.sources.length,'sources'],[report.evidence.length,'evidence candidates'],[report.warnings.length,'review flags']]) {
    const item=el('span'); item.append(el('strong','',String(number)), document.createTextNode(label)); $('report-summary').append(item);
  }
  $('warnings').replaceChildren(...report.warnings.map(w => {
    const node = el('div','warning'); node.append(el('span','warning-symbol','!'),el('span','',w.text)); return node;
  }));
  renderDeadlines();
  for (const category of ['eligibility','prize','submission']) {
    const items = report.evidence.filter(e => e.category === category);
    $(category).replaceChildren(...items.map(item => {
      const card = el('article','evidence-card');
      if (item.prizeType) card.append(el('span','tag',item.prizeType));
      card.append(el('p','',item.quote),evidenceButton(item)); return card;
    }));
    if (!items.length) $(category).append(el('p','empty','No candidate found. Check the full official source; this is not a statement that no condition applies.'));
  }
  renderTasks();
}

function renderDeadlines() {
  $('deadlines').replaceChildren();
  for (const item of report.deadlines) {
    const row = el('div','date-option');
    const radio = el('input'); radio.type='radio'; radio.name='deadline'; radio.id=`choose-${item.id}`; radio.value=item.id; radio.disabled=!item.instant; radio.checked=item.id === selectedId;
    const content=el('div');
    const label=el('label','',formatInstant(item.instant,$('display-zone').value)); label.htmlFor=radio.id;
    label.append(el('span','date-original',item.matched || item.quote));
    content.append(label);
    if (!item.instant) content.append(el('p','reason',item.reason));
    content.append(evidenceButton(item));
    radio.addEventListener('change', () => { selectedId=item.id; updateSelection(); });
    row.append(radio,content); $('deadlines').append(row);
  }
  if (!report.deadlines.length) $('deadlines').append(el('p','empty','No deadline evidence found. Calendar export is unavailable.'));
  updateSelection();
}
function updateSelection() {
  const selected=report?.deadlines.find(d=>d.id===selectedId);
  $('selection-summary').textContent=selected ? `Your selected deadline: ${formatInstant(selected.instant,$('display-zone').value)}. Other evidence and warnings remain in the report.` : 'No deadline selected. Inspect the evidence before choosing.';
  $('export-calendar').disabled = !selected?.instant;
}
$('display-zone').addEventListener('change', () => { if(report) renderDeadlines(); });

function renderTasks() {
  $('tasks').replaceChildren(...report.tasks.map(task => {
    const row=el('div','task'); const checkbox=el('input'); checkbox.type='checkbox'; checkbox.id=task.id; checkbox.checked=checked.has(task.id);
    const content=el('div'); const label=el('label'); label.htmlFor=task.id;
    label.append(el('span','task-kind',task.kind),document.createTextNode(task.text)); content.append(label);
    if(task.evidenceId) content.append(evidenceButton(report.evidence.find(e=>e.id===task.evidenceId)));
    checkbox.addEventListener('change',()=>{if(checkbox.checked) checked.add(task.id);else checked.delete(task.id);row.classList.toggle('done',checkbox.checked);updateProgress();});
    row.append(checkbox,content);return row;
  }));
  updateProgress();
}
function updateProgress(){ $('task-progress').textContent=`${checked.size} / ${report.tasks.length} checked by you`; }

// Export handlers are added in the next verified slice.
