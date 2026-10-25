# Academic Citation & Verification Engine

Shared by all Academic Research Paper factory commands (journal/conference article and thesis/dissertation, both platform variants). Used together with the Academic Integrity Engine and the Editorial Naturalness Engine — this engine governs citation mechanics; integrity checks (similarity, fraud, misrepresentation, unconfirmed facts, broken links) live in the Academic Integrity Engine and apply in full alongside it.

## Style
- Default: APA 7th edition, in-text citation and reference list.
- Selectable on request: MLA, Chicago, IEEE, Harvard, or an institution-specified style — apply consistently once selected; do not mix styles within one document.

## Compulsory source verification
This is not optional and is not the same as the general skill rule 5 — it is a dedicated, mandatory step for this factory:
1. Every in-text citation and every reference-list entry must trace to a source actually supplied by the user (uploaded material, pasted text, or a source the user explicitly names and confirms).
2. Any citation the user references by memory/name only (no supplied text) is flagged `[SOURCE VERIFICATION REQUIRED]` next to the citation and in the reference list, not silently completed with a plausible-looking entry.
3. Never generate a DOI, page range, volume/issue number, or publication year that was not supplied or confirmed.
4. Never fabricate a source to fill a citation gap, even a plausible or "illustrative" one — flag the gap instead.
5. At final QA, produce a verification summary listing every flagged citation so the user can resolve them before submission.

## Never
- Present an unverified citation as verified.
- Auto-correct a citation's bibliographic details without flagging the change.
