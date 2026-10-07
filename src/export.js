// Export is a local file operation. It never submits to a contest or calendar service.
import { formatInstant } from './analyzer.js';
function plain(value) { return String(value).replace(/[\r\n]+/g,' ').replace(/[\\`*_{}\[\]<>#|]/g,'\\$&'); }
function selectedDeadline(report,id) {
  const item=report.deadlines.find(d=>d.id===id);
  if(!item?.instant || !Number.isFinite(Date.parse(item.instant))) throw new Error('Select a supported, explicit deadline after checking its source.');
  return item;
}
export function markdownReport(report,{selectedId='',zone='UTC',checked=new Set(),synthetic=false,now=new Date()}={}) {
  const lines=['# RuleTrace — evidence & preparation report','',`Generated: ${now.toISOString()}`,`Example data: ${synthetic ? 'YES — synthetic or edited example; not real competition rules.' : 'User-supplied text; not independently verified.'}`,'','Bounded English candidate extraction, not legal advice or a completeness guarantee. No model was called. Source links were supplied by the user and were not fetched. Check marks are user-reported progress.','', '## Deadline choice',''];
  const selected=report.deadlines.find(d=>d.id===selectedId && d.instant);
  if(selected) lines.push(`User selected: ${formatInstant(selected.instant,zone)} (${zone})`, `UTC instant: ${selected.instant}`, `Evidence: [${selected.evidenceId}] ${plain(selected.matched)}`, 'This is a user selection, not verification of the official deadline.');
  else lines.push('No deadline selected. Calendar export unavailable.');
  lines.push('','## Unresolved questions and review flags','');
  if(report.warnings.length) for(const w of report.warnings) lines.push(`- ${plain(w.text)}`);
  else lines.push('- No category-level flags detected. This does not establish completeness or correctness.');
  lines.push('','## All deadline candidates','');
  for(const d of report.deadlines) lines.push(`- [${d.evidenceId}] ${d.instant ? `${d.instant} — ${plain(d.matched)}` : `UNRESOLVED — ${plain(d.reason)}`}`);
  lines.push('','## Preparation checklist','');
  for(const task of report.tasks) lines.push(`- [${checked.has(task.id)?'x':' '}] ${plain(task.kind)}: ${plain(task.text)}${task.evidenceId?` [${task.evidenceId}]`:''}`);
  lines.push('','## Evidence register','');
  for(const e of report.evidence) {
    const s=report.sources.find(s=>s.id===e.sourceId);
    lines.push(`### [${e.id}] ${e.category} — ${plain(s.label)}`,`Source: ${plain(s.url || '(no link supplied)')}`,`Character offsets: ${e.start}–${e.end} (zero-based, end exclusive)`,e.prizeType?`Prize hint: ${plain(e.prizeType)}`:'','');
    // Prefix each line and escape Markdown so malicious input cannot become active HTML/links.
    lines.push(...e.quote.split('\n').map(line=>`> ${plain(line)}`),'');
  }
  lines.push('## Sources','');
  for(const s of report.sources) lines.push(`- ${plain(s.label)} — ${plain(s.url || '(no link supplied)')}`);
  return lines.join('\n')+'\n';
}
const escapeIcs=value=>String(value).replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\r/g,'');
const stamp=instant=>new Date(instant).toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
// RFC5545 content lines are folded at <=75 OCTETS (not characters).
export function foldLine(line) {
  const chunks=[];let chunk='',bytes=0;
  for(const char of line) { const size=new TextEncoder().encode(char).length; if(bytes+size>75){chunks.push(chunk);chunk=' ';bytes=1;}chunk+=char;bytes+=size; }
  chunks.push(chunk);return chunks.join('\r\n');
}
export function calendarEvent(report,selectedId,{now=new Date(),synthetic=false}={}) {
  const d=selectedDeadline(report,selectedId),source=report.sources.find(s=>s.id===d.sourceId);
  const description=[synthetic?'SYNTHETIC EXAMPLE — not a real competition.':'User-supplied source; not independently verified.', 'User-selected deadline. Verify all rules and conflicting dates.',`Evidence [${d.evidenceId}]: ${d.quote}`,`Source: ${source.label}`,source.url,...report.warnings.map(w=>w.text)].filter(Boolean).join('\n');
  // Include the source label so two competitions at the same time do not share a UID.
  let hash=2166136261;for(const ch of `${source.label}|${source.url}|${d.instant}`){hash^=ch.codePointAt(0);hash=Math.imul(hash,16777619);}
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//RuleTrace//Evidence Deadline//EN','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${(hash>>>0).toString(16)}-${stamp(d.instant)}@ruletrace.local`,`DTSTAMP:${stamp(now)}`,`DTSTART:${stamp(d.instant)}`,`SUMMARY:${escapeIcs(`${synthetic?'[SYNTHETIC] ':''}Submission deadline — ${source.label}`)}`,`DESCRIPTION:${escapeIcs(description)}`,'END:VEVENT','END:VCALENDAR'];
  return lines.map(foldLine).join('\r\n')+'\r\n';
}
