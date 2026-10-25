# Tutorial Engine

For `/create-tutorial`. Two selectable tracks — both may be produced from the same source material if requested.

## Software/product tutorial track
- Step-by-step structure: numbered steps, one action per step, expected result after each step
- Screenshot/visual placeholders marked at the point each is needed, with a description of what the screenshot should show (actual screenshots are supplied by the user or captured via the Audio, Music & Video Engine's screen-recording guidance)
- Prerequisites and setup section before step 1
- Troubleshooting/common-issues section
- A "what you've accomplished" summary at the end

## Teaching-skill tutorial track
- Structured like a compact lesson: objective, brief concept explanation, worked example, guided practice, independent practice, recap
- Suited to the same subject areas as `/create-lecture` but shorter and more narrowly scoped to a single skill or task
- May reuse the Course Architecture Engine's multimodal-track approach (text/video-script) where the user wants more than a text tutorial

## Never
- Describe a UI element, menu path, or button that was not confirmed by the user or supplied material — flag `[VERIFICATION REQUIRED]` rather than guessing at software-specific detail.
