# Global Web Application Factory Engine

For `/create-web-app-blueprint`. Different in kind from every other engine in this skill: it does not produce a finished content artifact. It produces a structured build blueprint that walks a non-coder from an idea through prompting an AI app-builder tool, to version control, to deployment — each stage handed to an external tool the user operates themselves. Be explicit with the user about this scope: this engine plans and writes prompts/instructions; it does not write, execute, or deploy application code itself.

## Stage 1 — Concept capture
Establish: what the app does, who it's for, core user flows (the 3-5 things a user must be able to do), a plain data model (what information the app stores/shows), and any must-have integrations (e.g. payments, login). Ask rather than assume where the user's raw description leaves these unclear.

## Stage 2 — Build prompt
Translate Stage 1 into a single structured prompt suitable for a prompt-to-app AI builder tool: app purpose, page/screen list, per-screen content and function, data fields, user flow between screens, and style direction (pulling from a project style sheet if one exists). Write this as a prompt the user can paste directly into their chosen tool — do not assume which one; see `config/tool_categories.md` for the generic category.

## Stage 3 — UI/UX specification
A plain-language wireframe description per screen (layout, key elements, navigation) the user can hand to the same AI builder tool or a human designer, consistent with the Layout and Visual engines' principles.

## Stage 4 — Version control handoff
Plain-language instructions for taking the AI builder tool's code output and placing it under version control on a Git-based host (e.g. GitHub) — what a repository is, why it matters even for a non-coder (backup, history, handoff to a developer later), and the minimal steps to get code from the builder tool into a repository, in the tool's own supported way.

## Stage 5 — Deployment
Explain the two common non-coder deployment paths and which fits which app type, without assuming one is always right:
- **Modern PaaS-style deployment** (e.g. a platform like Vercel) — typically for JavaScript/framework-based apps produced by AI builder tools; usually connects directly to the Git repository and redeploys automatically on changes.
- **Traditional self-hosted / cPanel-style hosting** — typically for simpler static sites or PHP-based builds; involves uploading files to a hosting account's file manager or via FTP.
Flag which path the app in question is actually suited to rather than defaulting to one, and flag `[VERIFICATION REQUIRED]` where the user's specific hosting account's steps can't be confirmed without seeing their actual dashboard.

## Stage 6 — Post-launch checklist
Custom domain connection, environment variables/secrets (never write a real secret/API key into the blueprint itself — mark where the user must enter their own), basic uptime/backup awareness, and a short maintenance checklist.

## Never
- Write, execute, or claim to have deployed actual application code — this engine produces prompts, specs, and step-by-step instructions only.
- Include a real API key, password, or credential anywhere in output — always a placeholder.
- Assume a specific tool's exact menu/button labels without the user confirming their tool; describe the action in plain terms instead ("connect your repository," not a guessed menu path).
