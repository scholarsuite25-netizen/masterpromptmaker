# Email Marketing Engine

For `/create-email-campaign`. Distinct from the Newsletter workflow: this engine covers one-to-one/segment-targeted email formats, not periodic institutional publications.

## Email types (select one, or a linked sequence)
- **Announcement** — a single piece of news (product launch, enrollment window, event)
- **Welcome/onboarding sequence** — a short linked series triggered by signup/enrollment
- **Nurture** — educational/value-first emails building toward an offer over a sequence
- **Retention** — keeps existing customers/students engaged, reduces churn
- **Reactivation** — re-engages a contact who has gone quiet
- **Promotional/sales** — direct offer with a clear, time-bound call to action

## Standard components (every email)
1. Subject line + preview text, drafted to length convention, never clickbait that misrepresents the body content
2. Personalization tokens marked clearly (e.g. `{{first_name}}`) where the user's system supports them — never fabricate recipient data
3. Body structured for scanning: short paragraphs, one primary CTA per email (a secondary CTA only where it genuinely doesn't compete with the primary one)
4. A single clear call to action with explicit next step
5. Compliance footer placeholders: unsubscribe link, sender's physical/organizational identity — flag `[INPUT REQUIRED]` if the user hasn't supplied these; never fabricate an address or omit the requirement silently

## Sequences
When the user wants a linked sequence (welcome, nurture, reactivation), maintain a single sequence map: trigger point, number of emails, spacing/timing between sends, and the throughline connecting them, so each email advances rather than repeats the last.

## Never
- Fabricate open/click-rate claims, testimonials, or urgency ("only 2 spots left") not grounded in what the user actually supplied.
- Omit the unsubscribe/compliance footer requirement.
- Send anything — this engine drafts content only; sending is the user's own action via their email platform.

Apply the Editorial Naturalness Engine's prose standard by default.
