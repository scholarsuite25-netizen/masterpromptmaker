/**
 * Universal Formatted Deliverable & Printable PDF Engine
 * Opens a beautifully formatted, publication-ready document in a print window
 * with high-density typography, executive styling, and auto-invokes window.print().
 */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Parses markdown into clean HTML for print styling
 */
function markdownToPrintHtml(md) {
  if (!md) return '';
  
  let html = escapeHtml(md);

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="doc-h3">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="doc-h2">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="doc-h1">$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Bullet lists
  html = html.replace(/^\s*[-*]\s+(.*$)/gim, '<li class="bullet-item">$1</li>');
  html = html.replace(/(<li class="bullet-item">.*<\/li>)/gms, '<ul class="bullet-list">$1</ul>');

  // Numbered lists
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="numbered-item">$1</li>');
  html = html.replace(/(<li class="numbered-item">.*<\/li>)/gms, '<ol class="numbered-list">$1</ol>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr class="doc-divider" />');

  // Paragraphs
  html = html.split('\n\n').map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<pre') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<hr')) {
      return p;
    }
    return `<p class="doc-p">${p.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');

  return html;
}

/**
 * Generate and open a printable publication deliverable
 * @param {Object} options
 * @param {string} options.title Document Title
 * @param {string} options.subtitle Subtitle or Category
 * @param {string} options.author Author name (default S. B. Omotoso)
 * @param {string} options.badge Top badge (e.g. "OFFICIAL DELIVERABLE", "OPTIMIZED PROMPT")
 * @param {string} options.content Markdown or text content
 * @param {Object} options.metadata Key-value pairs of metadata tags
 */
export function openFormattedPrintableDoc({
  title = "Master Prompt Deliverable",
  subtitle = "Executive Publication Artifact",
  author = "Samuel B. Omotoso • Master Prompt Studio",
  badge = "CERTIFIED DIGITAL DELIVERABLE",
  content = "",
  metadata = {}
}) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert("Please allow pop-ups for this website to generate printable PDF documents.");
    return false;
  }

  const parsedBody = markdownToPrintHtml(content);
  const dateStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const metadataHtml = Object.entries(metadata)
    .filter(([_, val]) => Boolean(val))
    .map(([key, val]) => `
      <div class="meta-item">
        <span class="meta-key">${escapeHtml(key)}:</span>
        <span class="meta-value">${escapeHtml(String(val))}</span>
      </div>
    `).join('');

  const docHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)} - Master Prompt Studio</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

    :root {
      --primary: #0284c7;
      --primary-dark: #0369a1;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --border: #e2e8f0;
      --bg-subtle: #f8fafc;
      --accent-badge: #eff6ff;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: var(--text-main);
      background: #ffffff;
      line-height: 1.65;
      padding: 48px 36px;
      max-width: 860px;
      margin: 0 auto;
    }

    /* Print header */
    .doc-header {
      border-bottom: 2px solid var(--border);
      padding-bottom: 24px;
      margin-bottom: 32px;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .studio-brand {
      font-weight: 800;
      font-size: 16px;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 1.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .security-badge {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 10px;
      border-radius: 4px;
      background: var(--accent-badge);
      color: var(--primary-dark);
      border: 1px solid #bfdbfe;
    }

    .doc-title {
      font-size: 28px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.25;
      margin-bottom: 8px;
    }

    .doc-subtitle {
      font-size: 15px;
      color: var(--text-muted);
      font-weight: 500;
    }

    .meta-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      background: var(--bg-subtle);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 12px 18px;
      margin: 20px 0 32px 0;
      font-size: 12.5px;
    }

    .meta-item {
      display: flex;
      gap: 6px;
    }

    .meta-key {
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      font-size: 11px;
    }

    .meta-value {
      font-weight: 600;
      color: var(--text-main);
    }

    /* Content Typography */
    .doc-body {
      font-size: 14.5px;
      color: #1e293b;
    }

    .doc-h1 {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-main);
      margin: 32px 0 14px 0;
      padding-bottom: 8px;
      border-bottom: 1px solid var(--border);
    }

    .doc-h2 {
      font-size: 18px;
      font-weight: 700;
      color: #1e293b;
      margin: 26px 0 12px 0;
    }

    .doc-h3 {
      font-size: 15px;
      font-weight: 700;
      color: #334155;
      margin: 20px 0 8px 0;
    }

    .doc-p {
      margin-bottom: 16px;
      line-height: 1.7;
    }

    .bullet-list, .numbered-list {
      margin: 12px 0 18px 24px;
    }

    .bullet-item, .numbered-item {
      margin-bottom: 6px;
      line-height: 1.6;
    }

    .code-block {
      background: #0f172a;
      color: #f8fafc;
      padding: 16px;
      border-radius: 6px;
      font-family: 'JetBrains Mono', Consolas, monospace;
      font-size: 12.5px;
      line-height: 1.55;
      overflow-x: auto;
      margin: 18px 0;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .inline-code {
      font-family: 'JetBrains Mono', Consolas, monospace;
      background: #f1f5f9;
      color: #0f172a;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12.5px;
      border: 1px solid #e2e8f0;
    }

    .doc-divider {
      border: none;
      border-top: 1px solid var(--border);
      margin: 28px 0;
    }

    /* Footer */
    .doc-footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11.5px;
      color: var(--text-muted);
    }

    .print-bar {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #0f172a;
      color: #ffffff;
      padding: 10px 20px;
      border-radius: 50px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.25);
      cursor: pointer;
      font-weight: 700;
      font-size: 13px;
      border: none;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 1000;
    }

    @media print {
      body {
        padding: 0;
        max-width: 100%;
      }
      .print-bar {
        display: none !important;
      }
      .code-block {
        background: #f8fafc !important;
        color: #0f172a !important;
        border: 1px solid #cbd5e1;
      }
    }
  </style>
</head>
<body>
  <button class="print-bar" onclick="window.print()">
    🖨️ Click to Print / Save as PDF
  </button>

  <header class="doc-header">
    <div class="top-bar">
      <div class="studio-brand">⚡ Master Prompt Studio</div>
      <div class="security-badge">${escapeHtml(badge)}</div>
    </div>
    <h1 class="doc-title">${escapeHtml(title)}</h1>
    <p class="doc-subtitle">${escapeHtml(subtitle)}</p>
  </header>

  <div class="meta-grid">
    <div class="meta-item">
      <span class="meta-key">Author / Architect:</span>
      <span class="meta-value">${escapeHtml(author)}</span>
    </div>
    <div class="meta-item">
      <span class="meta-key">Generated:</span>
      <span class="meta-value">${dateStr}</span>
    </div>
    <div class="meta-item">
      <span class="meta-key">License:</span>
      <span class="meta-value">Single Creator Commercial Royalty-Free</span>
    </div>
    ${metadataHtml}
  </div>

  <main class="doc-body">
    ${parsedBody}
  </main>

  <footer class="doc-footer">
    <div>Generated with Master Prompt Studio • Designed by Samuel B. Omotoso</div>
    <div>Page 1 • Official Certified Document</div>
  </footer>

  <script>
    // Automatically trigger print dialog on window load
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(docHtml);
  printWindow.document.close();
  return true;
}
