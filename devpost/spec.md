---
doc: spec
status: draft
execution: delegated
---
# RuleTrace — Technical Spec

## How This Works, In Plain Language
The browser scans pasted English text for candidate passages. It keeps the original text alongside each result. A strict date parser converts only supported, explicit timestamps; everything else stays unresolved. You choose a deadline after reading its evidence. The browser creates downloadable files; no account or external model is involved.

## The Core Journey Through the System
Form → validated sources → `analyzeSources` → evidence cards → source dialog → explicit deadline selection → checklist/Markdown/ICS. Implements `prd.md > The Core Journey`.

## Stack
Node.js 22+ (https://nodejs.org/api/): local static server and built-in test runner. Browser ES modules, HTML, CSS and Intl (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl): no build or dependency installation needed for the product. Chosen by agent under explicit delegation; limited natural-language coverage is the accepted prototype constraint, not a learner-reported approval.

## Where It Runs and How Someone Tries It
`npm start` from project root; open `http://127.0.0.1:4173`. `npm test` runs focused Node tests. Static files can later be publicly hosted after permission. No keys, subscriptions or API fees. Local recording is sufficient for demonstration; repository/video publishing await permission.

## Look and Feel
Carry `prd.md > Look and Feel` into `src/styles.css`; responsive grid, native controls, accessible dialog and live status. No CDN, fonts or remote assets.

## Components
### Analyzer
`src/analyzer.js`: pure functions for source paragraph segmentation, candidate classification, strict calendar/date/time/offset validation, conflict flagging. Each evidence item has id, category, sourceId, exact quote and start/end offsets. Implements `prd.md > Evidence extraction` and `Deadline review`.
### Workspace
`src/app.js`, `index.html`, `src/styles.css`: form, report, original-text evidence dialog, timezone display and explicit deadline choice. DOM textContent rendering. Implements `prd.md > Source intake`, `States and Boundaries`.
### Exports
`src/export.js`: Markdown report and RFC5545 calendar text; deterministic input and no external calls. Implements `prd.md > Preparation checklist and exports`.
### Local server
`scripts/server.mjs`: serves only explicit application files on 127.0.0.1; no arbitrary path serving, credentials, external fetch or writes. Security headers and MIME types.

## Data Model
Memory only. Source `{id,label,url,text}`; evidence `{id,category,sourceId,quote,start,end}`; deadline adds `{instant,reason,matched}`; report holds sources/evidence/deadlines/warnings/tasks. UI owns selected deadline id, display zone and checked task ids. Editing sources clears the report. Reload clears all.

## File Structure
```
index.html             entry page
src/analyzer.js        pure extraction and dates
src/app.js             UI and state
src/export.js          Markdown/calendar output
src/samples.js         explicit synthetic fixtures
src/styles.css         responsive design
scripts/server.mjs    allowlisted local server
tests/*.test.js        meaningful boundary/regression tests
devpost/               real pre-build plans and checklist
docs/                  rules, verification and submission preparation
artifacts/             ignored local screenshots/recordings
```

## External Services and Dependencies
None at runtime. Devpost/GitHub are research/distribution destinations, not product dependencies. Skill Pack is a project-local development resource, MIT licensed, pinned in `docs/skill-use.md`.

## Important Failure Modes
- Ambiguous English grammar, unsupported timezone or context → unresolved candidate with original quote; do not export a guessed date.
- Site unavailable → user pastes text; this app does not fetch source URLs.
- Malicious text → text nodes only; source links restricted to HTTP/HTTPS; nothing executed.

## What Was Simplified and Why
Keyword-guided evidence candidates replace semantic model interpretation; product explicitly says candidate extraction. Explicit source paste replaces arbitrary network crawling. Memory replaces database/accounts. These preserve the evidence-review-action loop.

## Decisions and Open Issues
No personal learning uncertainty identified yet. Real engineering uncertainty: avoid false deadline certainty from unsupported syntax, ranges, timezone abbreviations and invalid dates. Investigate with adversarial fixtures before enabling ICS export. Current official eligibility/rules/form and Chrome UI access remain external blockers. Learner plan review not yet performed.
