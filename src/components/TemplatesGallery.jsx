import React, { useState } from 'react';
import { Layers, Search, Copy, Check, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import { freeTemplates } from '../data/freeTemplates';
import confetti from 'canvas-confetti';

export function TemplatesGallery({ onSelectTemplate, onNotify }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const categories = ["All", "Coding", "Writing", "Marketing", "Midjourney", "Business"];

  const filtered = freeTemplates.filter((tpl) => {
    const matchesCategory = selectedCategory === "All" || tpl.category === selectedCategory;
    const matchesSearch = tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tpl.optimizedPrompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (tpl) => {
    navigator.clipboard.writeText(tpl.optimizedPrompt);
    setCopiedId(tpl.id);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#3b82f6', '#ef4444', '#10b981']
    });
    onNotify(`Copied "${tpl.title}" to clipboard!`, "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="templates-gallery" style={{ marginBottom: '60px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--blue-subtle)',
          border: '1px solid var(--border-blue)',
          marginBottom: '12px'
        }}>
          <Sparkles size={14} color="var(--blue-light)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--blue-light)', textTransform: 'uppercase' }}>
            Free Pre-Engineered Prompts
          </span>
        </div>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>
          Production-Grade <span className="gradient-text-red-blue">Prompt Templates</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
          Explore battle-tested system prompts built with RTF, STAR, and Chain-of-Thought frameworks. 100% free to copy or customize.
        </p>
      </div>

      {/* Filter & Search Bar */}
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
        <div className="scroll-pills-row" style={{ width: '100%', marginBottom: '4px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn"
              style={{
                padding: '6px 14px',
                fontSize: '0.825rem',
                borderRadius: 'var(--radius-sm)',
                background: selectedCategory === cat ? 'var(--gradient-red-blue)' : 'var(--bg-surface-elevated)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${selectedCategory === cat ? 'transparent' : 'var(--border-subtle)'}`,
                boxShadow: selectedCategory === cat ? 'var(--shadow-glow-red)' : 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="search-bar-wrap" style={{ position: 'relative', width: '100%' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search prompt templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{
              paddingLeft: '36px',
              fontSize: '0.85rem',
              paddingTop: '8px',
              paddingBottom: '8px',
              width: '100%'
            }}
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="responsive-cards-grid">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="glass-panel glass-card-dual-hover"
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              {/* Top Tags */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className="badge badge-blue">
                  {tpl.category}
                </span>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: 'var(--red-light)',
                  background: 'var(--red-subtle)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-red)'
                }}>
                  {tpl.framework}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', lineHeight: 1.3 }}>
                {tpl.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                {tpl.description}
              </p>

              {/* Preview Snippet */}
              <div style={{
                background: 'var(--bg-input)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                maxHeight: '110px',
                overflow: 'hidden',
                position: 'relative',
                marginBottom: '16px',
                lineHeight: 1.4
              }}>
                {tpl.optimizedPrompt.slice(0, 220)}...
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '40px',
                  background: 'linear-gradient(transparent, var(--bg-input))'
                }}></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => onSelectTemplate(tpl)}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  fontSize: '0.85rem',
                  padding: '9px 12px'
                }}
              >
                Open in Optimizer
                <ArrowUpRight size={15} />
              </button>

              <button
                onClick={() => handleCopy(tpl)}
                className="btn btn-secondary"
                style={{
                  padding: '9px 12px',
                  border: '1px solid var(--border-blue)'
                }}
                title="Copy prompt directly"
              >
                {copiedId === tpl.id ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
