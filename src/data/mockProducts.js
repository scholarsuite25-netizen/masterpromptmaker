// Master Prompt Studio - Curated Storefront for All Manner of Digital Products
export const digitalProducts = [
  // 1. eBooks & Guides
  {
    id: "ebook-prompt-bible",
    title: "The Ultimate Prompt Engineering Bible (2025 Edition)",
    type: "ebook",
    category: "eBooks & Guides",
    subtitle: "Complete Handbook from Zero to Master Prompt Architect",
    badge: "Bestseller",
    badgeColor: "red",
    priceNGN: 15000,
    priceUSD: 19.99,
    originalPriceNGN: 35000,
    originalPriceUSD: 49.99,
    rating: 4.95,
    reviewsCount: 382,
    pages: "284 Pages • PDF & ePub",
    description: "The definitive guide to unlocking extreme productivity with LLMs. Master Chain-of-Thought, Tree-of-Thoughts, STAR, ReAct, and production prompt chaining for ChatGPT, Claude 3.5, and Gemini.",
    features: [
      "280+ High-Density Pages with Real-World Schemas",
      "50+ Production Ready System Prompts Included",
      "Detailed Claude 3.5 Sonnet & ChatGPT-4o Playbooks",
      "Token Optimization & Hallucination Prevention Blueprints",
      "Free Lifetime Updates & Digital Addendums"
    ],
    sampleExcerpt: {
      chapter: "Chapter 3: The RTF (Role-Task-Format) Anchor Principle",
      content: `### The Power of Structural Priming in Modern LLMs

When crafting prompts for advanced models like Claude 3.5 Sonnet or GPT-4o, ambiguous framing leads to generalized responses. The RTF Anchor establishes a strict behavioral box:

1. **Role (Who)**: Define the precise specialist credentials, background, and perspective. Don't just say 'You are a marketer'; say 'You are a Principal Growth Architect who scaled 4 SaaS companies from $0 to $10M ARR using organic SEO and product-led growth.'
2. **Task (What)**: State the objective with zero ambiguity. Provide raw inputs separated by clear delimiters (like ### or XML tags).
3. **Format (How)**: Demand exact output schemas—markdown tables with specific columns, JSON payloads, or step-by-step checklists with verification criteria.

#### Example Transformation:
- **Raw Input**: 'Help me write an email for my product launch.'
- **RTF Engineered**: 'Act as a direct-response copywriting expert specializing in developer tools. Write a 3-part teaser email sequence for an AI code review tool launch. Use PAS (Problem-Agitate-Solution), keep each under 180 words, and provide 3 high-converting subject line variations with curiosity triggers.'`
    },
    tags: ["eBook", "Prompt Engineering", "ChatGPT", "Claude", "PDF"]
  },
  {
    id: "ebook-solo-ai",
    title: "Mastering AI Workflows for Solo Founders & Digital Creators",
    type: "ebook",
    category: "eBooks & Guides",
    subtitle: "Build, Launch and Scale 6-Figure Digital Products Using AI",
    badge: "Hot",
    badgeColor: "red",
    priceNGN: 10000,
    priceUSD: 12.99,
    originalPriceNGN: 20000,
    originalPriceUSD: 29.00,
    rating: 4.88,
    reviewsCount: 195,
    pages: "195 Pages • Step-by-Step Playbook",
    description: "How to operate as a one-person digital media empire. Covers digital product creation, automated landing page copywriting, social media content engines, and email funnels.",
    features: [
      "End-to-End Digital Product Creation Blueprint",
      "High-Converting Landing Page Copy Templates",
      "Automated Social Media Repurposing Engine Prompts",
      "Pricing Strategies for eBooks & Micro-SaaS",
      "Step-by-step monetization walkthroughs"
    ],
    sampleExcerpt: {
      chapter: "Chapter 5: The Viral Content Repurposing Flywheel",
      content: `### Turning 1 Idea into 15 Content Pieces in 10 Minutes

The bottleneck for solo entrepreneurs isn't ideation—it's distribution. Using structured prompt pipelines, one pillar article or technical insight can be decomposed into:
- 1 Detailed Twitter/X Thread with hook analysis
- 1 LinkedIn Long-form Carousel script
- 1 YouTube Shorts / TikTok hook script
- 1 Weekly Newsletter deep dive
- 3 Actionable quote cards

The secret is instructing the AI to preserve the core thesis while adjusting tone, sentence length, and pacing for each specific social media algorithm.`
    },
    tags: ["eBook", "Solo Founder", "Marketing", "Passive Income", "Guide"]
  },
  {
    id: "ebook-prompt-monetization",
    title: "The $10K/Mo Digital Prompt Seller & Creator Playbook",
    type: "ebook",
    category: "eBooks & Guides",
    subtitle: "How to Package, Market, and Sell AI Prompts and Digital Downloads",
    badge: "New",
    badgeColor: "red",
    priceNGN: 11000,
    priceUSD: 14.99,
    originalPriceNGN: 24000,
    originalPriceUSD: 30.00,
    rating: 4.89,
    reviewsCount: 114,
    pages: "160 Pages • Action Guide",
    description: "Step-by-step roadmap for turning specialized prompt engineering skills into recurring passive income. Covers Gumroad, WhatsApp direct sales, automated delivery, and affiliate programs.",
    features: [
      "Product Packaging & Pricing Strategies",
      "WhatsApp Direct Payment & Instant Order Fulfillment Engine",
      "Creating Irresistible Lead Magnets to Build an Audience",
      "Legal Guidelines & Licensing for AI Generated Assets",
      "Bonus: 10 High-Converting Landing Page Templates"
    ],
    sampleExcerpt: {
      chapter: "Chapter 4: The Direct WhatsApp Payment Closing System",
      content: `### Why Direct WhatsApp Payment Automation Converts 3X Higher

In mobile-first markets, redirecting customers through clunky international forms causes severe cart abandonment. 

By offering a direct WhatsApp automated checkout:
1. The customer immediately receives your verified bank account details (OPAY/GTB) and unique order reference.
2. The user transfers funds via their mobile banking app in 15 seconds.
3. The user sends the confirmation receipt directly into WhatsApp.
4. Your deterministic digital unlock verification code is delivered instantly, building deep personal trust and repeat buyers.`
    },
    tags: ["eBook", "Digital Products", "WhatsApp Sales", "Monetization"]
  },

  // 2. Prompt Vaults
  {
    id: "pack-fullstack-dev",
    title: "1,000+ Full-Stack Developer & Software Architect Prompt Vault",
    type: "prompts",
    category: "Prompt Vaults",
    subtitle: "Turn AI into your 10x Senior Technical Lead & Code Reviewer",
    badge: "Top Rated",
    badgeColor: "blue",
    priceNGN: 12000,
    priceUSD: 15.99,
    originalPriceNGN: 25000,
    originalPriceUSD: 35.00,
    rating: 4.92,
    reviewsCount: 247,
    pages: "1,200 Prompts • JSON & Markdown",
    description: "Battle-tested prompt templates for full-stack engineering, React/Node debugging, database query optimization (PostgreSQL, Mongo, Redis), Kubernetes, Docker, and system design interviews.",
    features: [
      "1,200+ Hand-Curated Senior Developer Prompts",
      "Unit & Integration Test Generators (Jest, PyTest, Vitest)",
      "System Architecture & API Schema Designer Prompts",
      "Complex SQL & Query Performance Optimization Templates",
      "Instant copy & markdown bundle download"
    ],
    sampleExcerpt: {
      chapter: "Sample Prompt: Full-Stack Security & Vulnerability Auditor",
      content: `\`\`\`markdown
You are a Principal Application Security Engineer (AppSec) auditing a production web application.
Audit the following code snippet for OWASP Top 10 vulnerabilities, including SQL injection, SSRF, XSS, broken access control, and insecure deserialization.

Provide your output strictly in the following format:
1. Executive Risk Summary (Low / Medium / High / Critical)
2. Vulnerability Table: [Vulnerability Name | Affected Lines | CVSS Severity | Attack Vector]
3. Remediation Code: Refactored, production-ready code with explanatory inline comments
4. Verification Test Case: A unit test reproducing the exploit before and passing after fix.
\`\`\``
    },
    tags: ["Coding", "React", "Python", "SQL", "Security", "DevOps"]
  },
  {
    id: "pack-marketing-copy",
    title: "750+ Viral Copywriting & Conversion Funnel Prompt Suite",
    type: "prompts",
    category: "Prompt Vaults",
    subtitle: "High-Converting Sales Pages, Ad Hooks, Email Sequences & SEO",
    badge: "Popular",
    badgeColor: "blue",
    priceNGN: 9500,
    priceUSD: 11.99,
    originalPriceNGN: 22000,
    originalPriceUSD: 28.00,
    rating: 4.9,
    reviewsCount: 310,
    pages: "750 Prompts • Notion + TXT",
    description: "Write copy that converts browsers into buyers. Includes prompts based on Russell Brunson, Dan Kennedy, Eugene Schwartz, and modern direct-response email marketing frameworks.",
    features: [
      "750 High-Converting Copywriting Prompts",
      "50 Ad Hook Formulas for Facebook, TikTok & Google",
      "Cold Email Outreach Templates with 40%+ Open Rates",
      "Complete 5-Day Launch Sequence Scripts",
      "Notion Database & Instant Copy Access"
    ],
    sampleExcerpt: {
      chapter: "Sample Prompt: Eugene Schwartz 5 Stages of Awareness Hook",
      content: `\`\`\`markdown
Act as a world-class direct response copywriter trained in Eugene Schwartz's 'Breakthrough Advertising'.
Analyze my product: [Insert Product & Target Audience].

Generate 5 distinct hook angles matching each stage of customer awareness:
1. Most Aware: Direct offer hook emphasizing urgency and discount.
2. Product Aware: Comparative hook highlighting our unique mechanism over competitors.
3. Solution Aware: Hook demonstrating why our specific approach beats traditional methods.
4. Problem Aware: Emotional agitation hook describing their daily frustration in vivid detail.
5. Completely Unaware: High-curiosity story-driven hook that introduces an unexpected truth.
\`\`\``
    },
    tags: ["Copywriting", "Sales Funnel", "Email Marketing", "SEO", "Ads"]
  },
  {
    id: "pack-midjourney-art",
    title: "Midjourney v6.1 Ultra-Photorealistic Prompt & Style Vault",
    type: "prompts",
    category: "Prompt Vaults",
    subtitle: "500+ Camera Settings, Lighting Formulas, and Commercial Art Styles",
    badge: "Visual Pro",
    badgeColor: "purple",
    priceNGN: 8500,
    priceUSD: 9.99,
    originalPriceNGN: 18000,
    originalPriceUSD: 24.00,
    rating: 4.96,
    reviewsCount: 168,
    pages: "500 Prompts • Visual Cheat Sheets",
    description: "Master photorealistic portraits, commercial product photography, cinematic architectural renders, and 3D UI assets with exact camera lenses, lighting rigs, and aspect ratios.",
    features: [
      "500+ Tested Midjourney v6.1 & Niji 6 Prompts",
      "Studio Lighting & Camera Lens Cheat Sheet",
      "E-Commerce Product Mockup Formulas",
      "Cinematic Sci-Fi, Cyberpunk & Editorial Styles",
      "Aspect Ratio & Style Parameter Guide (--stylize, --chaos, --weird)"
    ],
    sampleExcerpt: {
      chapter: "Sample Prompt: Cinematic Luxury Commercial Product Photography",
      content: `\`\`\`markdown
/imagine prompt: Ultra-luxury fragrance bottle resting on wet black obsidian rock, surrounded by glowing crimson red and cobalt blue neon smoke reflections, water droplets, shot on Hasselblad H6D-100c, 85mm f/1.4 lens, dramatic rim lighting, cinematic shadows, shallow depth of field, 8k resolution, commercial advertising masterpiece --ar 16:9 --style raw --v 6.1
\`\`\``
    },
    tags: ["Midjourney", "AI Art", "Photography", "Design", "Commercial"]
  },

  // 3. Notion & Productivity OS
  {
    id: "notion-founder-os",
    title: "The Ultimate Founder & Creator Life OS Notion Workspace",
    type: "notion",
    category: "Notion & Productivity",
    subtitle: "All-in-One Second Brain: Projects, Revenue, Content Pipeline & Habit Tracker",
    badge: "Top Seller",
    badgeColor: "blue",
    priceNGN: 14000,
    priceUSD: 17.99,
    originalPriceNGN: 30000,
    originalPriceUSD: 39.00,
    rating: 4.94,
    reviewsCount: 228,
    pages: "18 Linked Databases • Full Notion Template",
    description: "The complete digital headquarters for founders and knowledge creators. Combines PARA method (Projects, Areas, Resources, Archives), automated CRM, content schedule calendar, financial invoice ledger, and daily sprint review dashboards.",
    features: [
      "18 Seamlessly Linked Databases with Automated Rollups",
      "Multi-Channel Social Content Calendar (YouTube, LinkedIn, X, Blog)",
      "Client CRM, Proposal Tracker & Invoicing Dashboard",
      "PARA Method Resource Knowledge Base",
      "1-Click Duplicate Link to your personal Notion account"
    ],
    sampleExcerpt: {
      chapter: "Notion Architecture Blueprint",
      content: `### Included Database Modules in Founder OS:
- **01_Mission & OKRs**: Yearly goals broken down into quarterly milestones.
- **02_Project Tracker**: Kanban boards filtered by priority, deadline, and assigned contractors.
- **03_Content Production Matrix**: From raw idea capture to script, edit, thumbnail, and publication.
- **04_Finance & Stripe/Bank Tracker**: Real-time monthly revenue and burn-rate calculations.
- **05_Client CRM**: Lead pipeline from initial inquiry to paid contract.`
    },
    tags: ["Notion", "Productivity", "Second Brain", "Founder OS", "CRM"]
  },

  // 4. Code & Boilerplates
  {
    id: "code-saas-starter",
    title: "SaaS Launchpad: Next.js 15, Tailwind & Stripe Production Starter Kit",
    type: "code",
    category: "Code & Boilerplates",
    subtitle: "Launch your SaaS in 48 hours with Auth, Subscriptions, and Admin Dashboard",
    badge: "Developer Pro",
    badgeColor: "red",
    priceNGN: 25000,
    priceUSD: 34.99,
    originalPriceNGN: 60000,
    originalPriceUSD: 79.00,
    rating: 4.98,
    reviewsCount: 142,
    pages: "Full Production Repo • TypeScript & React",
    description: "Production-ready, battle-hardened boilerplate for shipping modern web apps. Includes Next.js 15 App Router, Supabase/Prisma ORM, NextAuth/Clerk authentication, Stripe webhook subscriptions, Tailwind CSS, and shadcn/ui components.",
    features: [
      "Complete Next.js 15 (App Router) + TypeScript Codebase",
      "Stripe Webhook Subscription Flow (Monthly/Annual plans)",
      "NextAuth & Social OAuth Logins Pre-Configured",
      "Responsive Dark/Light Mode with Tailwind & Radix UI",
      "Full GitHub Repository Access & Docker Deployment Setup"
    ],
    sampleExcerpt: {
      chapter: "Codebase Structure & Package Dependencies",
      content: `\`\`\`bash
saas-launchpad/
├── app/
│   ├── (auth)/login/page.tsx
│   ├── (dashboard)/billing/page.tsx
│   └── api/stripe/webhook/route.ts
├── components/ui/ (30+ Accessible Radix Components)
├── lib/prisma.ts (PostgreSQL Data Models)
└── package.json (Next.js 15, React 19, Tailwind CSS, Stripe SDK)
\`\`\``
    },
    tags: ["Next.js", "React", "SaaS", "Boilerplate", "TypeScript", "Stripe"]
  },

  // 5. UI/UX & Design Systems
  {
    id: "design-cyberglass-figma",
    title: "CyberGlass UI: Modern Figma Design System & 350+ Components",
    type: "design",
    category: "UI/UX & Design",
    subtitle: "Premium Glassmorphism & Cyber Obsidian Design System for Web & Mobile",
    badge: "Design Award",
    badgeColor: "purple",
    priceNGN: 13500,
    priceUSD: 16.99,
    originalPriceNGN: 28000,
    originalPriceUSD: 36.00,
    rating: 4.91,
    reviewsCount: 189,
    pages: "Figma File (.fig) + Auto-Layout 5.0",
    description: "Craft stunning cyber, tech, and fintech web applications. Contains 350+ responsive auto-layout components, variant states, electric color palettes, typography tokens, and 20 complete dashboard screen templates.",
    features: [
      "350+ Atomic Design Components (Buttons, Modals, Cards, Inputs)",
      "20 Pre-Built Desktop & Mobile Screen Layouts",
      "Full Figma Auto-Layout 5.0 & Variable Tokens",
      "Electric Red, Cobalt Blue, Emerald Green & Obsidian Themes",
      "Free Commercial License for Unlimited Client Projects"
    ],
    sampleExcerpt: {
      chapter: "Design Tokens & Variable Specs",
      content: `### Design System Specifications:
- **Color Palettes**: Electric Red (#EF4444), Cyber Blue (#3B82F6), Emerald (#10B981), Obsidian (#07090E).
- **Glassmorphism Spec**: \`backdrop-filter: blur(20px)\`, border opacity 0.15, inner glow 0.08.
- **Typography Scale**: Display Header (64px), H1 (42px), H2 (32px), Body (16px), Caption (12px).
- **Grid Structure**: 12-Column Responsive Desktop (1320px max width).`
    },
    tags: ["Figma", "UI/UX", "Design System", "Glassmorphism", "Dashboard"]
  },

  // 6. Spreadsheets & Financial Models
  {
    id: "sheet-startup-financials",
    title: "The Complete Startup Financial Model, Cap Table & Runway Forecasting Suite",
    type: "spreadsheet",
    category: "Spreadsheets & Finance",
    subtitle: "Institutional-Grade Financial Model in Excel & Google Sheets",
    badge: "Essential",
    badgeColor: "blue",
    priceNGN: 16000,
    priceUSD: 21.99,
    originalPriceNGN: 35000,
    originalPriceUSD: 45.00,
    rating: 4.93,
    reviewsCount: 156,
    pages: "Excel (.xlsx) + Google Sheets Template",
    description: "Built by veteran startup advisors for fundraising and cash management. Features 3-statement financial projections (Income Statement, Cash Flow, Balance Sheet), unit economics, dynamic hiring plans, and automated investor charts.",
    features: [
      "3-Year Monthly & 5-Year Annual Projection Models",
      "Dynamic Headcount & Salary Tax Planning Calculator",
      "Cap Table & Dilution Calculator (Pre/Post-Money SAFE Notes)",
      "SaaS Metrics Dashboard: CAC, LTV, MRR, Churn & Magic Number",
      "Compatible with Microsoft Excel & Google Sheets"
    ],
    sampleExcerpt: {
      chapter: "Financial Model Tab Architecture",
      content: `### Included Financial Worksheets:
1. **Summary Dashboard**: High-level KPI charts for investor pitch decks.
2. **Revenue Engine**: Multi-tier subscription and unit sales forecasting.
3. **OPEX & Staffing**: Automated salary, contractor, software, and marketing costs.
4. **Cap Table**: Investor ownership percentages and waterfall scenario analysis.
5. **Cash Runway**: Burn rate alerts and sensitivity toggles (Optimistic / Base / Stress).`
    },
    tags: ["Excel", "Google Sheets", "Finance", "Startup", "Cap Table", "Runway"]
  },

  // 7. Business & Legal Templates
  {
    id: "legal-contract-vault",
    title: "Agency & Tech Founder Legal Contracts Vault (25+ Customizable Agreements)",
    type: "legal",
    category: "Business & Legal",
    subtitle: "Lawyer-Drafted Agreements to Protect Your Revenue, IP, and Client Deals",
    badge: "Protection",
    badgeColor: "red",
    priceNGN: 18000,
    priceUSD: 24.99,
    originalPriceNGN: 45000,
    originalPriceUSD: 60.00,
    rating: 4.97,
    reviewsCount: 204,
    pages: "25+ Legal Word & PDF Templates",
    description: "Don't risk legal disputes or unpaid invoices. Get attorney-reviewed contract templates tailored for software agencies, freelancers, consultants, and digital product creators.",
    features: [
      "Master Services Agreement (MSA) & Statement of Work (SOW)",
      "Strict Mutual Non-Disclosure Agreement (NDA)",
      "Software Development & IP Assignment Agreement",
      "Independent Contractor & Subcontractor Agreement",
      "Digital Product Commercial Licensing & Refund Terms"
    ],
    sampleExcerpt: {
      chapter: "Contract Clause Preview: Intellectual Property Assignment",
      content: `\`\`\`text
CLAUSE 8.2 — INTELLECTUAL PROPERTY & TRANSFER OF RIGHTS:
Upon full and final receipt of payment for the Services rendered, the Contractor hereby unconditionally assigns and transfers to the Client all right, title, and interest worldwide in and to all Work Product, deliverables, and patentable innovations created under this Statement of Work. Pre-existing proprietary libraries and developer utility frameworks remain the intellectual property of Contractor, subject to an irrevocable, royalty-free perpetual license granted to Client.
\`\`\``
    },
    tags: ["Legal", "Contracts", "Agency", "Freelance", "NDA", "Agreements"]
  },

  // 8. Creative Assets & 3D Packs
  {
    id: "assets-3d-cyberpunk",
    title: "3D Cyberpunk & Holographic Icon & Mockup Suite (120+ 4K Assets)",
    type: "assets",
    category: "Creative Assets",
    subtitle: "Ultra-High Resolution 3D Tech Elements, Floating UI Orbs & Devices",
    badge: "Creative",
    badgeColor: "purple",
    priceNGN: 9000,
    priceUSD: 11.99,
    originalPriceNGN: 20000,
    originalPriceUSD: 26.00,
    rating: 4.87,
    reviewsCount: 133,
    pages: "120+ 4K Alpha PNGs + Blender Source Files",
    description: "Supercharge your website landing pages, presentation decks, and social media graphics. 120+ transparent 4K PNG 3D assets modeled in Blender and rendered with octane glass, red & blue neon luminescence.",
    features: [
      "120+ High-Resolution (4096 x 4096) Transparent PNGs",
      "Full Blender 4.2 Source Files (.blend) with Shader Nodes",
      "Tech Devices: Holographic Phones, Laptops, Glass Cards & Servers",
      "Abstract Tech Orbs, Shield Badges, Lightning & Cyber Particles",
      "Full Commercial Use License Included"
    ],
    sampleExcerpt: {
      chapter: "Asset Catalog & File Formats",
      content: `### Included 3D Asset Folders:
- **01_Hardware_Devices**: Glass bezel phones, floating dual-screen laptops, server racks.
- **02_Cyber_Symbols**: 3D Bitcoin, Ethereum, Shield, Security Lock, Lightning bolt.
- **03_Holographic_Shapes**: Torus rings, glowing isometric nodes, data prisms.
- **04_Blender_Scene**: Studio lighting rig with customizable RGB neon emission sliders.`
    },
    tags: ["3D Assets", "Blender", "Icons", "Cyberpunk", "Mockups", "PNG"]
  }
];

export const shopCategories = [
  "All Products",
  "eBooks & Guides",
  "Prompt Vaults",
  "Notion & Productivity",
  "Code & Boilerplates",
  "UI/UX & Design",
  "Spreadsheets & Finance",
  "Business & Legal",
  "Creative Assets"
];
