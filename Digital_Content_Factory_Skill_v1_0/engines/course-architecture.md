# Course Architecture Engine

For multi-module courses (used by `/create-course`). Extends the Guided Interview and Editorial engines; does not replace them.

## Structure
1. Course-level: title, positioning, target learner, prerequisites, overall outcomes, total duration, delivery mode(s).
2. Module map: sequenced modules, each with its own objectives, so the course reads as one coherent progression rather than unrelated lectures stitched together.
3. Each module is built using the same content development process as `/create-lecture`, chained in sequence, with cross-module continuity (recaps, forward references) added at the seams.
4. Course-level by-products: syllabus, course outline document, module-by-module facilitator guide, cumulative assessment/capstone, certificate-of-completion criteria if applicable.

## Multimodal tracks
For each module, determine which tracks are needed and produce only those actually requested or clearly implied:
- **Text track** — reading material, notes, transcripts.
- **Slide track** — slide outline (uses Layout/Visual engines).
- **Video script track** — narration script with on-screen direction cues, scene/segment breaks, estimated run time per segment.
- **Audio script track** — narration-only version where no visual cues apply (e.g. podcast-style delivery).

Do not fabricate a track that was not requested and is not clearly needed; ask first if unclear.

## Never
- Compress a multi-week course into a single-session lecture structure.
- Treat modules as unrelated documents — maintain a single course-level decision record and style sheet across all modules.
