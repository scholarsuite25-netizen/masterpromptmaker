# Digital Content Factory Skill v1.0

A portable, folder-based AI production skill.

## Quick start
1. Copy/import this folder into the supported AI agent/skills environment.
2. Load `SKILL.md` as the primary skill instruction.
3. Load `AGENT.md` as the agent behavior instruction.
4. Keep `config/project_defaults.md` available for defaults.
5. Use the relevant command in `commands/`.
6. Upload raw documents, images, logos and references.
7. Follow the guided interview and approval gates.
8. Run QA before finalization.

## Folder map
- `SKILL.md` — master orchestration rules
- `AGENT.md` — agent role and behavior
- `commands/` — user-facing production commands
- `engines/` — reusable production engines
- `templates/` — decision records, style sheets, asset registers and QA
- `config/` — default settings
- `workflows/` — detailed production workflows
- `qa/` — QA checklists
- `outputs/` — recommended final project structure

## Main commands
`/create-ebook`
`/create-learning-package`
`/create-lecture`
`/create-essay`
`/create-newsletter`
`/create-magazine`
`/create-presentation`
`/create-publication`
`/create-course`
`/create-lms-package`
`/create-workbook`
`/create-journal-issue`
`/create-guided-journal`
`/create-social-calendar`
`/create-proposal`
`/create-journal-article` (`-claude` variant for Claude environments)
`/create-thesis` (`-claude` variant for Claude environments)
`/create-graphics-brief`
`/create-audio-music`
`/create-video`
`/create-tutorial`
`/create-documentation`
`/create-blog-post`
`/create-email-campaign`
`/create-landing-page`
`/create-web-app-blueprint` — produces build prompts/specs/deployment instructions for external tools, not a content artifact
`/create-cv-portfolio`
`/create-speech`

Press release / media statement is option 8 within `/create-publication` (news-writing structure: dateline, inverted pyramid, attributed quotes, boilerplate close, media contact block) — not a separate command.

Graphics/audio/video commands produce briefs, scripts and specs, not finished asset files — see `config/tool_categories.md` for the generic (unbranded) tool categories to hand output to.

See `CHANGELOG.md` for what each version added and why. Build closed at v1.7 / 30 modes.

## Design philosophy
One raw-information intake should be capable of producing a core artifact plus useful learner, presenter, editorial, web and promotional by-products.
