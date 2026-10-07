---
doc: prd
status: draft
execution: delegated
---
# RuleTrace — Product Requirements

Source: `scope.md > The Core Loop`, `The Unique Kernel`, `The POC Boundary`.

## The Core Journey
1. Open the local app. See an honest English-text/local-processing boundary and a synthetic example button.
2. Paste one rules document and optionally one update; attach names and optional HTTPS/HTTP links.
3. Analyze. See candidate deadlines, eligibility passages, prizes and submission evidence with uncertainty warnings.
4. Open any evidence reference to inspect the unchanged passage and source link. Links are user-provided, not authenticated by the app.
5. Resolve deadline choice explicitly. See the chosen instant in the selected local timezone.
6. Check off preparation tasks. Download a Markdown evidence/checklist report and, only for a selected resolved instant, an ICS deadline event.

## Screens and Layout
One responsive workspace: input form then results. Results contain a deadline review area, evidence categories and action checklist. A source dialog highlights the selected passage in the original text. Synthetic examples visibly labelled; no automatic live-source badge.

## Look and Feel
Agent-selected under delegation: warm off-white background, black/green editorial type, fine dividers, generous margins. Native system fonts and a serif display title. Status always has words as well as color. Keyboard-visible focus, labelled fields, responsive one-column mobile layout.

## Features and Behavior

### Source intake
Required nonempty main text, optional update. Limit combined text to 60,000 characters. Source URLs accept HTTP/HTTPS only. No fetching, persistence, tracking or model call. Editing input invalidates prior results and disables stale downloads.

### Evidence extraction
Conservatively classify whole source passages into deadline, eligibility, prize and submission candidates. Preserve exclusions, negation and context. Show missing categories explicitly as 'not found', never 'not required'. A hit is not a legal or completeness guarantee. No money totals; noncash benefits stay noncash/unknown.

### Deadline review
Parse a small documented set of explicit English/ISO dates with time and unambiguous timezone. Unsupported or ambiguous dates remain visible and cannot export. Multiple distinct recognized instants or unresolved candidates require review. No automatic choice, even with a single candidate. User choice is labelled a personal selection, not verified official truth. IANA timezone selection affects display only.

### Preparation checklist and exports
Build tasks from submission evidence plus explicit missing-information checks. Completion is user-reported. Preserve unresolved warnings and citations in Markdown. ICS uses UTC, escaping and line folding; unsupported/unselected dates cannot export.

## States and Boundaries
- Empty/too long input: readable error, no report.
- Missing or ambiguous dates: request checking full rules; no invented timezone.
- Conflicting deadlines: list evidence together; let user choose after inspection.
- No relevant English evidence: explain the parser boundary; show missing categories.
- Untrusted text/URLs: render as text; never execute instructions or HTML; no navigation except user clicking safe source links.
- Reload: input, results and checks disappear; download the report to retain them.

## Product Decisions
User chose source traceability, uncertainty, a complete demonstrable loop, free/local preference and no unnecessary infrastructure. Agent selected the bounded extraction implementation and layout. No personal facts or validated demand invented.

## What We're Building
All six core journey steps with synthetic happy/conflict/ambiguous examples, focused core tests and real browser validation if connection becomes available.

## Deferred From the POC
URL fetching, multilingual NLP, model API, automatic saved projects, calendar sync.

## Non-Goals
Legal advice, eligibility certification, complete semantic interpretation, submission automation.

## Open Questions
Current official rules and form inaccessible. Personal eligibility and learner review pending; neither is required for local technical validation.
