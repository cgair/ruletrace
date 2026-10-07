# AI-authored technical reference — not entrant-written submission copy

This draft was requested by the user and prepared by the coding agent. It is a review aid only. The current official course requires the entrant to write public submission fields; this document must not be submitted as the entrant's own writing. Exact form fields remain unknown while Devpost is under maintenance.

## Working title
RuleTrace

## Capability summary
RuleTrace turns pasted English competition rules into source-backed evidence, deadline choices and a preparation checklist. It keeps conflicting dates visible and exports a calendar event only after the user selects an explicit, supported timestamp.

## Problem and approach
Preparing a hackathon entry can involve rules, announcements, prize descriptions and dates in another timezone. Important details are easy to separate from the text that supports them. RuleTrace keeps the source passage next to each detected candidate and carries that evidence into the exported report.

The prototype is designed for a solo entrant. The user pastes a rules document and an optional update, attaches source references, and reviews candidate passages for deadlines, eligibility, prizes and submission requirements. Clicking an evidence reference highlights the unchanged text. Distinct deadline instants remain separate; the tool does not decide which source is authoritative.

## Actual implementation
The application uses HTML, CSS and browser JavaScript with a small local Node.js static server. It has no third-party npm dependencies, accounts, database or hosted APIs. The parser uses conservative English patterns and strict calendar validation. The browser's Intl API formats supported instants in the selected display timezone. Markdown exports retain evidence and warnings. Calendar output uses UTC and includes a warning that the deadline is user-selected.

AI supported planning, coding, testing and debugging using the official Devpost Learn Skill Pack. The app itself does not call an AI model. This distinction keeps the prototype's behavior and costs inspectable.

## Engineering challenges with evidence
Browser review exposed an over-broad date keyword: originality requirements mentioning a submission period were being labelled as unresolved deadlines. The matcher was narrowed. Dollar-denominated platform credits also needed a separate noncash hint. Regression tests cover ambiguous timezone abbreviations, invalid dates, competing date text, source offsets, injection-safe rendering boundaries and calendar serialization.

## Demonstrated scope and limits
The demo uses invented event text, clearly labelled synthetic. It shows conflicting dates, the original update passage, noncash credits, a user-selected deadline, a checked preparation task and both exports. An incomplete example uses CST to show that the app refuses to guess a timezone.

This is a bounded proof of concept. It does not read arbitrary URLs, interpret every exception, decide eligibility, or establish which rule is legally authoritative. There are no user-adoption claims, model accuracy scores, market validation results or public deployment claims.

## Entrant-authored sections still needed
Personal inspiration, what the entrant learned, what they are proud of, and any entry/exit-survey reflections must come from the entrant. No statements in this reference should be treated as a personal testimonial.
