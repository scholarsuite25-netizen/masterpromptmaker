# LMS Packaging Engine

For LMS-ready output (used by `/create-lms-package`).

## Primary target: platform-shaped content
Default to shaping content for the user's own campus platform when the user identifies one (e.g. an institutional AI-literacy/mentorship SaaS): unit/lesson naming conventions, expected metadata fields (title, description, duration, prerequisite, learning outcomes), and content-block structure the platform actually ingests (text blocks, video blocks, quiz blocks, assignment blocks). Ask the user for the platform's expected structure if not already known; do not assume a generic LMS shape is correct for a specific platform.

## Secondary target: generic LMS-ready structure
Where the user wants a portable/generic export instead of (or alongside) platform-shaped content, produce:
- a course/unit hierarchy in plain structured form (folders or numbered sections: course → module → lesson → assessment)
- lesson metadata (title, objectives, duration, sequencing)
- quiz/assessment items in a plain, platform-agnostic question format (question, options, correct answer, feedback)
- a manifest/index file listing every component and its intended slot

Note the limits plainly: this produces LMS-ready *content and structure*, not a validated runtime package (e.g. not a tested SCORM/xAPI binary) unless the environment's own tools can actually build and verify one. Flag this rather than implying otherwise.

## Never
- Claim SCORM/xAPI/Moodle-import compliance without the ability to actually validate it — flag as `[SOURCE VERIFICATION REQUIRED]`-style caveat instead: `[PACKAGING VALIDATION NOT PERFORMED]`.
- Guess at a specific platform's field names/schema without confirming them with the user first.
