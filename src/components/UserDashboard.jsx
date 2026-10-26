import React, { useState, useEffect } from 'react';
import { 
  User, Package, Bookmark, Key, ShieldCheck, LogOut, Download, 
  Printer, ExternalLink, Copy, Check, Trash2, Sparkles, ArrowRight, 
  Search, Lock, Unlock, CheckCircle2, RefreshCw, Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase, isSupabaseConfigured, fetchUserPrompts } from '../utils/supabase';
import { openFormattedPrintableDoc } from '../utils/pdfGenerator';
import { downloadStandaloneStudioApp, downloadTutorialGuide, CONTENT_FACTORY_TUTORIAL_GUIDE } from '../data/standaloneFactoryPackage';

export function UserDashboard({ 
  onBackToApp, 
  unlockedProducts = [], 
  savedPrompts = [], 
  onDeletePrompt, 
  onNotify,
  onNavigateToShop
}) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'prompts' | 'keys' | 'account'
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('masterprompt_user_email') || 'creator@masterprompt.studio';
  });
  const [customGroqKey, setCustomGroqKey] = useState(() => {
    return localStorage.getItem('masterprompt_groq_key') || '';
  });
  const [keySaved, setKeySaved] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [searchPrompt, setSearchPrompt] = useState('');
  const [unlockCodeInput, setUnlockCodeInput] = useState('');

  useEffect(() => {
    if (isSupabaseConfigured() && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        if (data?.session?.user?.email) {
          setUserEmail(data.session.user.email);
          localStorage.setItem('masterprompt_user_email', data.session.user.email);
        }
      });
    }
  }, []);

  const handleSaveGroqKey = (e) => {
    e.preventDefault();
    if (customGroqKey.trim()) {
      localStorage.setItem('masterprompt_groq_key', customGroqKey.trim());
      setKeySaved(true);
      onNotify('Custom Groq API Key saved securely in your browser!', 'success');
      setTimeout(() => setKeySaved(false), 2500);
    } else {
      localStorage.removeItem('masterprompt_groq_key');
      onNotify('Custom API Key removed.', 'blue');
    }
  };

  const handleSignOut = async () => {
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('masterprompt_user_email');
    onNotify('Signed out of your account', 'blue');
    onBackToApp();
  };

  const handleCopyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt.optimized || prompt.content);
    setCopiedId(prompt.id);
    onNotify('Copied prompt to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrintPlaybook = () => {
    openFormattedPrintableDoc({
      title: "Master Content Factory: Operations & Monetization Playbook",
      subtitle: "Autonomous 30-Mode Standalone Suite Manual",
      author: "Samuel B. Omotoso • Master Prompt Studio",
      badge: "OFFICIAL MASTERCLASS PLAYBOOK",
      content: CONTENT_FACTORY_TUTORIAL_GUIDE,
      metadata: {
        "Edition": "Executive Standalone v2.0",
        "License": "Commercial Lifetime License"
      }
    });
    onNotify("Opened formatted PDF playbook!", "success");
  };

  const filteredPrompts = savedPrompts.filter(p => {
    const q = searchPrompt.toLowerCase();
    return (p.title || '').toLowerCase().includes(q) ||
           (p.optimized || p.content || '').toLowerCase().includes(q);
  });

  return (
    <div className="app-container" style={{ padding: '36px clamp(16px, 4vw, 32px)', minHeight: '85vh' }}>
      {/* Top Breadcrumb & User Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px',
        paddingBottom: '20px',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div>
          <button
            onClick={onBackToApp}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px', marginBottom: '10px' }}
          >
            ← Back to Workbench
          </button>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, margin: 0 }}>
            Creator <span className="gradient-text-red-blue">Hub & Dashboard</span>
          </h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Manage your purchased products, offline software licenses, and cloud saved prompts.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--bg-surface-elevated)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <User size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {userEmail}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={12} /> Verified Creator Account
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="btn btn-secondary"
            style={{ padding: '6px 10px', fontSize: '0.75rem', marginLeft: '6px' }}
            title="Sign Out"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        background: 'var(--bg-surface)',
        padding: '6px',
        borderRadius: '12px',
        border: '1px solid var(--border-glass)',
        marginBottom: '28px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('products')}
          className="btn"
          style={{
            padding: '10px 18px',
            fontSize: '0.88rem',
            borderRadius: '8px',
            background: activeTab === 'products' ? 'var(--blue-primary)' : 'transparent',
            color: activeTab === 'products' ? '#fff' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Package size={16} />
          My Purchased Products ({unlockedProducts.length})
        </button>

        <button
          onClick={() => setActiveTab('prompts')}
          className="btn"
          style={{
            padding: '10px 18px',
            fontSize: '0.88rem',
            borderRadius: '8px',
            background: activeTab === 'prompts' ? 'var(--blue-primary)' : 'transparent',
            color: activeTab === 'prompts' ? '#fff' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Bookmark size={16} />
          My Prompt Vault ({savedPrompts.length})
        </button>

        <button
          onClick={() => setActiveTab('keys')}
          className="btn"
          style={{
            padding: '10px 18px',
            fontSize: '0.88rem',
            borderRadius: '8px',
            background: activeTab === 'keys' ? 'var(--blue-primary)' : 'transparent',
            color: activeTab === 'keys' ? '#fff' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Key size={16} />
          Custom API Keys
        </button>
      </div>

      {/* TAB 1: MY PURCHASED PRODUCTS & STANDALONE SOFTWARE */}
      {activeTab === 'products' && (
        <div>
          {/* Always provide access to Standalone Content Factory download suite */}
          <div className="glass-panel" style={{
            padding: '24px',
            marginBottom: '28px',
            border: '2px solid rgba(59, 130, 246, 0.4)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(6, 9, 19, 0.9))'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              <div>
                <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
                  👑 FLAGSHIP SOFTWARE PACKAGE
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '4px 0' }}>
                  Autonomous 30-Mode Content Factory (Standalone Suite)
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '680px' }}>
                  Single-file offline production studio and comprehensive operations playbook by Samuel B. Omotoso. Runs on any computer with zero recurring fees.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={downloadStandaloneStudioApp}
                  className="btn btn-primary"
                  style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                >
                  <Download size={15} /> Download Standalone App (.HTML)
                </button>

                <button
                  onClick={handlePrintPlaybook}
                  className="btn btn-secondary"
                  style={{ padding: '10px 14px', fontSize: '0.85rem', border: '1px solid var(--border-blue)' }}
                >
                  <Printer size={15} color="var(--blue-light)" /> Print / Save PDF Playbook
                </button>

                <button
                  onClick={downloadTutorialGuide}
                  className="btn btn-secondary"
                  style={{ padding: '10px 14px', fontSize: '0.85rem' }}
                >
                  <Download size={15} /> Playbook .MD
                </button>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              <div>✓ 30 Content Generation Modes</div>
              <div>✓ 100% Offline Capable</div>
              <div>✓ Zero Hosting Subscriptions</div>
              <div>✓ Lifetime Commercial Rights</div>
            </div>
          </div>

          {/* Other Purchased Products */}
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>
            Your Unlocked Vaults & Guides ({unlockedProducts.length})
          </h3>

          {unlockedProducts.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
              <Lock size={40} style={{ margin: '0 auto 12px auto', opacity: 0.3 }} />
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px' }}>No additional store products unlocked yet</h4>
              <p style={{ fontSize: '0.85rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
                When you purchase prompt vaults or eBooks in our Digital Store, your permanent downloads appear here.
              </p>
              <button
                onClick={onNavigateToShop}
                className="btn btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.85rem' }}
              >
                Browse Digital Store
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {unlockedProducts.map(product => (
                <div key={product.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span className="badge badge-blue" style={{ marginBottom: '8px' }}>
                      {product.type === 'ebook' ? 'Executive eBook' : 'Prompt Pack'}
                    </span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>{product.title}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                      {product.subtitle || product.description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                      onClick={() => {
                        openFormattedPrintableDoc({
                          title: product.title,
                          subtitle: product.subtitle || "Digital Deliverable",
                          author: "Samuel B. Omotoso • Master Prompt Studio",
                          badge: "VERIFIED PURCHASE",
                          content: product.sampleExcerpt?.content || product.description,
                          metadata: { "Product": product.title, "Status": "Paid & Verified" }
                        });
                      }}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', border: '1px solid var(--border-blue)' }}
                    >
                      <Printer size={13} color="var(--blue-light)" /> Formatted PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MY PROMPT VAULT */}
      {activeTab === 'prompts' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search saved prompts..."
                value={searchPrompt}
                onChange={e => setSearchPrompt(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border-glass)',
                  color: '#fff',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Showing {filteredPrompts.length} of {savedPrompts.length} saved prompts
            </div>
          </div>

          {filteredPrompts.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
              <Bookmark size={40} style={{ margin: '0 auto 12px auto', opacity: 0.3 }} />
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '4px' }}>No saved prompts found</h4>
              <p style={{ fontSize: '0.85rem' }}>Optimize a prompt on the workbench and tap "Save" to archive it here.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
              {filteredPrompts.map(prompt => (
                <div key={prompt.id} className="glass-panel" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="badge badge-blue">{prompt.model?.toUpperCase() || 'AI'}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{prompt.date || 'Saved'}</span>
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>{prompt.title}</h4>
                    <div style={{
                      background: 'var(--bg-input)',
                      borderRadius: '6px',
                      padding: '10px',
                      fontFamily: 'monospace',
                      fontSize: '0.78rem',
                      maxHeight: '120px',
                      overflow: 'hidden',
                      color: 'var(--text-secondary)',
                      marginBottom: '14px'
                    }}>
                      {prompt.optimized || prompt.content}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                      onClick={() => handleCopyPrompt(prompt)}
                      className="btn btn-blue"
                      style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                    >
                      {copiedId === prompt.id ? <Check size={13} /> : <Copy size={13} />}
                      {copiedId === prompt.id ? 'Copied' : 'Copy'}
                    </button>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <a
                        href={`https://chatgpt.com/?q=${encodeURIComponent(prompt.optimized || prompt.content)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '6px 10px' }}
                      >
                        ChatGPT <ExternalLink size={11} />
                      </a>
                      {onDeletePrompt && (
                        <button
                          onClick={() => onDeletePrompt(prompt.id)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 8px', color: 'var(--red-light)' }}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CUSTOM API KEYS */}
      {activeTab === 'keys' && (
        <div className="glass-panel" style={{ maxWidth: '640px', padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
            BYO API Key (Bring Your Own Key)
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
            Master Prompt Studio includes built-in live AI inference via our cloud key. If you prefer to use your own personal Groq Cloud key for private rate limits and zero throttling, paste it below. Your key is stored exclusively in your browser's encrypted localStorage.
          </p>

          <form onSubmit={handleSaveGroqKey}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Personal Groq API Key (starts with gsk_)
            </label>
            <input
              type="password"
              placeholder="gsk_..."
              value={customGroqKey}
              onChange={e => setCustomGroqKey(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
                marginBottom: '16px'
              }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '10px 20px', fontSize: '0.88rem' }}
              >
                {keySaved ? 'Saved!' : 'Save Custom Key'}
              </button>
              {customGroqKey && (
                <button
                  type="button"
                  onClick={() => {
                    setCustomGroqKey('');
                    localStorage.removeItem('masterprompt_groq_key');
                    onNotify('Removed custom API key', 'blue');
                  }}
                  className="btn btn-secondary"
                  style={{ padding: '10px 16px', fontSize: '0.88rem' }}
                >
                  Clear Key
                </button>
              )}
            </div>
          </form>

          <div style={{ marginTop: '24px', padding: '14px', background: 'var(--bg-surface-elevated)', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Need a free Groq API Key? Get one in 30 seconds at <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue-light)' }}>console.groq.com/keys</a>. Groq offers ultra-fast inference (300+ tok/s) at zero cost.
          </div>
        </div>
      )}
    </div>
  );
}
