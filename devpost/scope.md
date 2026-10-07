---
doc: scope
status: draft
execution: delegated
---
# RuleTrace — working title selected by agent

A local evidence workbench for a solo hackathon entrant turning English competition rules into a preparation checklist.

## The Unique Kernel
Every detected condition retains its exact source passage. Different deadline candidates remain visible; the app never silently picks a winner. Only a user's explicit deadline choice can produce a calendar event.

## Who It's For
A solo entrant deciding what to prepare and when to submit. Today they read several pages, copy notes and convert time zones separately. This is a product hypothesis grounded in this project's actual task, not validated customer research.

## The Core Loop
Paste rules and optional updates with source labels/links → extract candidate evidence → inspect missing fields and deadline conflicts → choose a deadline after checking evidence → work through/export a preparation checklist and optional calendar event.

## Inspiration & Identity
User requested clear, explainable output and traceable uncertainty. Agent-selected implementation direction: calm editorial workbench, warm paper, dark ink, green for selected evidence and amber for unresolved issues. No claimed user design approval.

## Why This Matters to the Learner
User wants to enter this competition and keep a useful product afterward; rule verification is part of the current real workflow.

## What "Working" Looks Like
A synthetic rules/update pair produces two different deadlines, cash distinct from credits, source-linked requirements and an explicit unknown eligibility decision. Selecting the update's deadline enables a correct UTC calendar export; the checklist keeps source references.

## The POC Boundary
English pasted text, two sources, conservative candidate extraction, explicit timezone conversion, evidence viewer, checklist, Markdown and calendar downloads. Runs locally without credentials, network APIs or model charges.

## Later
Public URL import, broader languages/date grammars, optional model-assisted extraction with validated citations, saved projects.

## Explicitly Cut
Accounts, payments, auto-registration/submission and background monitoring: unrelated to proving evidence-to-action. Automated eligibility verdicts: personal/legal facts and exceptions require human assessment. Runtime model: unnecessary cost and unverifiable extraction risk for this bounded prototype. Arbitrary URL fetching: website access and security complexity; URLs annotate pasted text only.

## Decision provenance
Core direction and evidence requirements came from the initial user request. Title, visual style, text-only boundary and deterministic parser are agent choices under delegated authority. Personal plan review remains pending.
