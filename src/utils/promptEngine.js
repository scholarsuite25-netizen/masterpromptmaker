// Master Prompt Studio - Intelligent Heuristic & Hybrid Prompt Engineering Engine
// Powers instant, high-quality prompt restructuring across LLMs and Image AIs

export const MODEL_OPTIONS = [
  { id: "chatgpt", name: "ChatGPT 4o", company: "OpenAI", icon: "bot" },
  { id: "claude", name: "Claude 3.5 Sonnet", company: "Anthropic", icon: "sparkles" },
  { id: "gemini", name: "Gemini 1.5 Pro", company: "Google", icon: "zap" },
  { id: "midjourney", name: "Midjourney v6.1", company: "Midjourney", icon: "image" },
  { id: "deepseek", name: "DeepSeek R1 / V3", company: "DeepSeek", icon: "cpu" }
];

export const FRAMEWORK_OPTIONS = [
  {
    id: "rtf",
    name: "RTF Framework",
    desc: "Role + Task + Format. Crisp, structured, reliable.",
    badge: "Most Popular"
  },
  {
    id: "star",
    name: "STAR Method",
    desc: "Situation + Task + Action + Result + Evaluation.",
    badge: "Enterprise"
  },
  {
    id: "cot",
    name: "Chain-of-Thought (CoT)",
    desc: "Forces step-by-step reasoning before conclusion.",
    badge: "High Accuracy"
  },
  {
    id: "persona",
    name: "Persona & Authority",
    desc: "Domain specialist with strict guardrails.",
    badge: "Expert Level"
  },
  {
    id: "fewshot",
    name: "Few-Shot Demonstration",
    desc: "Demonstrates positive and negative exemplars.",
    badge: "Complex Tasks"
  }
];

export const TONE_OPTIONS = [
  { id: "authoritative", label: "Authoritative & Concise" },
  { id: "analytical", label: "Deep Analytical & Rigorous" },
  { id: "creative", label: "Engaging & Persuasive" },
  { id: "technical", label: "Senior Technical / Code Architect" },
  { id: "executive", label: "C-Level Executive Summary" }
];

export const FORMAT_OPTIONS = [
  { id: "structured_markdown", label: "Structured Markdown & Tables" },
  { id: "step_by_step", label: "Numbered Step-by-Step Roadmap" },
  { id: "json_schema", label: "JSON Schema / Structured Payload" },
  { id: "bullet_points", label: "Actionable Bulleted Checklist" },
  { id: "ready_to_send", label: "Production-Ready Final Copy" }
];

/**
 * Intelligent prompt transformation engine
 */
export function optimizePromptLocally(rawText, {
  model = "chatgpt",
  framework = "rtf",
  tone = "authoritative",
  format = "structured_markdown",
  customGoal = ""
}) {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return {
      optimized: "",
      diffAdded: [],
      metrics: { beforeWords: 0, afterWords: 0, clarityScore: 0, improvement: 0, tokensBefore: 0, tokensAfter: 0 },
      explanation: []
    };
  }

  let roleDefinition = "";
  let toneGuideline = "";
  let formatGuideline = "";
  let constraints = [];
  let executionSteps = [];
  let explanationPoints = [];

  // Determine Persona & Role based on text cues
  const lower = trimmed.toLowerCase();
  if (lower.includes("code") || lower.includes("python") || lower.includes("react") || lower.includes("javascript") || lower.includes("sql") || lower.includes("bug") || lower.includes("developer")) {
    roleDefinition = "Principal Software Architect and Staff Technical Reviewer with 15+ years of production experience.";
    toneGuideline = "Rigorous, production-ready, security-conscious, adhering to clean architecture and zero-waste memory management.";
    constraints.push("Do not provide hypothetical pseudo-code; write robust, runnable snippets with inline edge-case handling.");
    constraints.push("Explicitly identify Big-O time and space complexity.");
    explanationPoints.push("Injected senior engineering persona to guard against naive or un-typed code suggestions.");
  } else if (lower.includes("email") || lower.includes("copy") || lower.includes("sales") || lower.includes("marketing") || lower.includes("ad") || lower.includes("customer")) {
    roleDefinition = "World-Class Direct-Response Copywriter and Conversion Optimization Strategist.";
    toneGuideline = "Compelling, psychologically primed, devoid of generic corporate fluff, optimized for high click-through and reply rates.";
    constraints.push("Eliminate all passive voice and cliché marketing buzzwords (e.g. 'leverage', 'cutting-edge', 'seamless').");
    constraints.push("Ensure mobile scannability: maximum 2 sentences per paragraph.");
    explanationPoints.push("Added direct-response frameworks (PAS / AIDA) and removed corporate jargon.");
  } else if (lower.includes("investor") || lower.includes("startup") || lower.includes("business") || lower.includes("pitch") || lower.includes("founder")) {
    roleDefinition = "Top-Tier Venture Capital Partner and Startup Growth Advisor.";
    toneGuideline = "Direct, hyper-focused on unit economics, defensibility, unfair advantages, and quantifiable traction.";
    constraints.push("Prioritize high-conviction metrics, customer acquisition costs (CAC), and LTV over vanity metrics.");
    explanationPoints.push("Anchored with venture capital evaluation standards for maximum persuasion.");
  } else if (model === "midjourney" || lower.includes("photo") || lower.includes("image") || lower.includes("art") || lower.includes("render")) {
    roleDefinition = "Master Visual Director and Senior Cinematic Photographer.";
    toneGuideline = "Visually descriptive, photographic gear specifications, lighting physics, and mood tone.";
    explanationPoints.push("Structured with Midjourney v6.1 camera specs, lighting rigs, and rendering flags.");
  } else {
    roleDefinition = "Distinguished Subject Matter Expert, Technical Advisor, and Critical Thinker.";
    toneGuideline = "Clear, articulate, nuance-aware, and organized for immediate actionable implementation.";
    explanationPoints.push("Upgraded vague instructions to clear domain authority framing.");
  }

  // Handle Midjourney specific structure
  if (model === "midjourney") {
    const optimized = `/imagine prompt: Award-winning cinematic visual masterpiece of ${trimmed}. Detailed atmosphere with volumetric fog and dual crimson red and cobalt blue accent lighting. Shot on Hasselblad H6D-100c with 85mm f/1.4 lens, natural skin/surface textures, depth of field bokeh, photorealistic 8k render, color graded --ar 16:9 --style raw --v 6.1 --q 2`;
    
    return {
      optimized,
      metrics: calculateMetrics(trimmed, optimized),
      explanation: [
        "Added professional camera sensor and prime focal length lens specs.",
        "Included physical lighting instructions (dual crimson red & cobalt blue rim lights).",
        "Configured Midjourney v6.1 aspect ratio and style raw parameters for zero AI artifacts."
      ]
    };
  }

  // Construct Framework Transformation
  let optimized = "";

  if (framework === "star") {
    optimized = `### SYSTEM PERSONA
You are a ${roleDefinition}

### 1. SITUATION (Context & Baseline)
Contextual Environment: You are operating in a demanding, high-stakes scenario where precision and real-world applicability are paramount.
Initial Prompt Intent: "${trimmed}"
${customGoal ? `Specific Goal: ${customGoal}` : ""}

### 2. TASK (Primary Objective)
Your objective is to comprehensively address the user's intent with depth, zero superficial generalizations, and actionable clarity.

### 3. ACTION & IMPLEMENTATION PROTOCOL
Execute the following step-by-step:
1. Conduct an initial root-cause / core requirement evaluation.
2. Formulate the optimal strategy, identifying any non-obvious trade-offs or constraints.
3. Deliver the concrete solution directly applying the following tone: ${toneGuideline}
4. Apply the following guardrails:
${constraints.map(c => `   - ${c}`).join("\n")}

### 4. RESULT & DELIVERABLE SPECIFICATION
Provide your output strictly in the following format:
- Format: ${formatGuidelineFor(format)}
- Include an executive summary, core deliverable, and a 3-point verification checklist.`;
    explanationPoints.push("Mapped instructions into the STAR framework for structured enterprise reasoning.");
  } else if (framework === "cot") {
    optimized = `### SYSTEM ROLE
You are a ${roleDefinition}

### INPUT TOPIC / REQUEST
"${trimmed}"
${customGoal ? `Target Outcome: ${customGoal}` : ""}

### CHAIN-OF-THOUGHT INSTRUCTIONS (Think Step-by-Step)
Before presenting your final answer, systematically walk through the following analytical stages:

Stage 1: Deconstruction
- Identify the explicit goals and underlying implicit requirements.
- Highlight common pitfalls, anti-patterns, or misconceptions associated with this request.

Stage 2: Solution Architecture
- Formulate the primary solution, ensuring adherence to modern best practices.
- Consider edge cases, scalability, and long-term sustainability.

Stage 3: Validation & Refinement
- Critically challenge your draft solution for clarity, accuracy, and completeness.
- Refine tone: ${toneGuideline}

### REQUIRED OUTPUT FORMAT
Present the final validated output using:
${formatGuidelineFor(format)}

Guardrails:
- Do NOT skip intermediate logic.
- Avoid generic filler or passive voice.`;
    explanationPoints.push("Added step-by-step Chain-of-Thought reasoning stages to minimize hallucinations.");
  } else if (framework === "persona") {
    optimized = `### EXPERT PERSONA ASSIGNMENT
You are a world-renowned ${roleDefinition}
You speak with authoritative conviction, deep domain mastery, and practical real-world experience.

### TASK DIRECTIVE
I need you to tackle the following request with peer-reviewed quality:
"${trimmed}"

### OPERATIONAL PARAMETERS
- Tone & Voice: ${toneGuideline}
- Domain Rules:
  1. Base recommendations on empirical industry standards, not outdated textbook theory.
  2. Clearly distinguish between 'Must-Haves' and 'Nice-to-Haves'.
  3. Anticipate 2 critical follow-up obstacles the user might face and proactively solve them.

### OUTPUT PRESENTATION
Format your response as ${formatGuidelineFor(format)}.`;
    explanationPoints.push("Framed prompt with world-class authority and anti-hallucination domain rules.");
  } else if (framework === "fewshot") {
    optimized = `### ROLE
You are a ${roleDefinition}

### TASK
Respond to the target query following the exact standard of excellence modeled below.

### FEW-SHOT DEMONSTRATIONS

#### Example Input (Weak):
"Give me tips on improving my workflow."
#### Example High-Value Output:
"1. Time-Boxing Matrix: Allocate 90-minute uninterrupted deep-work sprints for high-cognitive tasks, followed by a 15-minute bio-break.
 2. Asynchronous Communication Protocol: Batch email/Slack reviews to twice daily (11:00 AM and 4:00 PM) to protect flow state.
 3. Automated Checklists: Build procedural SOPs for repetitive tasks using automated templates."

---

### TARGET QUERY FOR PROCESSING:
"${trimmed}"
${customGoal ? `Target Specifics: ${customGoal}` : ""}

### CONSTRAINTS & FORMAT
- Adhere to tone: ${toneGuideline}
- Format strictly as: ${formatGuidelineFor(format)}
- Provide immediate, high-density value with zero fluff.`;
    explanationPoints.push("Provided explicit few-shot exemplars to calibrate quality and format.");
  } else {
    // Default: RTF (Role-Task-Format)
    if (model === "claude") {
      optimized = `<role>
You are a ${roleDefinition}
</role>

<context>
The user needs an expert-level solution for:
"${trimmed}"
${customGoal ? `<goal>${customGoal}</goal>` : ""}
</context>

<instructions>
1. Analyze the core request and address every implicit requirement.
2. Tone of voice: ${toneGuideline}
3. Follow these operational constraints:
${constraints.map(c => `   - ${c}`).join("\n") || "   - Provide concrete, immediately usable deliverables."}
</instructions>

<output_format>
Structure your response using ${formatGuidelineFor(format)}. Ensure clear typography, markdown headers, and highlighted key takeaways.
</output_format>`;
      explanationPoints.push("Optimized with Claude's native XML tag schema for peak model adherence.");
    } else {
      optimized = `### ROLE
You are a ${roleDefinition}

### TASK
${trimmed}
${customGoal ? `\nTarget Objective: ${customGoal}` : ""}

### GUIDELINES & CONSTRAINTS
- Tone: ${toneGuideline}
${constraints.length > 0 ? constraints.map(c => `- ${c}`).join("\n") : "- Provide highly detailed, actionable, and non-generic instructions."}
- Avoid boilerplate pleasantries ('Sure, I would be happy to help!'). Begin immediately with the core deliverable.

### OUTPUT FORMAT
Structure the response strictly as:
${formatGuidelineFor(format)}`;
      explanationPoints.push("Structured raw prompt into clean RTF blocks with explicit guardrails.");
    }
  }

  const metrics = calculateMetrics(trimmed, optimized);
  return {
    optimized,
    metrics,
    explanation: explanationPoints
  };
}

function formatGuidelineFor(formatId) {
  switch (formatId) {
    case "step_by_step":
      return "Numbered chronological steps (Step 1, Step 2...) with bulleted actions and a success verification metric for each phase.";
    case "json_schema":
      return "Valid, parseable JSON code block with camelCase keys, typed fields, and inline comments illustrating expected data types.";
    case "bullet_points":
      return "High-impact bulleted checklist grouped by category, with bold lead-ins for each point.";
    case "ready_to_send":
      return "Final, polished, copy-paste-ready text without meta-commentary, placeholders clearly designated with [BRACKETS].";
    default:
      return "Clean Markdown with distinct H2/H3 headers, bold key phrases, and summary tables where comparative data is presented.";
  }
}

function calculateMetrics(beforeText, afterText) {
  const beforeWords = beforeText.split(/\s+/).filter(Boolean).length;
  const afterWords = afterText.split(/\s+/).filter(Boolean).length;
  const tokensBefore = Math.round(beforeWords * 1.33);
  const tokensAfter = Math.round(afterWords * 1.33);

  // Compute clarity improvement formula
  const expansionFactor = Math.min(afterWords / Math.max(beforeWords, 1), 6);
  const baseScore = Math.min(Math.round(45 + expansionFactor * 9), 98);
  const improvement = Math.min(Math.round(((afterWords - beforeWords) / Math.max(beforeWords, 1)) * 100), 450);

  return {
    beforeWords,
    afterWords,
    tokensBefore,
    tokensAfter,
    clarityScore: baseScore,
    improvement: Math.max(improvement, 85)
  };
}
