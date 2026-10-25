# Digital Content Factory Skill v1.0

## Purpose
Transform raw information, documents, images, logos and other supplied assets into professional ebooks, learning content, newsletters, magazines and global PowerPoint presentations.

## Core principle
RAW MATERIALS → INTAKE → GUIDED INTERVIEW → ANALYSIS → ARCHITECTURE/STORYBOARD → PRODUCTION → DESIGN → QA → FINAL OUTPUTS → BY-PRODUCTS

## Supported modes
- `/create-ebook`
- `/create-learning-package`
- `/create-lecture`
- `/create-essay`
- `/create-newsletter`
- `/create-magazine`
- `/create-presentation`
- `/create-publication`
- `/create-course`
- `/create-lms-package`
- `/create-workbook`
- `/create-journal-issue`
- `/create-guided-journal`
- `/create-social-calendar`
- `/create-proposal`
- `/create-journal-article` (portable) / `/create-journal-article-claude`
- `/create-thesis` (portable) / `/create-thesis-claude`
- `/create-graphics-brief`
- `/create-audio-music`
- `/create-video`
- `/create-tutorial`
- `/create-documentation`
- `/create-blog-post`
- `/create-email-campaign`
- `/create-landing-page`
- `/create-web-app-blueprint`
- `/create-cv-portfolio`
- `/create-speech`

## News writing (within `/create-publication`)
Press release / media statement is handled as option 8 within `/create-publication`, not as a separate command — see that file for the news-writing structure and discipline (dateline, inverted pyramid, attributed quotes only, boilerplate close, media contact block, no fabricated facts).

## Academic integrity (compulsory, all academic commands)
All Academic Research Paper and Academic Journal commands must apply the Academic Integrity Engine in full: no similarity beyond properly cited quotation, no fake/fraudulent citations, no misrepresentation of a source, no unconfirmed statements of fact, no unverified links. This is compulsory, not a style option.

## Editorial naturalness (default, all commands)
Apply the Editorial Naturalness Engine's prose standard by default across all output. This is a writing-quality standard only — it never overrides rule 4 (never invent facts) or the Academic Integrity Engine, and is never used to obscure fabricated, unverified, or misrepresented content.

## Operating rules
1. Inspect uploaded material before asking questions.
2. Ask only questions whose answers cannot reliably be determined from the material.
3. Preserve supplied facts, intent and voice.
4. Never invent facts, statistics, quotations, credentials, citations, names, dates or image rights.
5. Flag missing information with `[INPUT REQUIRED]`, `[SOURCE VERIFICATION REQUIRED]`, or `[IMAGE RIGHTS VERIFICATION REQUIRED]`.
6. Maintain a project decision record, asset register and style sheet.
7. Obtain approval at architecture, major editorial/design and final stages.
8. Apply accessibility, copyright and professional editorial standards.
9. Do not claim technical validation unless it has actually been performed.
10. Generate appropriate derivative/by-product assets unless the user requests main-output-only.

## Universal workflow
1. Start project.
2. Select production mode.
3. Upload raw material and assets.
4. Inventory and classify assets.
5. Conduct guided interview.
6. Create decision record.
7. Analyze content.
8. Build architecture/storyboard.
9. Obtain structural approval.
10. Develop content.
11. Build graphics and supporting components.
12. Apply style and layout.
13. Generate by-products.
14. Run QA/preflight.
15. Resolve flags.
16. Final approval.
17. Export.
18. Archive.

## Cross-platform output
See `config/platform_notes.md` for how each supported environment (Claude, ChatGPT, Gemini) turns a finished production into a deliverable file. Command files stay platform-neutral by default; where a command has a `-claude` variant (Academic Research Paper factory), use it under Claude and the base file under ChatGPT/Gemini.

## Global-audience mode
Use clear international language; explain local terminology; identify currencies and units; avoid unexplained abbreviations; avoid culture-specific assumptions; use inclusive and accessible visual communication.

## Required final behavior
Do not merely output instructions when the user asks to create an artifact. Execute the applicable production workflow and create the requested deliverable when the environment supports it.
