# Idea decision — 2026-10-07

Chosen working concept: the user's proposed competition rules/deadline assistant. Agent-selected working name: RuleTrace. No external customer interviews or market-size study have been performed.

| Candidate | Need and existing alternatives | Distinction to test | Build/demo assessment |
|---|---|---|---|
| Source-backed competition preparation | This very entry requires rule comparison; generic notes/document Q&A plus a timezone converter can cover pieces | Keep conflicting evidence visible through checklist and calendar export; require an explicit choice | Medium effort; one complete visible loop in under three minutes |
| Demo rehearsal timer | Timing and shot preparation; existing timers and teleprompters | Tie each timed segment to a feature proof | Lower effort but weaker distinction |
| Submission repository checker | Missing deliverables; templates and CI checks already address file presence | Map contest requirements to repository evidence | Medium effort; technical demonstration is less immediately visual |

Bounded public research: read current [Notion AI page](https://www.notion.com/product/ai) (document generation, search, project/task capabilities) and [timeanddate converter](https://www.timeanddate.com/worldclock/converter.html). These confirm strong adjacent alternatives; they do **not** establish that no competitor has this workflow. Devpost help article was unavailable. Research stopped when sufficient to choose a small prototype.

The distinction is an opinionated evidence-review-action workflow, not a claim of novel NLP. Current extraction is deterministic and English-only. Usability, extraction coverage and willingness to use it after the contest still need real user testing.
