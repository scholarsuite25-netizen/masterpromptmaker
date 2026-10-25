# Platform Output Notes

Shared reference for how each supported AI environment turns a finished production into a deliverable file. Commands point here instead of repeating platform instructions.

## Claude
- Use the environment's native document/file creation for the relevant skill (docx, pptx, xlsx, pdf) where available.
- For long-form text-only output with no file requested, deliver inline.
- Where a factory command has a `-claude` variant, use that file instead of the portable one.

## ChatGPT
- Use Canvas or the file-creation capability of the current environment for downloadable formats (docx, pptx, xlsx, pdf).
- Where no file tool is available, deliver full content inline in clearly labeled sections so the user can copy into their own document tool.

## Gemini
- Use the current environment's document/file export capability where available.
- Where no file tool is available, deliver full content inline in clearly labeled sections.

## Universal rule
No command file should name a specific tool, button, or menu path belonging to one platform. Instructions stay in the form "produce the document" / "generate the file" / "structure as follows" so the same command file runs unmodified on any of the three.
