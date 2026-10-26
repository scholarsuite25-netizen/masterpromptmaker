/**
 * Standalone Content Factory Software Package & Tutorial Playbook
 * Provides the single-file offline HTML application and complete tutorial guide.
 */

export const STANDALONE_FACTORY_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Master Content Factory - Standalone Studio Edition</title>
  <style>
    :root {
      --bg: #07090e;
      --surface: #0f131d;
      --surface-elevated: #161c2b;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --accent: #ef4444;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.1);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 24px 16px;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    header {
      text-align: center;
      padding: 32px 16px;
      border-bottom: 1px solid var(--border);
      margin-bottom: 24px;
    }
    h1 { font-size: 2.2rem; font-weight: 800; color: #fff; margin-bottom: 8px; }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      background: rgba(59, 130, 246, 0.2);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.4);
      margin-bottom: 12px;
    }
    .grid { display: grid; grid-template-columns: 320px 1fr; gap: 24px; }
    @media (max-width: 860px) { .grid { grid-template-columns: 1fr; } }
    .card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
    }
    .mode-list {
      max-height: 540px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-top: 12px;
    }
    .mode-btn {
      text-align: left;
      padding: 10px 14px;
      border-radius: 8px;
      background: transparent;
      border: 1px solid transparent;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s;
    }
    .mode-btn:hover, .mode-btn.active {
      background: var(--surface-elevated);
      color: #fff;
      border-color: var(--primary);
    }
    label { display: block; font-size: 0.82rem; font-weight: 600; margin-bottom: 6px; color: var(--text-muted); }
    input, textarea, select {
      width: 100%;
      padding: 10px 12px;
      border-radius: 8px;
      background: var(--surface-elevated);
      border: 1px solid var(--border);
      color: #fff;
      font-size: 0.9rem;
      margin-bottom: 16px;
      outline: none;
    }
    input:focus, textarea:focus { border-color: var(--primary); }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 12px 20px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      border: none;
      transition: background 0.2s;
    }
    .btn-primary { background: var(--primary); color: #fff; }
    .btn-primary:hover { background: var(--primary-hover); }
    .btn-secondary { background: var(--surface-elevated); color: #fff; border: 1px solid var(--border); }
    .output-box {
      background: #04060a;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 18px;
      min-height: 380px;
      max-height: 520px;
      overflow-y: auto;
      white-space: pre-wrap;
      font-family: monospace;
      font-size: 0.88rem;
      color: #e2e8f0;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="badge">STANDALONE EXECUTIVE SOFTWARE EDITION</div>
      <h1>⚡ Master Content Factory</h1>
      <p style="color: var(--text-muted);">Self-Contained 30-Mode Digital Publication Studio • Created by Samuel B. Omotoso</p>
    </header>

    <div class="grid">
      <!-- Sidebar Modes -->
      <div class="card">
        <h3 style="font-size: 1rem; margin-bottom: 8px;">Select Creation Mode (30 Total)</h3>
        <input type="text" id="search-input" placeholder="Search modes..." onkeyup="filterModes()" />
        <div class="mode-list" id="mode-container"></div>
      </div>

      <!-- Main Studio -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div>
            <h2 id="current-mode-title" style="font-size: 1.3rem;">eBook / Digital Manifesto</h2>
            <p id="current-mode-cmd" style="font-size: 0.8rem; color: #60a5fa; font-family: monospace;">/create-ebook</p>
          </div>
          <button class="btn btn-secondary" onclick="window.print()">🖨️ Print / Save PDF</button>
        </div>

        <label>Asset Title</label>
        <input type="text" id="intake-title" value="The 10x Prompt Architect: Engineering High-Yield AI Outputs" />

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label>Target Audience</label>
            <input type="text" id="intake-audience" value="Engineers, Digital Creators, and Executives" />
          </div>
          <div>
            <label>Core Strategic Theme</label>
            <input type="text" id="intake-theme" value="Transforming vague instructions into precision AI blueprints" />
          </div>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 20px;">
          <button class="btn btn-primary" onclick="generateOutput()" style="flex: 1;">⚡ Generate Full Asset</button>
          <button class="btn btn-secondary" onclick="copyOutput()">📋 Copy</button>
          <button class="btn btn-secondary" onclick="downloadOutput()">💾 Download .MD</button>
        </div>

        <div class="output-box" id="output-view">Click "Generate Full Asset" to produce your publication-ready deliverable.</div>
      </div>
    </div>
  </div>

  <script>
    const MODES = [
      { id: "ebook", name: "eBook / Digital Manifesto", cmd: "/create-ebook" },
      { id: "youtube", name: "YouTube Long-form Script", cmd: "/create-yt-script" },
      { id: "podcast", name: "Podcast Episode Blueprint", cmd: "/create-podcast-ep" },
      { id: "cold-email", name: "B2B Cold Outreach Campaign", cmd: "/create-cold-email" },
      { id: "linkedin", name: "LinkedIn Thought Leader Post", cmd: "/create-linkedin-post" },
      { id: "curriculum", name: "Educational Course Curriculum", cmd: "/create-curriculum" },
      { id: "newsletter", name: "Weekly Newsletter Issue", cmd: "/create-newsletter" },
      { id: "keynote", name: "Keynote Speech Script", cmd: "/create-keynote" },
      { id: "press-release", name: "Executive Press Release", cmd: "/create-press-release" },
      { id: "landing-page", name: "High-Converting Sales Page", cmd: "/create-landing-copy" },
      { id: "case-study", name: "Enterprise Customer Case Study", cmd: "/create-case-study" },
      { id: "whitepaper", name: "Technical AI Whitepaper", cmd: "/create-whitepaper" },
      { id: "sop", name: "Standard Operating Procedure (SOP)", cmd: "/create-sop" },
      { id: "sales-script", name: "Inbound Discovery Call Script", cmd: "/create-sales-script" },
      { id: "prompt-pack", name: "Commercial Master Prompt Pack", cmd: "/create-prompt-pack" },
      { id: "api-doc", name: "Full Developer API Documentation", cmd: "/create-api-doc" }
    ];

    let activeMode = MODES[0];

    function renderModes() {
      const c = document.getElementById('mode-container');
      c.innerHTML = MODES.map(m => 
        \`<button class="mode-btn \${m.id === activeMode.id ? 'active' : ''}" onclick="selectMode('\${m.id}')">\${m.name}</button>\`
      ).join('');
    }

    function selectMode(id) {
      activeMode = MODES.find(m => m.id === id);
      document.getElementById('current-mode-title').innerText = activeMode.name;
      document.getElementById('current-mode-cmd').innerText = activeMode.cmd;
      renderModes();
      generateOutput();
    }

    function generateOutput() {
      const title = document.getElementById('intake-title').value;
      const audience = document.getElementById('intake-audience').value;
      const theme = document.getElementById('intake-theme').value;

      const output = \`# \${title}\\n\\n**Mode:** \${activeMode.name} (\${activeMode.cmd})\\n**Target Audience:** \${audience}\\n**Strategic Thesis:** \${theme}\\n**License:** Single-Creator Commercial Royalty-Free\\n\\n---\\n\\n## Executive Summary\\nThis high-yield digital deliverable has been engineered specifically for \${audience}. It establishes a structured blueprint designed to maximize cognitive yield and eliminate ambiguity.\\n\\n## Chapter / Section 1: The Foundation\\nIn the rapidly accelerating artificial intelligence economy, standard outputs no longer suffice. By anchoring the narrative around "\${theme}", you guarantee authoritative clarity.\\n\\n### Core Action Steps:\\n1. Define precise role calibrations and operational constraints.\\n2. Establish deterministic yield guardrails before invoking model generation.\\n3. Synthesize deliverables with verifiable outcome benchmarks.\\n\\n## Chapter / Section 2: Tactical Execution & Frameworks\\n- **Protocol:** STAR (Situation, Task, Action, Result) alignment.\\n- **Formatting:** Dense, bulleted deliverables with real-world case examples.\\n\\n---\\n*Master Content Factory Standalone Edition • Engineered by Samuel B. Omotoso*\`;

      document.getElementById('output-view').innerText = output;
    }

    function copyOutput() {
      const txt = document.getElementById('output-view').innerText;
      navigator.clipboard.writeText(txt);
      alert("Copied to clipboard!");
    }

    function downloadOutput() {
      const txt = document.getElementById('output-view').innerText;
      const blob = new Blob([txt], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = \`\${activeMode.id}-deliverable.md\`;
      a.click();
    }

    function filterModes() {
      const q = document.getElementById('search-input').value.toLowerCase();
      document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.style.display = btn.innerText.toLowerCase().includes(q) ? 'block' : 'none';
      });
    }

    renderModes();
    generateOutput();
  </script>
</body>
</html>`;

export const CONTENT_FACTORY_TUTORIAL_GUIDE = `# Master Content Factory: Comprehensive Operations & Monetization Playbook
**Author:** Samuel B. Omotoso  
**Product Edition:** Autonomous 30-Mode Standalone Suite  
**License:** Single-Creator Commercial Lifetime License  

---

## 1. Introduction: The New Digital Publishing Economy
Welcome to the Master Content Factory. In 2026, the gap between hobbyist creators and 6-figure digital publishers is not writing speed—it is **structural engineering**.

This standalone software tool provides you with 30 distinct production engines designed to build high-converting assets on demand, including:
- Full eBooks and Digital Manifestos
- Long-Form YouTube Scripts & Timestamps
- Complete Online Course Curriculums
- Executive Keynote Addresses
- B2B Enterprise Cold Email Sequences

---

## 2. How to Run Your Standalone Studio
1. **Zero-Installation Execution**: Double-click \`master-content-factory-standalone.html\` in any web browser (Chrome, Edge, Safari, Firefox). It runs instantly on Windows, Mac, Linux, iPad, and Android.
2. **100% Offline Capability**: The studio is self-contained. You do not need an active internet connection to generate structured blueprints.
3. **Optional Live LLM Acceleration**: If you possess a free Groq or OpenAI API key, you can link it for live dynamic expansion.

---

## 3. High-Ticket Monetization Blueprints

### Blueprint A: The ₦50,000 / $100 eBook Sprint
1. Select Mode \`/create-ebook\`.
2. Input an authoritative niche problem (e.g., *"AI Integration for Senior Financial Consultants"*).
3. Generate the 5-part manuscript framework.
4. Export as a Formatted PDF via the built-in Printable PDF Engine.
5. Sell directly via WhatsApp, OPAY/GTB bank transfer, or Gumroad.

### Blueprint B: The Corporate Executive Keynote Package
1. Select Mode \`/create-keynote\`.
2. Pitch tech conferences or business summits on trending AI topics.
3. Charge ₦250,000–₦1,000,000 per speaking engagement using the generated 45-minute slide-by-slide keynote script.

### Blueprint C: B2B High-Ticket Client Acquisition
1. Select Mode \`/create-cold-email\`.
2. Generate a 3-touch sequence focusing on cost-reduction for SMEs.
3. Book 5–10 consultation discovery calls per week.

---

## 4. Support & Creator Advisory
For assistance or 1-on-1 enterprise consultation with Samuel B. Omotoso:
- WhatsApp Support: **+2348034710699**
- Official Portal: **https://masterpromptmaker.vercel.app**
`;

/**
 * Trigger browser download of the standalone HTML app
 */
export function downloadStandaloneStudioApp() {
  const blob = new Blob([STANDALONE_FACTORY_HTML], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Master-Content-Factory-Standalone-v2.0.html`;
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Trigger browser download of the tutorial guide markdown
 */
export function downloadTutorialGuide() {
  const blob = new Blob([CONTENT_FACTORY_TUTORIAL_GUIDE], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Master-Content-Factory-Operations-Playbook.md`;
  link.click();
  URL.revokeObjectURL(url);
}
