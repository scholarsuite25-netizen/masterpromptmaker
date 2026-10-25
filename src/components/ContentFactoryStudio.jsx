import React, { useState } from 'react';
import { 
  Layers, Search, Sparkles, BookOpen, Mic, GraduationCap, 
  FileText, Globe, Code, Copy, Check, Download, ArrowRight, 
  RefreshCw, CheckCircle2, ShieldCheck, Terminal, HelpCircle, FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FACTORY_CATEGORIES, FACTORY_MODES } from '../data/factoryModes';
import { generateFactoryArtifact, compileMasterSpecPrompt } from '../utils/factoryEngine';

export function ContentFactoryStudio({ onNotify }) {
  const [selectedCategory, setSelectedCategory] = useState("All Modes");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMode, setActiveMode] = useState(FACTORY_MODES[0]); // default to eBook
  
  // Intake Form Inputs
  const [titleInput, setTitleInput] = useState(FACTORY_MODES[0].defaultTitle);
  const [audienceInput, setAudienceInput] = useState(FACTORY_MODES[0].defaultAudience);
  const [themeInput, setThemeInput] = useState(FACTORY_MODES[0].defaultTheme);
  const [selectedFormat, setSelectedFormat] = useState(FACTORY_MODES[0].outputFormats[0]);
  const [notesInput, setNotesInput] = useState("");

  // Output State
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState("content"); // 'content' | 'spec'
  const [generatedContent, setGeneratedContent] = useState(() => 
    generateFactoryArtifact(FACTORY_MODES[0], {
      title: FACTORY_MODES[0].defaultTitle,
      audience: FACTORY_MODES[0].defaultAudience,
      theme: FACTORY_MODES[0].defaultTheme
    })
  );
  const [copied, setCopied] = useState(false);

  // Filter modes
  const filteredModes = FACTORY_MODES.filter((m) => {
    const matchesCat = selectedCategory === "All Modes" || m.category === selectedCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectMode = (mode) => {
    setActiveMode(mode);
    setTitleInput(mode.defaultTitle);
    setAudienceInput(mode.defaultAudience);
    setThemeInput(mode.defaultTheme);
    setSelectedFormat(mode.outputFormats[0]);
    onNotify(`Selected mode: ${mode.name} (${mode.command})`, "blue");
  };

  const handleGenerateContent = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const output = generateFactoryArtifact(activeMode, {
        title: titleInput,
        audience: audienceInput,
        theme: themeInput,
        format: selectedFormat,
        additionalNotes: notesInput
      });
      setGeneratedContent(output);
      setIsGenerating(false);
      onNotify(`Generated ${activeMode.name} artifact!`, "success");
    }, 450);
  };

  const masterSpec = compileMasterSpecPrompt(activeMode, {
    title: titleInput,
    audience: audienceInput,
    theme: themeInput,
    format: selectedFormat,
    additionalNotes: notesInput
  });

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#ef4444', '#3b82f6', '#10b981']
    });
    onNotify(`Copied ${label} to clipboard!`, "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (content, filenameSuffix) => {
    const filename = `${activeMode.id}-${Date.now()}-${filenameSuffix}.md`;
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    onNotify(`Downloaded ${filename}!`, "blue");
  };

  const wordCount = (activeOutputTab === 'content' ? generatedContent : masterSpec).split(/\s+/).filter(Boolean).length;

  return (
    <section id="content-factory-studio" style={{ marginBottom: '80px' }}>
      {/* Studio Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--red-subtle)',
          border: '1px solid var(--border-red)',
          marginBottom: '12px'
        }}>
          <Sparkles size={14} color="var(--red-light)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--red-light)', textTransform: 'uppercase' }}>
            Digital Content Factory v1.7 Suite
          </span>
          <span style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            background: 'var(--blue-primary)',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: '10px'
          }}>
            30 Production Modes
          </span>
        </div>

        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '10px' }}>
          Autonomous <span className="gradient-text-red-blue">Digital Content Factory Studio</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
          Transform raw ideas into publication-ready eBooks, academic research papers, keynote speeches, comprehensive courses, and marketing funnels using the factory's verified integrity standards.
        </p>
      </div>

      {/* Filter and Mode Search Bar */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {FACTORY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn"
              style={{
                padding: '7px 14px',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-sm)',
                background: selectedCategory === cat ? 'var(--gradient-brand)' : 'var(--bg-surface-elevated)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${selectedCategory === cat ? 'transparent' : 'var(--border-subtle)'}`,
                boxShadow: selectedCategory === cat ? 'var(--shadow-glow-dual)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search 30 factory modes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{
              paddingLeft: '36px',
              fontSize: '0.85rem',
              paddingTop: '8px',
              paddingBottom: '8px'
            }}
          />
        </div>
      </div>

      {/* Main Studio Grid: Mode Selector, Guided Intake, and Interactive Viewer */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '24px',
        alignItems: 'start'
      }}>
        {/* Left Column: Scrollable Mode List */}
        <div className="glass-panel" style={{
          padding: '18px',
          maxHeight: '740px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.05em' }}>
            Select Mode ({filteredModes.length}):
          </div>

          {filteredModes.map((m) => (
            <div
              key={m.id}
              onClick={() => handleSelectMode(m)}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                background: activeMode.id === m.id ? 'var(--gradient-surface)' : 'var(--bg-surface-elevated)',
                border: `1px solid ${activeMode.id === m.id ? 'var(--blue-light)' : 'var(--border-subtle)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeMode.id === m.id ? 'var(--shadow-glow-blue)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: activeMode.id === m.id ? 'var(--blue-light)' : 'var(--red-light)',
                  background: 'rgba(239, 68, 68, 0.1)',
                  padding: '1px 6px',
                  borderRadius: '4px'
                }}>
                  {m.command}
                </span>
                {activeMode.id === m.id && <CheckCircle2 size={14} color="var(--blue-light)" />}
              </div>
              <h4 style={{ fontSize: '0.925rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {m.name}
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {m.description}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column: Guided Intake & Dual Output Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Mode Info & Guided Intake Form */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="badge badge-blue">{activeMode.category}</span>
                  <span className="badge badge-red">{activeMode.command}</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                  {activeMode.name} Intake
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <ShieldCheck size={16} color="#10b981" />
                <span>Editorial & Academic Standards Applied</span>
              </div>
            </div>

            {/* Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Project Title:
                </label>
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Target Audience:
                </label>
                <input
                  type="text"
                  value={audienceInput}
                  onChange={(e) => setAudienceInput(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginBottom: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Core Theme & Objectives:
                </label>
                <input
                  type="text"
                  value={themeInput}
                  onChange={(e) => setThemeInput(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Output Format:
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.85rem' }}
                >
                  {activeMode.outputFormats.map((fmt, idx) => (
                    <option key={idx} value={fmt} style={{ background: '#0f172a', color: '#fff' }}>
                      {fmt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Bar */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={handleGenerateContent}
                disabled={isGenerating}
                className="btn btn-primary"
                style={{ flex: 1, padding: '12px 20px', fontSize: '0.95rem' }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw size={16} className="spin-animate" />
                    Executing Production Sprint...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generate Full Artifact (In-Browser)
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveOutputTab('spec');
                  onNotify("Switched to Master Factory Specification for Claude/ChatGPT!", "blue");
                }}
                className="btn btn-secondary"
                style={{ padding: '12px 18px', fontSize: '0.9rem', border: '1px solid var(--border-blue)' }}
              >
                <Terminal size={16} color="var(--blue-light)" />
                View Master Prompt Spec
              </button>
            </div>
          </div>

          {/* Output Display & Export Viewer */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
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
                  onClick={() => setActiveOutputTab('content')}
                  className="btn"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    borderRadius: '6px',
                    background: activeOutputTab === 'content' ? 'var(--blue-primary)' : 'transparent',
                    color: activeOutputTab === 'content' ? '#fff' : 'var(--text-secondary)'
                  }}
                >
                  <FileText size={14} />
                  Generated Deliverable
                </button>

                <button
                  onClick={() => setActiveOutputTab('spec')}
                  className="btn"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.8rem',
                    borderRadius: '6px',
                    background: activeOutputTab === 'spec' ? 'var(--red-primary)' : 'transparent',
                    color: activeOutputTab === 'spec' ? '#fff' : 'var(--text-secondary)'
                  }}
                >
                  <Terminal size={14} />
                  Master System Prompt Spec
                </button>
              </div>

              {/* Stats & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Word Count: <strong style={{ color: 'var(--text-primary)' }}>{wordCount}</strong>
                </span>

                <button
                  onClick={() => handleCopy(activeOutputTab === 'content' ? generatedContent : masterSpec, activeOutputTab === 'content' ? 'Artifact' : 'Prompt Spec')}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem', border: '1px solid var(--border-blue)' }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>

                <button
                  onClick={() => handleDownload(activeOutputTab === 'content' ? generatedContent : masterSpec, activeOutputTab === 'content' ? 'DELIVERABLE' : 'SPEC')}
                  className="btn btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>

            {/* Content Display Window */}
            <div style={{
              background: 'var(--bg-input)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-glass)',
              padding: '20px',
              minHeight: '340px',
              maxHeight: '480px',
              overflowY: 'auto',
              fontFamily: activeOutputTab === 'spec' ? 'var(--font-mono)' : 'var(--font-sans)',
              fontSize: '0.88rem',
              lineHeight: 1.65,
              color: 'var(--text-primary)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              {activeOutputTab === 'content' ? generatedContent : masterSpec}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
