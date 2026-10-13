## Demo
[Watch the 2:19 demo on YouTube](https://youtu.be/yXzfrWDzOv0) · [Direct MP4 backup](https://cgair.github.io/ruletrace/docs/media/ruletrace-demo.mp4)

## Inspiration
Preparing a hackathon entry means checking rules, announcements, eligibility, prizes, required files and dates in another timezone. A summary can separate a conclusion from the passage that supports it. RuleTrace keeps those connections visible through the preparation workflow.

## What it does
RuleTrace is a local-first workbench for a solo entrant. Paste English rules and an optional update, attach source links, and review candidate passages for deadlines, eligibility, prizes and submission requirements.

Every result retains its original source passage. Opening an evidence reference highlights that passage in context. Different deadline instants stay visible together; none is selected automatically. After checking the source, the user chooses a deadline, checks preparation tasks, and downloads a cited Markdown report and an ICS calendar event.

CST and other ambiguous timezone wording remain unresolved. Missing eligibility evidence means "check the full rules", not "anyone can enter". Dollar-denominated platform credits are not added to cash totals.

## How it was built
The project began in a new folder during this hackathon's submission period. The Devpost Learn Skill Pack was installed locally and used with Codex to produce scope.md, prd.md and spec.md before application code. Git history preserves the planning-first sequence and verified build steps.

The app uses HTML, CSS and browser JavaScript, with a small Node.js server for local startup and GitHub Pages for the public demo. There are no third-party npm runtime dependencies, accounts, databases, model calls or paid APIs. Source links label pasted evidence; this version does not fetch webpages.

AI assisted planning, implementation, synthetic examples, tests, debugging and technical documentation. Runtime extraction is deterministic and bounded, using exact source offsets and strict date validation.

## Challenges
Browser review exposed an overly broad deadline match: originality wording mentioning the submission period appeared as a date candidate. Narrowing that match reduced misleading noise. Another refinement separated monetary face values in platform credits from cash-prize hints.

The key boundary is refusal to guess. Tests cover ambiguous timezones, impossible dates, multiple dates in one passage, preserved source offsets, excluded-resident wording and UTC calendar output. The interface and export layer both reject unresolved calendar choices.

## What the build demonstrated
The real recorded demo shows two sources, conflicting dates, original-source highlighting, prize hints, a selected deadline, checked tasks, actual downloads and an unresolved-timezone case. The event data is synthetic and clearly labelled.

Twelve focused regression tests passed. Actual desktop/mobile browser checks covered the core workflow and hostile-text handling. These checks are not a general extraction-accuracy benchmark, user study or adoption claim.

## A reusable development lesson
An observable boundary is more useful than a vague promise. "Handle timezones safely" became "CST produces no resolved instant and cannot be exported as a calendar event". That behavior is inspectable in the parser, interface and export guard.

## What's next
Broader date coverage, clearer handling of non-date conflicts and feedback from real entrants. Any future model-assisted extraction would need validated citations and explicit uncertainty. The prototype does not decide eligibility or automate contest submissions.

## Try it
Open the live app, choose "Try a deadline conflict", then "Trace the rules". Inspect the update evidence, choose a date, check a task and download both files. Try "missing context" to see calendar export blocked for CST. No login or API key is needed.

## AI and third-party disclosure
Built with Codex and the MIT-licensed Devpost Learn Skill Pack. The entrant supplied the rules-assistant concept and delegated implementation; the course's default interview/approval pacing was adapted, without inventing personal exercises or feedback. Code, process records and notices are public. Submission technical copy and video captions were prepared with AI assistance.
