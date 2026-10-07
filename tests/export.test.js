import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeSources } from '../src/analyzer.js';
import { calendarEvent,markdownReport,foldLine } from '../src/export.js';

const r=analyzeSources([{label:'Demo event',url:'https://example.org/rules',text:'Deadline: October 26, 2026 at 5:00 PM EDT.\nSubmit a public repository.'},{label:'Update',text:'Deadline: October 28, 2026 at 5:00 PM EDT.'}]);
test('calendar refuses absent/unresolved choice',()=>{
  assert.throws(()=>calendarEvent(r,''),/Select/);
  const ambiguous=analyzeSources([{text:'Deadline: October 26, 2026 at 5:00 PM CST.'}]);
  assert.throws(()=>calendarEvent(ambiguous,ambiguous.deadlines[0].id),/Select/);
});
test('calendar encodes selected UTC instant and retains warnings and synthetic disclosure',()=>{
  const ics=calendarEvent(r,r.deadlines[1].id,{synthetic:true,now:new Date('2026-10-07T00:00:00Z')});
  const unfolded=ics.replace(/\r\n /g,'');
  assert.match(unfolded,/DTSTART:20261028T210000Z/);
  assert.match(unfolded,/SUMMARY:\[SYNTHETIC\]/);
  assert.match(unfolded,/Different deadline instants/);
  assert.match(unfolded,/DTSTAMP:20261007T000000Z/);
  assert(!unfolded.includes('DTSTART:20261026'));
});
test('calendar content cannot inject properties and UTF-8 lines obey octet limits',()=>{
  const report=analyzeSources([{label:'汉字'.repeat(80)+'\nEND:VEVENT',text:'Deadline: October 26, 2026 at 5 PM EDT.'}]);
  const ics=calendarEvent(report,report.deadlines[0].id);
  assert.equal(ics.split('\r\n').filter(l=>l==='END:VEVENT').length,1);
  for(const l of ics.split('\r\n')) assert(Buffer.byteLength(l)<=75);
  assert.equal(foldLine('字'.repeat(90)).replace(/\r\n /g,''),'字'.repeat(90));
});
test('Markdown preserves provenance, checked tasks, unresolved flags and escapes source markup',()=>{
  const checked=new Set([r.tasks[0].id]);
  const md=markdownReport(r,{selectedId:r.deadlines[0].id,zone:'Asia/Shanghai',checked,synthetic:true});
  assert.match(md,/27 Oct 2026, 05:00/);assert.match(md,/- \[x\] Review action/);
  assert.match(md,/Different deadline instants/);assert.match(md,/Character offsets:/);
  assert.match(md,/YES — synthetic/);
  const hostile=analyzeSources([{label:'<script>',text:'Submit <img src=x onerror=alert(1)>.'}]);
  const exportText=markdownReport(hostile);
  assert(exportText.includes('\\<img'));assert(exportText.includes('\\<script\\>'));
});
