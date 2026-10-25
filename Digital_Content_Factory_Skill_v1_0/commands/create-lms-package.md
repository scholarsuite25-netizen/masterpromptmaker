# /create-lms-package

Package a completed course, learning package, or lecture for delivery through an LMS.

Use the LMS Packaging Engine. Default to shaping content for the user's own platform (e.g. an institutional campus SaaS) when identified — ask for its expected structure/metadata if not already known. Offer the generic LMS-ready structure (module/lesson hierarchy, metadata, platform-agnostic quiz format, manifest) as a secondary or standalone export. Flag packaging-validation limits explicitly; never claim runtime compliance (e.g. SCORM) that has not actually been validated. See `config/platform_notes.md` for output handling.
