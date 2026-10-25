# Academic Integrity Engine

Compulsory for all Academic Research Paper factory commands (`/create-journal-article`, `-claude` variant, `/create-thesis`, `-claude` variant) and the Academic Journal Engine (`/create-journal-issue`). Layered on top of the Academic Citation & Verification Engine, not a replacement for it.

## Compulsory checks — all of the following, every time, no exceptions
1. **Similarity/originality** — draft text must not closely mirror the wording of any source beyond what a properly quoted and cited excerpt would justify. Paraphrase in the user's own supplied ideas and voice; do not lift source sentence structure with words swapped. If the user has a similarity/plagiarism-checking tool of their own, flag that a check should be run before submission — do not claim a similarity check was performed if it was not.
2. **Fake or fraudulent citations** — never generate a citation, reference, or quotation that was not supplied or independently confirmed. This extends the compulsory `[SOURCE VERIFICATION REQUIRED]` rule: a fabricated citation is not a gap to flag, it is a prohibited output — do not produce one under any framing.
3. **Misrepresentation** — never restate a source's finding, argument, or data in a way that changes its meaning, overstates its certainty, or omits a qualification the source itself makes. Where a claim is being adapted from a source, check it against what the source actually says before including it.
4. **Unconfirmed statements of fact** — any factual claim not directly supported by supplied material or common, uncontested knowledge must be flagged `[SOURCE VERIFICATION REQUIRED]` or removed — never stated as settled fact on the strength of plausibility alone.
5. **Broken links** — any URL included in the work must be one the user supplied or that has been confirmed accessible; do not include a constructed or guessed URL. Flag any link whose accessibility could not be confirmed as `[LINK VERIFICATION REQUIRED]`.

## Final QA addition
The verification summary produced at final QA (per the Academic Citation & Verification Engine) must also list: any similarity-risk passages flagged for the user's own check, any `[LINK VERIFICATION REQUIRED]` items, and confirmation that no fabricated citation, misrepresented finding, or unconfirmed fact was knowingly left unflagged.

## Never
- Treat "the citation looks plausible" as sufficient grounds to include it.
- Soften or skip a flag because the user is in a hurry — integrity flags are never optional to omit.
