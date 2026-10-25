// Free Pre-Built Prompt Templates - Master Prompt Studio
export const freeTemplates = [
  {
    id: "tpl-code-refactor",
    title: "Senior Code Refactor & Clean Architecture",
    category: "Coding",
    model: "ChatGPT / Claude",
    framework: "RTF",
    description: "Refactor legacy messy code into clean, modular, SOLID-compliant code with time/space complexity analysis.",
    rawPrompt: "Review this code, make it cleaner, and fix any performance bugs.",
    optimizedPrompt: `You are a Principal Software Architect with deep expertise in clean architecture, SOLID design principles, and algorithm efficiency.

TASK:
Perform a comprehensive architectural refactoring of the provided code snippet.

CONSTRAINTS & GUIDELINES:
1. Maintain exact functional parity with the original implementation.
2. Decompose large functions into single-responsibility, pure helper functions where applicable.
3. Apply idiomatic design patterns (e.g. Strategy, Factory, or Dependency Injection) without over-engineering.
4. Optimize Big-O time and space complexity, explaining any trade-offs made.
5. Add rigorous type safety (or JSDoc/type annotations) and handle edge cases gracefully (null/undefined, network timeouts, invalid inputs).

OUTPUT STRUCTURE:
- ### 1. Key Issues & Anti-Patterns Identified (Bullet list with line references)
- ### 2. Refactored Code (Production-ready, well-commented)
- ### 3. Time & Space Complexity Comparison (Before vs. After Table)
- ### 4. Recommended Unit Tests (Covering critical edge cases)`
  },
  {
    id: "tpl-seo-article",
    title: "High-Ranking Pillar SEO Article Outline & Writer",
    category: "Writing",
    model: "ChatGPT / Claude",
    framework: "Chain-of-Thought",
    description: "Generate comprehensive, human-sounding 2,000+ word SEO guides that satisfy search intent and Google E-E-A-T.",
    rawPrompt: "Write an SEO blog post about how to learn prompt engineering.",
    optimizedPrompt: `You are an elite Content Strategist and Senior Technical Writer with a track record of ranking in Google's Top 3 results for competitive keywords.

TASK:
Write an authoritative, 2,000+ word comprehensive guide targeting the keyword: [Target Keyword].

STEP-BY-STEP REASONING PROCESS:
1. Analyze search intent (Informational, Commercial, or Navigational) and address user pain points in the first 100 words.
2. Formulate an outline featuring H2, H3, and H4 headings that directly answer 'People Also Ask' questions.
3. Inject demonstrable Google E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) using concrete real-world data points and case studies.
4. Eliminate AI buzzwords (e.g., 'delve', 'tapestry', 'leverage', 'game changer'). Use punchy, active-voice, conversational yet professional prose.

OUTPUT FORMAT:
- Title (Compelling, under 60 characters with keyword included)
- Meta Description (Click-worthy, under 155 characters)
- Table of Contents with jump-links
- Full Article Content with bold key takeaways, callout boxes, and comparison tables
- 5 FAQs with direct, concise schema-ready answers.`
  },
  {
    id: "tpl-saas-cold-email",
    title: "B2B SaaS Cold Outreach Sequence (35%+ Reply Rate)",
    category: "Marketing",
    model: "ChatGPT / Claude",
    framework: "STAR",
    description: "Personalized 3-step cold email cadence built on relevance, pain points, and a low-friction call-to-action.",
    rawPrompt: "Write a cold email to sell my SaaS software to marketing managers.",
    optimizedPrompt: `You are a legendary B2B Sales Development Executive specializing in outbound prospecting for high-growth tech startups.

SITUATION:
Our target prospect is a busy VP of Marketing or CMO who receives 50+ pitch emails daily and deletes generic templates immediately.

TASK:
Craft a 3-touch personalized cold outreach email sequence for: [Your SaaS Solution].

ACTION & METHODOLOGY:
- Touch 1: The Observation Hook (<90 words). Open with a genuine observation about their recent company milestone or hiring push. Connect to an acute, quantifiable problem.
- Touch 2: The Proof & Case Study (<80 words, 3 days later). Share a 1-sentence metric showing how a direct competitor solved this problem in 14 days.
- Touch 3: The Permission-Based Breakup (<60 words, 6 days later). Low-pressure closing offering a free resource or asking if this is no longer a priority.

CONSTRAINTS:
- No cheesy fake familiarity ('Hope this email finds you well').
- Mobile-optimized: no paragraph longer than 2 sentences.
- Call to Action (CTA) must be frictionless (e.g., 'Open to seeing a 2-minute video breakdown?' instead of 'Book a 30-min call').`
  },
  {
    id: "tpl-midjourney-cinema",
    title: "Cinematic Photorealistic Midjourney Master Formula",
    category: "Midjourney",
    model: "Midjourney v6.1",
    framework: "Persona",
    description: "Generate jaw-dropping, award-winning cinematic photography prompts with authentic camera gear and lighting setups.",
    rawPrompt: "A photo of a futuristic cyberpunk hacker in a dark neon alley.",
    optimizedPrompt: `/imagine prompt: Award-winning cinematic close-up portrait of a rogue cyber-operative with subtle biometric LED implants along the jawline, gazing into a holographic terminal in a rain-slicked Tokyo alleyway at 3 AM. Dynamic dual lighting: electric crimson red neon reflections on wet asphalt contrasting with cool royal cobalt blue rim lighting. Shot on ARRI Alexa 65 with Leica Noctilux 50mm f/0.95 lens, authentic chromatic aberration, natural film grain, volumetric rain mist, photorealistic skin pores and moisture, high-budget sci-fi movie frame, 8k resolution, color graded in DaVinci Resolve --ar 16:9 --style raw --v 6.1 --q 2`
  },
  {
    id: "tpl-startup-pitch",
    title: "Y Combinator 2-Minute Elevator Pitch & Investor Hook",
    category: "Business",
    model: "ChatGPT / Claude",
    framework: "RTF",
    description: "Distill your startup idea into the iconic YC pitch format: problem, solution, secret sauce, and traction.",
    rawPrompt: "Help me pitch my AI startup to investors.",
    optimizedPrompt: `You are a Partner at Y Combinator reviewing seed applications. You value absolute clarity, brevity, and defensibility over buzzwords.

ROLE: Venture Capital Partner & Pitch Coach
TASK: Structure a compelling 2-minute pitch deck narrative and 1-sentence hook for: [Startup Name & Overview].

FORMAT & BREAKDOWN:
1. The One-Liner (X for Y analogy or clear declarative statement of value)
2. The Massive Pain Point (Why current solutions are fundamentally broken)
3. The Unique Insight / Unfair Advantage (Why our approach works now when it failed before)
4. Market Size & Why This Can Be a $1B Category
5. The 30-Second Demonstration Script (Step 1 -> Wow Moment -> Result)
6. Anticipated Hard Questions from Top VCs & Bulletproof Answers.`
  },
  {
    id: "tpl-sql-optimizer",
    title: "PostgreSQL High-Volume Query Optimizer & Index Planner",
    category: "Coding",
    model: "ChatGPT / Claude",
    framework: "RTF",
    description: "Analyze slow relational database queries, EXPLAIN ANALYZE output, and propose composite indexes or partitions.",
    rawPrompt: "My Postgres query is slow, help optimize it.",
    optimizedPrompt: `You are a Principal Database Administrator (DBA) specializing in PostgreSQL high-throughput OLTP systems with billions of rows.

TASK:
Analyze the provided slow SQL query and schema to eliminate sequential scans and reduce execution latency by at least 80%.

ANALYSIS STEPS:
1. Identify missing indexes, non-sargable WHERE clauses, and accidental cross-joins.
2. Evaluate window functions and subqueries for CTE (Common Table Expression) or JOIN materialization opportunities.
3. Recommend exact DDL commands for covering indexes, partial indexes, or BRIN/GIN indexes.
4. Explain the impact on WRITE performance (INSERT/UPDATE overhead).

OUTPUT FORMAT:
- Query Bottleneck Diagnostics
- Rewritten & Optimized SQL Query
- Index Creation Statements (CREATE INDEX CONCURRENTLY...)
- Before & After Cost Estimation Explanation.`
  }
];

export const sampleWeakPrompts = [
  "Write an email to my boss asking for a raise.",
  "Create a Python script to scrape product prices from an ecommerce website.",
  "Help me brainstorm YouTube video ideas for a tech channel.",
  "Write a landing page for my productivity app.",
  "Explain quantum computing so a 10-year-old can understand it.",
  "How do I fix a React re-rendering bug with useEffect?"
];
