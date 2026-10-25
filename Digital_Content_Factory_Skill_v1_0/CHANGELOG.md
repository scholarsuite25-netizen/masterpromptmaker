# Changelog

## v1.1
Added seven new production factories (nine new commands) without changing the core orchestration, engines, or workflow of v1.0.

**New commands**
- `/create-course` — multi-module, multimodal courses (text/slide/video-script/audio-script tracks)
- `/create-lms-package` — LMS-ready packaging, platform-shaped first (e.g. campus SaaS), generic structure as secondary export
- `/create-workbook` — standalone exercise workbooks; self-study / classroom / professional training tracks
- `/create-journal-issue` — academic journal issue compilation (articles, TOC, editorial, per-article metadata)
- `/create-guided-journal` — personal/reflective guided-journal products
- `/create-social-calendar` — full multi-platform social content calendar
- `/create-proposal` — client/consulting, grant/funding, and general project proposals in one command
- `/create-journal-article` + `/create-journal-article-claude` — standalone journal/conference papers
- `/create-thesis` + `/create-thesis-claude` — full thesis/dissertation, undergraduate through PhD

**New engines**
`engines/course-architecture.md`, `engines/lms-packaging.md`, `engines/workbook-engine.md`, `engines/journal-academic-engine.md`, `engines/journal-personal-engine.md`, `engines/social-calendar-engine.md`, `engines/proposal-engine.md`, `engines/academic-citation-engine.md`, `engines/thesis-structure-engine.md`

**New config**
`config/platform_notes.md` — shared cross-platform output handling, referenced by all commands rather than duplicated per file.

**Design notes**
- Every new command reuses the existing Intake, Interview, Editorial, Layout, Visual, By-Products, and Global-Audience engines from v1.0 rather than duplicating their logic.
- All new commands are platform-neutral (work unmodified in Claude, ChatGPT, Gemini) except the Academic Research Paper factory, which is deliberately forked into a portable variant and a Claude-specific variant per user request; both call the same underlying citation/structure engines so the fork is thin.
- Academic Research Paper factory splits journal/conference paper and thesis/dissertation into fully standalone command paths (they do not share a command file), though they share the citation-verification and never-fabricate rules.
- Source verification (`[SOURCE VERIFICATION REQUIRED]`) is compulsory, not optional, across the Academic Research Paper and Academic Journal factories — a dedicated rule layered on top of the general v1.0 rule 5, with a mandatory verification summary at final QA.
- No v1.0 file's core logic was rewritten; `SKILL.md`, `manifest.json`, and `README.md` were only appended to (mode/command lists, one new cross-platform-output paragraph).

## v1.2
Added compulsory academic-integrity controls, a default naturalness standard, and five new production factories — again without touching v1.0/v1.1 core logic.

**New commands**
- `/create-graphics-brief` — creative briefs/specs for covers, flyers, posters, logos
- `/create-audio-music` — narration scripts and music/audio production specs
- `/create-video` — video scripts, storyboards, shot lists
- `/create-tutorial` — software/product walkthroughs and teaching-skill tutorials (selectable, or both)
- `/create-documentation` — user manual, SOP, API/technical, client-facing service docs (selectable tracks, one command)

**New engines**
`engines/academic-integrity-engine.md` (compulsory: similarity, fake/fraudulent citations, misrepresentation, unconfirmed facts, broken links), `engines/editorial-naturalness-engine.md` (default prose-quality standard — explicitly scoped as editorial polish, never a detection-evasion feature, never overriding integrity/fact rules), `engines/graphics-brief-engine.md`, `engines/audio-video-engine.md`, `engines/tutorial-engine.md`, `engines/documentation-engine.md`

**New config**
`config/tool_categories.md` — generic, unbranded categories of external tool (image/logo generation, text-to-speech, music generation, video generation, screen recording) for turning a brief/script into a finished asset. No specific products named, by design.

**Design notes**
- Academic Integrity Engine is compulsory and layered on top of (not a replacement for) the existing Academic Citation & Verification Engine; both apply in full to every Academic Research Paper and Academic Journal command.
- Editorial Naturalness Engine is a genuine writing-quality standard (sentence-rhythm variation, less mechanical transition/hedge use), applied by default skill-wide. It is explicitly NOT built or framed as a way to defeat academic-integrity or AI-detection tools — a request to "humanize so it passes similarity/AI-detection checks" on academic work was declined as in tension with the academic-integrity requirement itself; this engine covers only the legitimate writing-quality overlap between the two asks.
- Graphics, Audio/Music, and Video commands produce briefs, scripts, and specs only — this skill has no native image/audio/video file generation. Tool recommendations stay generic/unbranded per explicit instruction, both for portability and to leave stack choice with the user.

## v1.3
Added the standalone Blog Post Factory — an acknowledged gap in v1.0's design (only a light "web articles" by-product existed; no robust dedicated engine).

**New command**
- `/create-blog-post` — how-to, thought-leadership, listicle, case study, or news/announcement posts; standard (non-optional) SEO section; optional pillar + supporting-post series mode with internal-linking map

**New engine**
`engines/blog-post-engine.md`

**Design notes**
- Deliberately independent from the Social Media Calendar Engine per explicit instruction — either can repurpose the other's output on request, but neither depends on the other structurally.
- Single-standalone-post remains the default; series/pillar mode is opt-in, not assumed.
- SEO structure (meta title/description, header hierarchy, alt-text prompts, link guidance) is a standard section, not a toggle — matches the "keep it as a standard option" instruction.
- No fabricated statistics, testimonials, case-study results, or constructed/guessed URLs — same never-fabricate standard as the rest of the skill.

## v1.4
Added the three factories identified in the deep-research pass on standard content-marketing taxonomies, plus a fourth (web app blueprint) requested alongside them.

**New commands**
- `/create-email-campaign` — announcement, welcome sequence, nurture, retention, reactivation, promotional emails; compliance footer standard
- `/create-landing-page` — general-purpose conversion landing page, any offer type; one primary CTA discipline; standard SEO section
- `/create-web-app-blueprint` — non-coder blueprint: concept → AI-builder prompt → UI/UX spec → version control (Git host) → deployment (PaaS-style or traditional/cPanel-style hosting) → post-launch checklist

**New engines**
`engines/email-marketing-engine.md`, `engines/landing-page-engine.md`, `engines/web-app-factory-engine.md`

**Config**
`config/tool_categories.md` expanded with email, website-builder, and app-build/deployment categories (Git host, PaaS deployment, traditional hosting named as illustrative categories, per the same generic-by-design approach as the rest of the file).

**Design notes**
- `web-app-blueprint` is structurally different from every other factory in this skill: its output is prompts, specs, and step-by-step instructions for external tools (an AI app-builder, a Git host, a deployment platform), not a finished content artifact or a deployed application. This scope is stated explicitly to the user at the start of every run, and the engine never writes real credentials into its output — always a placeholder.
- Email Marketing Factory is deliberately kept separate from the Newsletter workflow (periodic institutional publication vs. one-to-one/segment-targeted lifecycle email) and from Blog Post (delivered vs. published).
- Landing Page Factory hands visual needs to the Graphics Brief Engine and SEO structure follows the same standard as the Blog Post Engine, rather than duplicating either.

## v1.5
Added the CV/Portfolio factory — filled a gap noticed when checking the mode list against existing client work.

**New command**
- `/create-cv-portfolio` — selectable CV/résumé formats (academic, institutional leadership, professional/corporate, extensible for special formats), job-advert-tailored application packages (CV + cover letter + vision statement where called for + referee list), and a portfolio track (website via Landing Page/Web App Blueprint engines, document/PDF, or both).

**New engine**
`engines/cv-portfolio-engine.md`

**Design notes**
- The "institutional leadership application CV" format is modeled directly on the existing Provost/Deputy Provost-level application pattern (full academic record + administrative/leadership record + vision statement), matching how this kind of work has actually been done for prior clients, rather than a generic résumé template.
- Job-advert tailoring reorders and emphasizes the candidate's real, supplied experience against the advert's stated criteria — it never invents experience or qualifications to close a gap.
- Portfolio website output hands off to the existing Landing Page Engine (single-page) or Web App Blueprint Engine (multi-page/interactive) rather than duplicating either.
- Global-Audience formatting (unambiguous dates, spelled-out institution names, no unexplained local abbreviations) applies by default, per the "Global" naming convention used elsewhere in this build.

## v1.6
Widened CV/Portfolio format coverage beyond academic/institutional-leadership, and added ready-to-fill templates — no new command, same `/create-cv-portfolio`.

**Format list expanded to seven selectable CV/résumé types:** academic, institutional leadership, chronological, functional/skills-based, combination/hybrid, executive, entry-level/graduate — plus "other/special format" for anything not covered.

**New templates (`templates/`)**
`cv_academic.md`, `cv_institutional_leadership.md`, `cv_chronological_resume.md`, `cv_functional_resume.md`, `cv_combination_resume.md`, `cv_executive.md`, `cv_entry_level_graduate.md`, `cover_letter.md`, `vision_statement.md`, `referee_list.md`, `portfolio_document.md` — blank-skeleton, label/table format matching the existing `style_sheet.md` / `qa_report.md` pattern already in the skill, not a new style.

**Design notes**
- Templates are structural skeletons only (section headers, table columns, `[placeholder]` slots) — no invented sample content, consistent with the skill's never-fabricate standard.
- `cv_institutional_leadership.md` and `vision_statement.md`/`referee_list.md` are cross-referenced so the leadership-application bundle assembles from the same set the engine already describes.

## v1.7 — Build closed (30 modes)
Final round: wired press release/media statement into an existing mode rather than adding a new one, and added the 30th and last standalone factory.

**Wired in (no new command)**
- Press release / media statement — added as option 8 inside `/create-publication`, with its own news-writing structure and discipline (dateline, inverted pyramid ordering, attributed quotes only, boilerplate "About [Organization]" close, media contact block, no promotional adjectives, no fabricated facts/quotes/contacts). Classified under the Editorial Engine's existing "News, brief" content type.

**New command (30th mode)**
- `/create-speech` — Speech, Keynote & Convocation Address factory. Occasion types: convocation/matriculation address, welcome/opening remarks, keynote, vote of thanks, other institutional address. Structured for spoken delivery (small number of core points, spoken-rhythm prose, delivery notes with estimated speaking time and pacing/emphasis cues). Protocol order of dignitaries confirmed with the user, never guessed, for formal occasions.

**New engine**
`engines/speech-engine.md`

**Status**
Build closed at 30 modes / v1.7. All prior versions' core logic (v1.0-v1.6) remains untouched; every addition across this whole build was append-only to `SKILL.md`, `manifest.json`, and `README.md`, with all substantive logic living in dedicated `commands/` and `engines/` files.
