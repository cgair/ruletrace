---
doc: checklist
status: draft
execution: delegated
---
# Build Checklist

Build mode: fast, derived from explicit user request for autonomous implementation. Drafts are executable under session delegation; not claimed personally approved.

## Slices

- [x] **1. Inspect source-backed rules and deadline conflicts**
  Becomes usable: Paste sources or load synthetic example, analyze, inspect evidence and unresolved deadlines in a running local app.
  Why now: Proves the distinctive evidence/conflict behavior before polish.
  PRD ref: `prd.md > Source intake`, `Evidence extraction`, `Deadline review`
  Spec ref: `spec.md > Analyzer`, `Workspace`, `Local server`
  Build: Implement pure analyzer, fixtures, local server and accessible UI.
  Verify (mechanical): Seven Node tests passed; local server started and HTTP 200/security headers observed. Browser interaction pending DevTools connection (not counted as passed).
  Learner check: Load the conflicting-deadline example and open the update evidence.
  Commit: `Build evidence review and explicit deadline selection`

- [x] **2. Turn reviewed evidence into a preparation plan**
  Becomes usable: Check tasks, choose display zone, download cited report and selected UTC calendar event.
  Why now: Closes the core loop after evidence integrity works.
  PRD ref: `prd.md > Preparation checklist and exports`, `States and Boundaries`
  Spec ref: `spec.md > Exports`, `Workspace`
  Build: Add Markdown/ICS generation, buttons, selection gating and stale-result invalidation.
  Verify (mechanical): Node export tests pass. Real Chrome clicks generated both download blobs; checked task and conflict retained in Markdown; ICS DTSTART was 20261028T210000Z for the synthetic update. CST fixture disabled export. Desktop and 390px viewport had no horizontal overflow.
  Learner check: Choose an explicit deadline, export both files, then edit input and confirm stale exports disappear.
  Commit: `Export evidence checklist and reviewed calendar deadline`

## Hands-on Checkpoints
- [ ] Early usable behavior explored by learner — asynchronous feedback can shape remaining work.
- [ ] Final kick-the-tires exploration and feedback completed by learner.

## Final Review
- [ ] Final review complete — feedback resolved and learner confirms ready to ship.

## Code Tour and App Map
- [ ] Learning activity complete — reference route/recap only until actually delivered.
- [ ] Optional edit and transfer reflection addressed.
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown.

Activity and evidence: Pending. Agent tests do not count as learner hands-on review.
Route and stops: Pending finished code.
Edit outcome: Not performed.
Reflection: Not established.
Activity mode: Planned reference route.

## Revisions
- Browser inspection found originality wording misclassified as a deadline; removed the broad submission-period keyword from date candidates.
- Credit face values were labelled mixed; added a narrow noncash-credit pattern while preserving full wording and no totals.
- Added regression coverage so one parsed timestamp cannot hide an additional unparsed date or competing timezone in the same passage.
- Fixed native radio/checkbox alignment after screenshot inspection.
