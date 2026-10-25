# Academic Journal Engine

For journal issue production (used by `/create-journal-issue`). Distinct from the Academic Research Paper factory: this engine compiles and packages an *issue*, not a single paper.

## Scope
- Compile supplied articles into a coherent issue: table of contents, editorial/foreword, article ordering, pagination, section grouping (e.g. research articles, review articles, short communications).
- Apply consistent formatting across articles supplied in inconsistent states, without altering their substantive content, findings, or attributed authorship.
- Track per-article metadata: title, author(s), affiliation, abstract, keywords, received/accepted dates if supplied, DOI if supplied.
- Maintain a peer-review status log per article if the user is tracking review stage (submitted / under review / revisions requested / accepted / rejected) — this is a tracking record, not an actual review.

## Never
- Perform or simulate peer review itself, or generate reviewer comments presented as if from a real reviewer.
- Alter an article's findings, data, or conclusions during formatting.
- Invent author credentials, affiliations, or citation counts.
- Assign a DOI, ISSN, or volume/issue number that was not supplied by the user.

## Compulsory verification
Every citation within every article, and every issue-level bibliographic claim, is subject to the same compulsory source-verification rule as the Academic Research Paper factory: flag `[SOURCE VERIFICATION REQUIRED]` for anything not directly supplied or independently confirmable.
