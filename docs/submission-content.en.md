# RuleTrace — submission content

Prepared with AI assistance from the actual project and the entrant's stated idea. No user study, accuracy benchmark, personal learning reflection or prize eligibility is claimed. Check any authorship declaration on the actual form before using this copy; personal survey answers remain the entrant's.

## Project name
RuleTrace

## Elevator pitch
Turn competition rules into a source-backed preparation plan. Compare deadlines, inspect original passages, and export a checklist and a calendar event without guessing missing details.

## Inspiration
Preparing a hackathon entry means checking rules, announcements, eligibility, prizes, required files and dates in another timezone. A summary can separate a conclusion from the passage that supports it. RuleTrace keeps those connections visible through the preparation workflow.

## What it does
RuleTrace is a local-first workbench for a solo entrant. Paste English rules and an optional update, attach source links, and review candidate passages for deadlines, eligibility, prizes and submission requirements.

Every result retains its original source passage. Opening an evidence reference highlights that passage in context. Different deadline instants remain visible together; none is selected automatically. After checking the source, the user chooses a deadline, checks preparation tasks, and downloads a cited Markdown report and an ICS calendar event.

The prototype keeps uncertainty visible. CST and other unsupported or ambiguous timezone wording remain unresolved. Missing eligibility evidence is a request to check the full rules, not a verdict that anyone can enter. Dollar-denominated platform credits are not added to cash totals.

## How it was built
The project began in a new folder during this hackathon's submission period. The Devpost Learn Skill Pack was installed locally and used with Codex to produce scope.md, prd.md and spec.md before application code. The implementation followed small, verified steps recorded in Git.

The app uses HTML, CSS and browser JavaScript. A small Node.js server provides local startup; the same static app is available through GitHub Pages. There are no third-party npm runtime dependencies, accounts, databases, model calls or paid APIs. Source links label pasted evidence; this version does not fetch webpages.

AI assisted planning, implementation, synthetic examples, tests, debugging and technical documentation. The runtime extraction is deterministic and deliberately bounded, with exact source offsets and strict date validation.

## Challenges
Browser review exposed an overly broad deadline match: originality wording mentioning the submission period was appearing as a date candidate. Narrowing that match reduced misleading noise. A second refinement separated monetary face values in platform credits from cash-prize hints.

The key boundary is refusal to guess. Tests cover ambiguous timezones, impossible dates, multiple dates in one passage, preserved source offsets, excluded-resident wording, safe text rendering and UTC calendar output. The interface and export layer also reject unresolved calendar choices.

## Demonstrated result
The recorded demo shows the full workflow on clearly labelled synthetic event data: two sources, conflicting dates, original-source highlighting, prize hints, a selected deadline, checked tasks, real downloads and an unresolved-timezone case. Twelve focused regression tests passed; desktop and mobile browser behavior were checked. These checks are not a general extraction-accuracy benchmark or a claim of market validation.

## Development takeaway
An observable boundary is more useful than a vague promise. “Handle timezones safely” became “CST produces no resolved instant and cannot be exported as a calendar event.” That behavior can be checked in a pure function, in the visible interface and in the exported-file guard.

This is a technical takeaway from the implementation, not a claim about the entrant's personal learning experience. If the form requires a first-person reflection, the entrant must provide it.

## What's next
Broader English date coverage, clearer detection of non-date conflicts and real entrant feedback. Optional model-assisted extraction would need validated citations and honest uncertainty before it could replace the current bounded matcher. Automatic eligibility decisions and submission automation are outside this product's scope.

## Built with
JavaScript, HTML5, CSS3, Node.js, Intl, GitHub Pages, Codex, Devpost Learn Skill Pack.

## Skill Pack usage — factual answer
The six Devpost Learn skills were installed in the new project directory from challengepost/learn-ai-basics, pinned to commit a0f065781873e8a7ed9a9a705a8dafa6a0810439. They were read and used in sequence: onboarding context, scope, product requirements, technical specification, verified build slices, and shipping preparation. The repository contains devpost/scope.md, devpost/prd.md and devpost/spec.md, and Git history shows the planning commit before application code. The entrant supplied the rules-assistant concept and delegated implementation to Codex. The course's default interview/approval pacing was adapted to that instruction; no extra interview answers or personal practice are claimed. The skill-use record and AI/third-party disclosure document the process.

## Try it out
Repository (required): https://github.com/cgair/ruletrace

Live app: https://cgair.github.io/ruletrace/

## Testing instructions
Open the live app. Click “Try a deadline conflict” and “Trace the rules”. Inspect the update's evidence, select the later synthetic deadline, check a task, and download the Markdown report and ICS event. Then try “missing context”: CST stays unresolved and calendar export stays disabled. No account, key or payment is needed.

For local testing, use Node.js 22+, run `npm start`, and open http://127.0.0.1:4173. Run `npm test` for the focused checks.

## Demonstration video
https://youtu.be/yXzfrWDzOv0

Published publicly; 138.20-second real capture (YouTube displays 2:19), English technical captions.
