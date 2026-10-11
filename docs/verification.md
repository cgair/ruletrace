# Actual verification record

Date: 2026-10-07. Application implementation checkpoint: `4889ad8`. Environment: macOS, Node v22.23.2, Python 3.13.1, existing Chrome through Chrome DevTools MCP. No production deployment or external user study.

## Automated checks

`npm test`: **12 tests passed, 0 failed** after the latest parser fixes. This is a small regression suite, not an extraction accuracy benchmark.

- Conflicting timestamps remain separate and each quote equals the original source slice at its stored offsets.
- Midnight/noon, explicit UTC offsets and valid leap dates convert correctly.
- Ambiguous/missing zones, invalid dates/clocks and unknown `-00:00` offsets never yield a guessed instant.
- Multiple timestamps survive; a resolved date cannot hide an additional unparsed date or competing timezone.
- Empty, oversized and irrelevant input are handled without fabricated conditions.
- Exclusions, negation and hostile text remain data; unsafe source URLs are rejected.
- Beijing/New York display conversion preserves the same instant.
- Calendar export requires an explicit supported selection; UTC and warning/synthetic disclosure are present.
- Calendar escaping prevents injected properties; folded UTF-8 lines stay within 75 octets.
- Markdown preserves user check marks, offsets and warning evidence, escaping source markup.

## Real local startup

`npm start` initially hit sandbox `listen EPERM`. Retried with approved local execution; server started on `127.0.0.1:4173`. `curl -I` returned HTTP 200 with no-store, nosniff, no-referrer and Content-Security-Policy headers. No unrelated service was stopped or changed.

## Real browser checks

1. Initial MCP `list_pages` timed out after 120 seconds; later retry succeeded. Opened new foreground task tabs; did not navigate unrelated user pages.
2. Opened local app and clicked the synthetic conflict example and Analyze. After refinement: **2 sources, 14 evidence candidates, 2 review flags**. The fixture is invented; these are not real event statistics.
3. Opened the update's evidence dialog. Exact original update sentence highlighted; safe reference link visible; Escape closes the dialog.
4. Selected the synthetic update deadline and checked a task. Visible selection: **29 Oct 2026, 05:00 GMT+8**; progress **1 / 5 checked by you**.
5. Clicked actual Markdown and ICS buttons. Observed the real generated Blob contents via browser instrumentation: two blobs, checked task in Markdown, conflict preserved, `DTSTART:20261028T210000Z`, synthetic marker present. This proves generated content and click handlers; it does not claim an external calendar service imported the event.
6. Inspected desktop screenshot and a 390×844 mobile viewport. No horizontal overflow. CST fixture displayed unresolved date and missing eligibility evidence; calendar export remained disabled.
7. Entered hostile sample HTML via browser form tools. It appeared literally; zero injected result images, no body mutation, exclusion wording retained. The text did not execute instructions.
8. Browser fill of an offscreen mobile URL field timed out. That tool limitation was not treated as a passed check. A subsequent explicit DOM input-event + form-submit test verified invalid `javascript:` link rejection and stale-result hiding.
9. Reload/emulation sometimes reported navigation timeout, but the subsequent DOM snapshot showed the completed page. No false failure/success inferred from timeout alone.
10. Console query showed no app error messages and four warning entries (EventEmitter listener warnings and ObjectMultiplex messages) with no useful source attribution. They are recorded, not silently labelled harmless or attributed to a specific extension.

## Fixes prompted by observation

- Removed overly broad “submission period” deadline detection from originality conditions.
- Distinguished credit face values from a cash-prize hint.
- Added a date-tail regression for unparsed companion dates and timezone alternatives.
- Aligned radio and checkbox boxes with their labels.

## Captures

`artifacts/home.jpg`, `artifacts/review.jpg`, `artifacts/mobile.jpg` are real browser screenshots saved locally. Direct screenshot saving through MCP rejected the workspace path; inline screenshot output was saved to the authorized project instead. These are screenshots, **not continuous video**. They predate only the minor native control-alignment refinement; do not use them to assert final pixel identity.

## Still unverified

- Current Devpost rules, exact form fields, entry/exit surveys, registration and eligibility (site maintenance).
- Entrant hands-on feedback and plan approval; agent testing is not a substitute.
- Continuous final demo recording, public video/repository accessibility, optional deployment and actual submission.
- General extraction accuracy across real competition documents, other languages, arbitrary date formats or all browsers. Known boundaries are in README.

## Delivery-document checks

- Opened the actual app-map page in a new foreground task tab; inspected screenshot and DOM. Styles rendered, no horizontal overflow, zero scripts/external assets. All named code anchors checked against source.
- After restarting the project server for the offline-map route, `/`, `/src/app.js`, `/src/export.js`, `/devpost/app-map.html` returned 200. `/.env`, `/.git/config`, `/devpost/learner-profile.md` and `/../README.md` returned 404. The map alone permits its embedded immutable stylesheet; application CSP remains strict.
- Revisited the official updates URL in Chrome; still maintenance, with no submission links available in the article.

## 2026-10-11 publication and video checks

- All 12 existing tests passed before publication. Relative entry-page asset paths now support both the loopback server and GitHub Pages subdirectory.
- Public GitHub repository and GitHub Pages entry page/module each returned HTTP 200 without authentication.
- Recorded 669 consecutive real browser frames over 138.005 seconds from the existing dedicated Chrome's RuleTrace tab only; no window activation or other-page capture. Actual UI actions are time-stamped in local `artifacts/video/capture.json`.
- Encoded MP4 has 3,317 frames at 24 fps, duration 138.20 seconds, 1440×1010 including an English caption strip. Repeated encoded frames retain real wall-clock timing; no simulated product results.
- Full MP4 decode completed without error; representative frames for all nine key actions visually checked. Final recorded CST state had no resolved date and disabled calendar export. Silent video, no music or synthetic voice.
- Actual captured screenshots and an original typographic cover are in `docs/media/`; English transcript in `docs/demo-transcript.en.md`. Captions disclose synthetic event data and AI-assisted preparation.

- Live GitHub Pages app was tested in the browser after publication: sample + Analyze produced two sources, 14 candidate passages, two review flags and the correct two converted dates; calendar was initially disabled.
- YouTube Studio reported “Checks complete. No issues found.” then “Video published” for `yXzfrWDzOv0`. Public visibility was explicitly selected. Anonymous oEmbed HTTP 200 returned the exact RuleTrace title and video type. This establishes publication/public embed access; it is not a claim of universal network reachability.
