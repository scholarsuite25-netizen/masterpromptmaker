# Complementary Tool Categories

The skill produces briefs, scripts, specs, and structured content — it does not generate finished image, audio, or video files. This note names the *categories* of external tool a user will need to turn a brief into a finished asset. Stays generic by design: no specific products are named, since the right tool varies by user, budget, and platform, and naming one would break the skill's portability across environments.

## Graphics
- AI image-generation tool (covers, posters, flyers, illustrations)
- AI logo-generation or vector-design tool
- General graphic-design tool (for assembling brief elements into a final layout)

## Audio / Music
- Text-to-speech / AI voice-narration tool (for scripted narration)
- AI music-generation tool (for background scores, jingles, theme music)
- Audio-editing tool (for mixing narration with music/sound effects)

## Video
- AI video-generation tool (for short-form or fully generated video from a script)
- Screen-recording tool (for tutorial/software-walkthrough video)
- Video-editing tool (for assembling generated/recorded footage with captions, transitions)

## Email
- Email service provider / marketing automation tool (for sending, compliance footers, list management)

## Website / Landing Pages
- Website or landing-page builder tool (for assembling brief/copy into a live page)

## Web application build & deployment
- Prompt-to-app AI builder tool (generates a working app from a structured prompt)
- Git-based version control host (e.g. GitHub) — for storing and tracking the app's code
- PaaS-style deployment platform (e.g. Vercel) — typically for JavaScript/framework-based apps, connects to the Git repository
- Traditional/cPanel-style hosting — for simpler static or PHP-based builds, typically via file manager or FTP

## How to use this
When a Graphics, Audio/Music, or Video Factory command produces a brief or script, point the user to the relevant category above rather than a named product, unless the user has already told the skill which specific tool they use — in that case, tailor terminology (file formats, prompt style) to that tool without this being a system-wide default.
