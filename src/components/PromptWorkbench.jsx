import React, { useState } from 'react';
import { 
  Sparkles, Copy, Check, ExternalLink, ArrowRight, RefreshCw, 
  Trash2, Bookmark, Download, Key, Sliders, CheckCircle2, 
  BarChart3, Eye, FileText, Bot, Zap, Image, Cpu, Printer, ChevronDown, Type
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  MODEL_OPTIONS, 
  FRAMEWORK_OPTIONS, 
  TONE_OPTIONS, 
  FORMAT_OPTIONS, 
  optimizePromptLocally 
} from '../utils/promptEngine';
import { sampleWeakPrompts } from '../data/freeTemplates';

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function PromptWorkbench({ onSavePrompt, onNotify }) {
  const [aiMode, setAiMode] = useState("text"); // 'text' | 'image'
  const [rawPrompt, setRawPrompt] = useState(
    "Write an email to my boss asking for a salary increase based on my recent project performance."
  );
  const [selectedModel, setSelectedModel] = useState("chatgpt");
  const [selectedFramework, setSelectedFramework] = useState("rtf");
  const [selectedTone, setSelectedTone] = useState("authoritative");
  const [selectedFormat, setSelectedFormat] = useState("structured_markdown");
  const [customGoal, setCustomGoal] = useState("");
  
  // Optimization Output State
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [result, setResult] = useState(() => optimizePromptLocally(
    "Write an email to my boss asking for a salary increase based on my recent project performance.",
    { model: "chatgpt", framework: "rtf", tone: "authoritative", format: "structured_markdown" }
  ));
  const [activeOutputTab, setActiveOutputTab] = useState("optimized"); // 'optimized' | 'diff' | 'why'
  const [copied, setCopied] = useState(false);
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [apiKey, setApiKey] = useState("");

  // Handle Mode Switch (Text AI vs Image AI)
  const handleModeSwitch = (mode) => {
    setAiMode(mode);
    if (mode === 'image') {
      setSelectedModel('midjourney');
      if (rawPrompt.includes("Write an email") || !rawPrompt.trim()) {
        setRawPrompt("A cinematic photorealistic portrait of an African digital creator working with glowing holographic AI interfaces in Lagos at night, hyper-detailed, 8k resolution, volumetric lighting, Unreal Engine 5 render --ar 16:9 --v 6.1 --style raw");
      }
      onNotify("Switched to Image AI Mode (Midjourney v6.1 syntax calibrated)!", "blue");
    } else {
      setSelectedModel('chatgpt');
      if (rawPrompt.includes("cinematic photorealistic portrait")) {
        setRawPrompt("Write an email to my boss asking for a salary increase based on my recent project performance.");
      }
      onNotify("Switched to Text AI Mode (LLM frameworks active)!", "blue");
    }
  };

  const handleOptimize = () => {
    if (!rawPrompt.trim()) {
      onNotify("Please enter a prompt to optimize!", "red");
      return;
    }
    setIsOptimizing(true);
    setTimeout(() => {
      const output = optimizePromptLocally(rawPrompt, {
        model: selectedModel,
        framework: selectedFramework,
        tone: selectedTone,
        format: selectedFormat,
        customGoal
      });
      setResult(output);
      setIsOptimizing(false);
      onNotify("Prompt successfully optimized with " + selectedFramework.toUpperCase() + " framework!", "success");
    }, 450);
  };

  // Keyboard shortcut listener (Ctrl + Enter / Cmd + Enter)
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleOptimize();
    }
  };

  const handleLoadSample = () => {
    if (aiMode === 'image') {
      const imageSamples = [
        "A hyper-realistic studio portrait of a woman bathed in dramatic crimson and royal blue neon rim lights, 85mm lens, f/1.4, cinematic bokeh, 8k resolution --ar 16:9 --v 6.1",
        "Isometric 3D render of a futuristic cyber workstation with glass monitors, glowing fiber optic cables, obsidian desk, octane render, trending on ArtStation --ar 4:3",
        "A vintage 1970s editorial fashion photograph in the Sahara desert, warm film grain, Kodachrome color grading, natural sun flare --ar 3:2 --v 6.1"
      ];
      const randomIndex = Math.floor(Math.random() * imageSamples.length);
      setRawPrompt(imageSamples[randomIndex]);
      onNotify("Loaded sample Image AI prompt!", "blue");
    } else {
      const randomIndex = Math.floor(Math.random() * sampleWeakPrompts.length);
      setRawPrompt(sampleWeakPrompts[randomIndex]);
      onNotify("Loaded sample prompt. Press Ctrl+Enter to optimize!", "blue");
    }
  };

  const handleCopy = () => {
    if (!result?.optimized) return;
    navigator.clipboard.writeText(result.optimized);
    setCopied(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ef4444', '#3b82f6', '#ffffff']
    });
    onNotify("Copied optimized prompt to clipboard!", "success");
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSave = () => {
    if (!result?.optimized) return;
    const newSaved = {
      id: "opt-" + Date.now(),
      title: rawPrompt.slice(0, 50) + (rawPrompt.length > 50 ? "..." : ""),
      original: rawPrompt,
      optimized: result.optimized,
      model: selectedModel,
      framework: selectedFramework,
      date: new Date().toLocaleDateString(),
      metrics: result.metrics
    };
    onSavePrompt(newSaved);
    onNotify("Saved prompt to your personal library!", "success");
  };

  // 4-Format Export Engine (Markdown, TXT, JSON, Printable HTML/PDF)
  const handleDownload = (type) => {
    if (!result?.optimized) return;
    setShowExportMenu(false);

    let content = "";
    let filename = `optimized-prompt-${Date.now()}`;
    let mimeType = 'text/plain;charset=utf-8';

    if (type === 'json') {
      content = JSON.stringify({
        original: rawPrompt,
        optimized: result.optimized,
        model: selectedModel,
        framework: selectedFramework,
        metrics: result.metrics,
        exportedAt: new Date().toISOString()
      }, null, 2);
      filename += ".json";
      mimeType = 'application/json;charset=utf-8';
    } else if (type === 'txt') {
      content = `MASTER PROMPT STUDIO EXPORT\n==========================\nModel: ${selectedModel.toUpperCase()}\nFramework: ${selectedFramework.toUpperCase()}\nDate: ${new Date().toLocaleDateString()}\n\nORIGINAL PROMPT:\n----------------\n${rawPrompt}\n\nOPTIMIZED PROMPT:\n-----------------\n${result.optimized}\n\nMETRICS:\n--------\nClarity Score: ${result.metrics.clarityScore}%\nBefore Tokens: ${result.metrics.tokensBefore}\nAfter Tokens: ${result.metrics.tokensAfter}\nYield Improvement: +${result.metrics.improvement}%\n`;
      filename += ".txt";
    } else if (type === 'html' || type === 'pdf') {
      // Direct Printable HTML Document
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <title>Master Prompt Studio Export - ${escapeHtml(selectedModel.toUpperCase())}</title>
              <style>
                body {
                  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                  max-width: 800px;
                  margin: 40px auto;
                  padding: 20px;
                  color: #0f172a;
                  line-height: 1.6;
                }
                .header {
                  border-bottom: 2px solid #e2e8f0;
                  padding-bottom: 16px;
                  margin-bottom: 24px;
                }
                .badge {
                  display: inline-block;
                  padding: 4px 10px;
                  background: #eff6ff;
                  color: #1d4ed8;
                  font-weight: 700;
                  border-radius: 6px;
                  font-size: 13px;
                  border: 1px solid #bfdbfe;
                }
                .metrics-grid {
                  display: grid;
                  grid-template-columns: repeat(4, 1fr);
                  gap: 12px;
                  margin: 20px 0;
                  padding: 16px;
                  background: #f8fafc;
                  border-radius: 8px;
                  border: 1px solid #e2e8f0;
                  text-align: center;
                }
                .metric-label { font-size: 12px; color: #64748b; text-transform: uppercase; }
                .metric-val { font-size: 18px; font-weight: 800; color: #0284c7; }
                pre {
                  background: #f1f5f9;
                  border: 1px solid #cbd5e1;
                  padding: 16px;
                  border-radius: 8px;
                  white-space: pre-wrap;
                  word-break: break-word;
                  font-family: "JetBrains Mono", Consolas, monospace;
                  font-size: 13.5px;
                  line-height: 1.55;
                }
                .footer {
                  margin-top: 40px;
                  padding-top: 16px;
                  border-top: 1px solid #e2e8f0;
                  font-size: 12px;
                  color: #94a3b8;
                  display: flex;
                  justify-content: space-between;
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h1 style="margin:0 0 8px 0; color:#0f172a;">⚡ Master Prompt Studio</h1>
                <div class="badge">Model: ${escapeHtml(selectedModel.toUpperCase())} • Framework: ${escapeHtml(selectedFramework.toUpperCase())}</div>
              </div>

              <div class="metrics-grid">
                <div>
                  <div class="metric-label">Clarity Score</div>
                  <div class="metric-val">${result.metrics.clarityScore}%</div>
                </div>
                <div>
                  <div class="metric-label">Tokens Before</div>
                  <div class="metric-val">${result.metrics.tokensBefore}</div>
                </div>
                <div>
                  <div class="metric-label">Tokens After</div>
                  <div class="metric-val">${result.metrics.tokensAfter}</div>
                </div>
                <div>
                  <div class="metric-label">Improvement</div>
                  <div class="metric-val" style="color:#10b981;">+${result.metrics.improvement}%</div>
                </div>
              </div>

              <h3 style="color:#475569; margin-bottom: 8px;">Original Raw Prompt:</h3>
              <pre>${escapeHtml(rawPrompt)}</pre>

              <h3 style="color:#0284c7; margin-top: 24px; margin-bottom: 8px;">Optimized High-Yield Prompt:</h3>
              <pre style="border: 2px solid #38bdf8; background: #ffffff;">${escapeHtml(result.optimized)}</pre>

              <div class="footer">
                <span>Exported via Master Prompt Studio • 100% Free AI Engine</span>
                <span>Date: ${new Date().toLocaleDateString()}</span>
              </div>
              <script>
                window.onload = function() {
                  window.print();
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
        onNotify("Opened print & PDF export dialog!", "success");
        return;
      }
    } else {
      // Markdown
      content = `# Master Prompt Studio Export\n\n## Metadata\n- **Target Model:** ${selectedModel.toUpperCase()}\n- **Framework:** ${selectedFramework.toUpperCase()}\n- **Date:** ${new Date().toLocaleDateString()}\n\n## Original Prompt:\n\`\`\`\n${rawPrompt}\n\`\`\`\n\n## Optimized High-Yield Prompt:\n\`\`\`\n${result.optimized}\n\`\`\`\n\n## Performance Metrics:\n- **Clarity Score:** ${result.metrics.clarityScore}%\n- **Before Tokens:** ${result.metrics.tokensBefore}\n- **After Tokens:** ${result.metrics.tokensAfter}\n- **Improvement:** +${result.metrics.improvement}%\n\n---\n*Generated by Master Prompt Studio*`;
      filename += ".md";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    onNotify(`Downloaded prompt as ${type.toUpperCase()}!`, "blue");
  };

  const wordCount = rawPrompt.trim() ? rawPrompt.trim().split(/\s+/).length : 0;
  const tokenEstimate = Math.round(wordCount * 1.33);

  const getModelIcon = (id) => {
    switch (id) {
      case 'claude': return <Sparkles size={16} />;
      case 'gemini': return <Zap size={16} />;
      case 'midjourney': return <Image size={16} />;
      case 'deepseek': return <Cpu size={16} />;
      default: return <Bot size={16} />;
    }
  };

  return (
    <section id="optimizer-workbench" style={{ marginBottom: '60px' }}>
      {/* Sleek Model & Modality Toolbar */}
      <div className="glass-panel" style={{
        padding: '12px 18px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Left: Dual AI Modality (Text vs Image) */}
        <div style={{
          display: 'inline-flex',
          background: 'var(--bg-surface-elevated)',
          padding: '3px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => handleModeSwitch('text')}
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: aiMode === 'text' ? 700 : 500,
              borderRadius: 'var(--radius-full)',
              background: aiMode === 'text' ? 'var(--blue-primary)' : 'transparent',
              color: aiMode === 'text' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Type size={13} />
            Text LLMs
          </button>
          <button
            onClick={() => handleModeSwitch('image')}
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: aiMode === 'image' ? 700 : 500,
              borderRadius: 'var(--radius-full)',
              background: aiMode === 'image' ? 'var(--red-primary)' : 'transparent',
              color: aiMode === 'image' ? '#ffffff' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Image size={13} />
            Midjourney
          </button>
        </div>

        {/* Right: Target Model Selection */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {MODEL_OPTIONS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedModel(m.id);
                if (m.id === 'midjourney') setAiMode('image');
                else setAiMode('text');
              }}
              className="btn"
              style={{
                padding: '6px 12px',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-full)',
                background: selectedModel === m.id ? 'var(--blue-primary)' : 'var(--bg-surface-elevated)',
                color: selectedModel === m.id ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${selectedModel === m.id ? 'var(--blue-light)' : 'var(--border-subtle)'}`,
                boxShadow: selectedModel === m.id ? 'var(--shadow-glow-blue)' : 'none'
              }}
            >
              {getModelIcon(m.id)}
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual-Panel Workbench */}
      <div className="responsive-workbench-grid">
        {/* LEFT COLUMN: Input & Framework Controls */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--red-primary)',
                boxShadow: 'var(--shadow-glow-red)'
              }}></span>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                {aiMode === 'image' ? 'Raw Image Idea' : 'Raw Input Prompt'}
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleLoadSample}
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '5px 10px' }}
                title="Load a random weak prompt to test"
              >
                <RefreshCw size={13} />
                Try Sample
              </button>
              <button
                onClick={() => setRawPrompt("")}
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '5px 10px' }}
                title="Clear input"
              >
                <Trash2 size={13} />
                Clear
              </button>
            </div>
          </div>

          {/* Textarea Wrapper with Inside Character Limit Counter */}
          <div style={{ position: 'relative', marginBottom: '14px' }}>
            <textarea
              value={rawPrompt}
              onChange={(e) => setRawPrompt(e.target.value.slice(0, 5000))}
              onKeyDown={handleKeyDown}
              placeholder={aiMode === 'image' ? "Describe your scene, subject, aesthetic, lighting or concept... (Press Ctrl+Enter to optimize)" : "Type or paste your raw, unpolished prompt idea here... (Press Ctrl+Enter to optimize)"}
              className="textarea-field"
              style={{
                minHeight: '160px',
                fontSize: '0.95rem',
                background: 'var(--bg-input)',
                paddingBottom: '28px'
              }}
            />

            {/* Reference Feature: Inside Character Limit Counter */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '12px',
              fontSize: '0.72rem',
              fontWeight: 600,
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '2px 8px',
              borderRadius: '6px',
              pointerEvents: 'none',
              border: '1px solid var(--border-subtle)',
              color: rawPrompt.length > 4500 ? 'var(--red-light)' : 'var(--text-muted)'
            }}>
              {rawPrompt.length.toLocaleString()} / 5,000
            </div>
          </div>

          {/* Input Word & Token Counter */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '20px'
          }}>
            <span>Words: <strong style={{ color: 'var(--text-primary)' }}>{wordCount}</strong></span>
            <span>Est. Tokens: <strong style={{ color: 'var(--text-primary)' }}>{tokenEstimate}</strong></span>
          </div>

          {/* Framework Selection (Hidden for Midjourney, active for LLMs) */}
          {aiMode === 'text' && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                marginBottom: '8px'
              }}>
                Prompt Engineering Framework:
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 135px), 1fr))',
                gap: '8px'
              }}>
                {FRAMEWORK_OPTIONS.map((fw) => (
                  <div
                    key={fw.id}
                    onClick={() => setSelectedFramework(fw.id)}
                    style={{
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      background: selectedFramework === fw.id ? 'rgba(239, 68, 68, 0.12)' : 'var(--bg-surface-elevated)',
                      border: `1px solid ${selectedFramework === fw.id ? 'var(--red-primary)' : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: selectedFramework === fw.id ? 'var(--shadow-glow-red)' : 'none'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '4px'
                    }}>
                      <span style={{
                        fontSize: '0.825rem',
                        fontWeight: 700,
                        color: selectedFramework === fw.id ? 'var(--red-light)' : 'var(--text-primary)'
                      }}>
                        {fw.name}
                      </span>
                      {selectedFramework === fw.id && (
                        <CheckCircle2 size={14} color="var(--red-primary)" />
                      )}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                      {fw.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tone & Format Selectors */}
          <div className="form-row-mobile" style={{ marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Tone of Voice:
              </label>
              <select
                value={selectedTone}
                onChange={(e) => setSelectedTone(e.target.value)}
                className="input-field"
                style={{ fontSize: '0.9rem', width: '100%', minHeight: '48px', padding: '10px 14px' }}
              >
                {TONE_OPTIONS.map((t) => (
                  <option key={t.id} value={t.id} style={{ background: '#0f172a', color: '#fff' }}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                Output Structure:
              </label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="input-field"
                style={{ fontSize: '0.9rem', width: '100%', minHeight: '48px', padding: '10px 14px' }}
              >
                {FORMAT_OPTIONS.map((f) => (
                  <option key={f.id} value={f.id} style={{ background: '#0f172a', color: '#fff' }}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Optimize Action Button */}
          <button
            onClick={handleOptimize}
            disabled={isOptimizing}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '1.05rem',
              fontWeight: 700,
              borderRadius: 'var(--radius-md)'
            }}
          >
            {isOptimizing ? (
              <>
                <RefreshCw size={18} className="spin-animate" />
                Engineering Expert Prompt...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                Optimize Prompt Instantly (Free)
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* Pro Keyboard Tip */}
          <div style={{
            textAlign: 'center',
            marginTop: '10px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            ⚡ Pro Tip: Press <kbd style={{ background: 'var(--bg-surface-elevated)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)' }}>Ctrl</kbd> + <kbd style={{ background: 'var(--bg-surface-elevated)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-mono)' }}>Enter</kbd> to optimize without clicking
          </div>
        </div>

        {/* RIGHT COLUMN: Output Workbench, Metrics & Testing Suite */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          {/* Header & Tabs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--blue-primary)',
                boxShadow: 'var(--shadow-glow-blue)'
              }}></span>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                Enhanced Output
              </h2>
            </div>

            {/* Output Sub-Tabs */}
            <div style={{
              display: 'flex',
              gap: '4px',
              background: 'var(--bg-surface-elevated)',
              padding: '3px',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)'
            }}>
              <button
                onClick={() => setActiveOutputTab('optimized')}
                className="btn"
                style={{
                  padding: '5px 10px',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  background: activeOutputTab === 'optimized' ? 'var(--blue-primary)' : 'transparent',
                  color: activeOutputTab === 'optimized' ? '#fff' : 'var(--text-secondary)'
                }}
              >
                <FileText size={13} />
                Result
              </button>
              <button
                onClick={() => setActiveOutputTab('diff')}
                className="btn"
                style={{
                  padding: '5px 10px',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  background: activeOutputTab === 'diff' ? 'var(--blue-primary)' : 'transparent',
                  color: activeOutputTab === 'diff' ? '#fff' : 'var(--text-secondary)'
                }}
              >
                <Eye size={13} />
                Diff View
              </button>
              <button
                onClick={() => setActiveOutputTab('why')}
                className="btn"
                style={{
                  padding: '5px 10px',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  background: activeOutputTab === 'why' ? 'var(--blue-primary)' : 'transparent',
                  color: activeOutputTab === 'why' ? '#fff' : 'var(--text-secondary)'
                }}
              >
                <BarChart3 size={13} />
                Why This Works
              </button>
            </div>
          </div>

          {/* Performance & Metrics Banner */}
          {result?.metrics && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px',
              marginBottom: '16px',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid var(--border-blue)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Clarity Score</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>
                  {result.metrics.clarityScore}%
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Before Tokens</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-secondary)' }}>
                  {result.metrics.tokensBefore}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>After Tokens</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--blue-light)' }}>
                  {result.metrics.tokensAfter}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Improvement</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--red-light)' }}>
                  +{result.metrics.improvement}%
                </div>
              </div>
            </div>
          )}

          {/* Tab Content 1: Main Optimized Prompt Display */}
          {activeOutputTab === 'optimized' && (
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-glass)',
                padding: '16px',
                minHeight: '260px',
                maxHeight: '380px',
                overflowY: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                marginBottom: '16px'
              }}>
                {result?.optimized || (
                  <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    Click 'Optimize Prompt' to generate your high-yielding prompt.
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Tab Content 2: Visual Diff View */}
          {activeOutputTab === 'diff' && (
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-glass)',
              padding: '16px',
              minHeight: '260px',
              maxHeight: '380px',
              overflowY: 'auto',
              marginBottom: '16px',
              fontSize: '0.85rem'
            }}>
              <div style={{ marginBottom: '14px' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: 'var(--red-light)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginRight: '8px'
                }}>
                  Original Raw Query (- Removed ambiguity):
                </span>
                <p style={{
                  marginTop: '6px',
                  padding: '8px 12px',
                  background: 'rgba(239, 68, 68, 0.05)',
                  borderLeft: '3px solid var(--red-primary)',
                  borderRadius: '4px',
                  color: 'var(--text-secondary)'
                }}>
                  {rawPrompt || "No prompt provided"}
                </p>
              </div>

              <div>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#34d399',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  marginRight: '8px'
                }}>
                  + Injected Enhancements:
                </span>
                <ul style={{
                  marginTop: '8px',
                  paddingLeft: '20px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6
                }}>
                  <li><strong style={{ color: '#34d399' }}>+ Role Priming:</strong> Established specialist authority to prevent superficial answers.</li>
                  <li><strong style={{ color: '#34d399' }}>+ Guardrails:</strong> Banned fluff, anti-patterns, and passive voice.</li>
                  <li><strong style={{ color: '#34d399' }}>+ Output Schemas:</strong> Mandated exact tables, JSON, or checklist structures.</li>
                  <li><strong style={{ color: '#34d399' }}>+ Model Calibrations:</strong> Formatted for {selectedModel.toUpperCase()} syntax.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab Content 3: Why This Works */}
          {activeOutputTab === 'why' && (
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-glass)',
              padding: '16px',
              minHeight: '260px',
              maxHeight: '380px',
              overflowY: 'auto',
              marginBottom: '16px'
            }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: 'var(--blue-light)' }}>
                Prompt Engineering Diagnostics
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {result?.explanation?.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <CheckCircle2 size={16} color="var(--blue-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Toolbar with Copy, Save & 4-Format Export Engine */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            paddingTop: '10px',
            borderTop: '1px solid var(--border-subtle)',
            position: 'relative'
          }}>
            {/* Primary Copy Button */}
            <button
              onClick={handleCopy}
              className="btn btn-blue"
              style={{
                flex: 1,
                minWidth: '180px',
                padding: '10px 16px',
                fontSize: '0.9rem'
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Copied to Clipboard!" : "Copy Optimized Prompt"}
            </button>

            {/* Save to Library */}
            <button
              onClick={handleSave}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '10px 14px' }}
              title="Save to your local library"
            >
              <Bookmark size={16} />
              Save
            </button>

            {/* 4-Format Export Dropdown Menu */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '10px 14px' }}
                title="Export as PDF, Markdown, TXT, or JSON"
              >
                <Download size={16} />
                Export
                <ChevronDown size={14} />
              </button>

              {showExportMenu && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  right: 0,
                  marginBottom: '8px',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: 'var(--radius-md)',
                  padding: '6px',
                  boxShadow: 'var(--shadow-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 20,
                  minWidth: '170px'
                }}>
                  <button
                    onClick={() => handleDownload('html')}
                    className="btn btn-secondary"
                    style={{ justifyContent: 'flex-start', padding: '8px 12px', fontSize: '0.8rem', width: '100%' }}
                  >
                    <Printer size={14} color="#38bdf8" />
                    Print / PDF Ready
                  </button>
                  <button
                    onClick={() => handleDownload('md')}
                    className="btn btn-secondary"
                    style={{ justifyContent: 'flex-start', padding: '8px 12px', fontSize: '0.8rem', width: '100%' }}
                  >
                    <FileText size={14} color="#34d399" />
                    Markdown (.md)
                  </button>
                  <button
                    onClick={() => handleDownload('txt')}
                    className="btn btn-secondary"
                    style={{ justifyContent: 'flex-start', padding: '8px 12px', fontSize: '0.8rem', width: '100%' }}
                  >
                    <Type size={14} color="#f59e0b" />
                    Plain Text (.txt)
                  </button>
                  <button
                    onClick={() => handleDownload('json')}
                    className="btn btn-secondary"
                    style={{ justifyContent: 'flex-start', padding: '8px 12px', fontSize: '0.8rem', width: '100%' }}
                  >
                    <Cpu size={14} color="#ef4444" />
                    JSON (.json)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Direct 1-Click Test In Target AI */}
          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Test Direct In:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={`https://chatgpt.com/?q=${encodeURIComponent(result?.optimized || rawPrompt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '5px 10px' }}
              >
                ChatGPT <ExternalLink size={12} />
              </a>
              <a
                href="https://claude.ai/new"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '5px 10px' }}
              >
                Claude <ExternalLink size={12} />
              </a>
              <a
                href="https://gemini.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '5px 10px' }}
              >
                Gemini <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromptWorkbench;
