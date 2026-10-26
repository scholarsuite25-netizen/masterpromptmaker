import React, { useState } from 'react';
import { 
  Bookmark, Search, Copy, Check, Trash2, Download, 
  ExternalLink, Sparkles, BookOpen, Lock, Unlock, CheckCircle2,
  Cloud, CloudUpload, CloudDownload, RefreshCw, Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { savePromptToCloud, fetchUserPrompts, isSupabaseConfigured } from '../utils/supabase';

export function PromptLibrary({ 
  savedPrompts, 
  unlockedProducts = [], 
  onDeletePrompt, 
  onSelectPrompt, 
  onMergePrompts,
  onNotify 
}) {
  const [activeTab, setActiveTab] = useState("saved"); // 'saved' | 'purchased'
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  // Cloud Sync State
  const [showSyncBar, setShowSyncBar] = useState(false);
  const [syncEmail, setSyncEmail] = useState(() => {
    return typeof window !== 'undefined' ? (localStorage.getItem('masterprompt_user_email') || '') : '';
  });
  const [isSyncing, setIsSyncing] = useState(false);

  const filteredPrompts = savedPrompts.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.optimized.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (item.original && item.original.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const filteredPurchased = unlockedProducts.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleCopyPrompt = (item) => {
    navigator.clipboard.writeText(item.optimized);
    setCopiedId(item.id);
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#ef4444', '#3b82f6']
    });
    onNotify("Copied saved prompt to clipboard!", "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadAsset = (item) => {
    const filename = `${item.id}-FULL-EDITION.md`;
    let content = `# ${item.title}\n`;
    content += `Type: ${item.type.toUpperCase()}\n`;
    content += `License: Single User Authorized License\n`;
    content += `Verified by: Samuel Omotoso (OPAY: 8034710699 / GTB: 0029103844)\n`;
    content += `Date Unlocked: ${item.unlockedAt || new Date().toISOString()}\n\n`;
    content += `---\n\n`;
    content += `## Full Deliverable Content\n\n`;
    content += `${item.description}\n\n`;
    content += `### Modules & Included Features:\n`;
    (item.features || []).forEach((f, idx) => {
      content += `${idx + 1}. ${f}\n`;
    });
    content += `\n### Primary Core Asset Content:\n\n`;
    content += `${item.sampleExcerpt?.content || "Full digital asset archive."}\n\n`;
    content += `\n---\nMaster Prompt Studio - Support WhatsApp: +2348034710699`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    onNotify(`Downloaded full edition of "${item.title}"!`, "success");
  };

  const handleExportAllPrompts = () => {
    if (savedPrompts.length === 0) return;
    const jsonString = JSON.stringify(savedPrompts, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `my-prompt-library-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    onNotify("Exported your entire prompt vault to JSON!", "success");
  };

  const handleSyncWithCloud = async () => {
    if (!syncEmail.trim() || !syncEmail.includes('@')) {
      onNotify("Please enter a valid email to sync with Supabase!", "red");
      return;
    }
    localStorage.setItem('masterprompt_user_email', syncEmail.trim());

    if (!isSupabaseConfigured()) {
      onNotify("Supabase keys not yet configured in .env. Prompts saved safely in local storage!", "blue");
      setShowSyncBar(false);
      return;
    }

    setIsSyncing(true);
    try {
      const res = await fetchUserPrompts(syncEmail);
      if (res.success && res.prompts && res.prompts.length > 0) {
        const formatted = res.prompts.map(p => ({
          id: p.id,
          title: p.title,
          original: p.content,
          optimized: p.content,
          model: p.target_model,
          framework: p.framework,
          date: new Date(p.created_at).toLocaleDateString(),
          isCloudSynced: true
        }));
        if (onMergePrompts) onMergePrompts(formatted);
        onNotify(`Synced ${res.prompts.length} prompts from Supabase cloud!`, "success");
        setShowSyncBar(false);
      } else {
        // Backup local prompts to cloud
        let count = 0;
        for (const p of savedPrompts) {
          await savePromptToCloud({
            email: syncEmail,
            title: p.title,
            content: p.optimized || p.original,
            framework: p.framework || 'STAR',
            targetModel: p.model || 'ChatGPT 4o'
          });
          count++;
        }
        onNotify(`Backed up ${count} local prompts to Supabase cloud!`, "success");
        setShowSyncBar(false);
      }
    } catch (err) {
      console.error("Sync error:", err);
      onNotify("Cloud sync error. Please check Supabase connection.", "red");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <section id="prompt-library" style={{ marginBottom: '80px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.2rem)', marginBottom: '8px', fontWeight: 800 }}>
          My <span className="gradient-text-red-blue">Library</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto', fontSize: '0.95rem' }}>
          Your saved prompt iterations and unlocked product downloads in one place.
        </p>

        {/* View Switcher Tabs */}
        <div style={{
          display: 'inline-flex',
          gap: '6px',
          background: 'var(--bg-surface-elevated)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          marginTop: '20px'
        }}>
          <button
            onClick={() => setActiveTab('saved')}
            className="btn"
            style={{
              padding: '8px 16px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              background: activeTab === 'saved' ? 'var(--gradient-red-blue)' : 'transparent',
              color: activeTab === 'saved' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            <Bookmark size={15} />
            Saved Prompts ({savedPrompts.length})
          </button>

          <button
            onClick={() => setActiveTab('purchased')}
            className="btn"
            style={{
              padding: '8px 16px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              background: activeTab === 'purchased' ? 'var(--gradient-red-blue)' : 'transparent',
              color: activeTab === 'purchased' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            <Unlock size={15} />
            Purchased Products & eBooks ({unlockedProducts.length})
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        marginBottom: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          {/* Search Input */}
          <div className="search-bar-wrap" style={{ position: 'relative', flex: 1, minWidth: '180px', width: '100%' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder={activeTab === 'saved' ? "Search your saved prompts..." : "Search unlocked digital products..."}
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

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {activeTab === 'saved' && (
              <>
                <button
                  onClick={() => setShowSyncBar(!showSyncBar)}
                  className="btn btn-blue"
                  style={{ fontSize: '0.85rem', padding: '8px 14px' }}
                >
                  <Cloud size={15} />
                  Supabase Sync
                </button>

                <button
                  onClick={handleExportAllPrompts}
                  disabled={savedPrompts.length === 0}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '8px 14px', border: '1px solid var(--border-blue)' }}
                >
                  <Download size={15} color="var(--blue-light)" />
                  Export JSON
                </button>
              </>
            )}
          </div>
        </div>

        {/* Expandable Supabase Cloud Sync Bar */}
        {showSyncBar && (
          <div style={{
            background: 'var(--bg-surface-elevated)',
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-blue)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Mail size={14} color="var(--blue-light)" />
              <span>Cloud Account Email:</span>
            </div>
            <input
              type="email"
              placeholder="your-email@example.com"
              value={syncEmail}
              onChange={(e) => setSyncEmail(e.target.value)}
              className="input-field"
              style={{ flex: 1, minWidth: '180px', fontSize: '0.85rem', padding: '6px 12px' }}
            />
            <button
              onClick={handleSyncWithCloud}
              disabled={isSyncing}
              className="btn btn-blue"
              style={{ fontSize: '0.825rem', padding: '7px 14px' }}
            >
              <RefreshCw size={14} className={isSyncing ? "spinning" : ""} />
              {isSyncing ? "Syncing..." : "Sync Prompts"}
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: SAVED PROMPTS */}
      {activeTab === 'saved' && (
        filteredPrompts.length === 0 ? (
          <div className="glass-panel" style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text-muted)'
          }}>
            <Bookmark size={48} style={{ margin: '0 auto 16px auto', opacity: 0.3 }} />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
              No saved prompts found
            </h3>
            <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
              Optimize prompts in the AI Optimizer workbench and click "Save" to build your personal library!
            </p>
          </div>
        ) : (
          <div className="responsive-cards-grid">
            {filteredPrompts.map((item) => (
              <div
                key={item.id}
                className="glass-panel glass-card-dual-hover"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span className="badge badge-blue">
                        {item.model?.toUpperCase() || 'AI'}
                      </span>
                      <span className="badge badge-red">
                        {item.framework?.toUpperCase() || 'STAR'}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {item.date}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3 }}>
                    {item.title}
                  </h4>

                  <div style={{
                    background: 'var(--bg-input)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    maxHeight: '120px',
                    overflow: 'hidden',
                    lineHeight: 1.5,
                    marginBottom: '16px',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {item.optimized.slice(0, 240)}...
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <button
                    onClick={() => handleCopyPrompt(item)}
                    className="btn btn-blue"
                    style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                  >
                    {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === item.id ? "Copied" : "Copy"}
                  </button>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                      href={`https://chatgpt.com/?q=${encodeURIComponent(item.optimized)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                      title="Test in ChatGPT"
                    >
                      ChatGPT <ExternalLink size={12} />
                    </a>

                    <button
                      onClick={() => onDeletePrompt(item.id)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 8px', color: 'var(--red-light)' }}
                      title="Delete prompt"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* TAB 2: PURCHASED PRODUCTS & EBOOKS */}
      {activeTab === 'purchased' && (
        filteredPurchased.length === 0 ? (
          <div className="glass-panel" style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text-muted)'
          }}>
            <Lock size={48} style={{ margin: '0 auto 16px auto', opacity: 0.3 }} />
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
              No purchased products unlocked yet
            </h3>
            <p style={{ fontSize: '0.9rem', maxWidth: '440px', margin: '0 auto 20px auto' }}>
              When you purchase ready-made prompt vaults or eBooks in our Special Shop and verify payment with Samuel Omotoso via OPAY or GTB, your unlocked assets appear here for instant download!
            </p>
          </div>
        ) : (
          <div className="responsive-cards-grid">
            {filteredPurchased.map((product) => (
              <div
                key={product.id}
                className="glass-panel glass-card-dual-hover"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-free">
                      UNLOCKED & VERIFIED
                    </span>
                    <span className="badge badge-blue">
                      {product.type === 'ebook' ? 'eBook' : 'Prompt Pack'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>
                    {product.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                    {product.subtitle || product.description}
                  </p>

                  <div style={{
                    background: 'var(--bg-surface-elevated)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '16px',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)'
                  }}>
                    <span>Access: <strong>Lifetime Single-User License</strong></span>
                  </div>
                </div>

                <div style={{
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} /> Ready to Download
                  </span>

                  <button
                    onClick={() => handleDownloadAsset(product)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.85rem', padding: '9px 16px' }}
                  >
                    <Download size={15} />
                    Download File
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </section>
  );
}
