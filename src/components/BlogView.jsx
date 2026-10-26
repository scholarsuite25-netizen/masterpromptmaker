import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Calendar, Clock, User, ArrowLeft, ArrowRight, 
  Search, Share2, Sparkles, Check, Bookmark, ExternalLink 
} from 'lucide-react';
import { fetchBlogPosts } from '../utils/supabase';
import { INITIAL_BLOG_POSTS } from '../data/initialBlogPosts';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderSimpleMarkdown(md) {
  if (!md) return '';
  let html = escapeHtml(md);

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 style="font-size:1.15rem; font-weight:700; color:#fff; margin:22px 0 10px 0;">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 style="font-size:1.4rem; font-weight:800; color:#fff; margin:28px 0 12px 0; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.1);">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 style="font-size:1.8rem; font-weight:800; color:#fff; margin:32px 0 14px 0;">$1</h1>');

  // Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#fff;">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em style="color:#93c5fd;">$1</em>');

  // Blockquotes
  html = html.replace(/^>\s*(.*$)/gim, '<blockquote style="border-left:3px solid #3b82f6; padding-left:14px; margin:16px 0; color:#cbd5e1; font-style:italic; background:rgba(59,130,246,0.08); padding:10px 14px; border-radius:4px;">$1</blockquote>');

  // Paragraphs
  html = html.split('\n\n').map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<blockquote')) return p;
    return `<p style="margin-bottom:16px; line-height:1.75; color:#cbd5e1; font-size:1rem;">${p.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');

  return html;
}

export function BlogView({ onBackToApp, onOpenWorkbench, onOpenShop, onNotify }) {
  const [posts, setPosts] = useState(INITIAL_BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    fetchBlogPosts(false).then(res => {
      if (res.success && res.posts && res.posts.length > 0) {
        // Merge Supabase posts with defaults
        const cloudSlugs = new Set(res.posts.map(p => p.slug));
        const nonDuplicateDefaults = INITIAL_BLOG_POSTS.filter(p => !cloudSlugs.has(p.slug));
        setPosts([...res.posts, ...nonDuplicateDefaults]);
      }
    });
  }, []);

  const categories = ['All Articles', 'Prompt Engineering', 'Digital Monetization', 'Case Studies'];

  const filteredPosts = posts.filter(post => {
    const matchesCat = selectedCategory === 'All Articles' || post.category === selectedCategory;
    const matchesSearch = (post.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (post.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      if (onNotify) onNotify('Article link copied to clipboard!', 'success');
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // FULL ARTICLE READING VIEW
  if (activeArticle) {
    return (
      <div className="app-container" style={{ padding: '36px clamp(16px, 4vw, 32px)', maxWidth: '840px', minHeight: '85vh' }}>
        <button
          onClick={() => setActiveArticle(null)}
          className="btn btn-secondary"
          style={{ fontSize: '0.85rem', padding: '8px 14px', marginBottom: '24px' }}
        >
          <ArrowLeft size={16} /> Back to All Articles
        </button>

        {activeArticle.cover_image && (
          <div style={{
            width: '100%',
            height: 'clamp(220px, 35vw, 380px)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '28px',
            border: '1px solid var(--border-glass)'
          }}>
            <img
              src={activeArticle.cover_image}
              alt={activeArticle.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap' }}>
          <span className="badge badge-blue">{activeArticle.category}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {activeArticle.read_time}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            • {activeArticle.created_at ? new Date(activeArticle.created_at).toLocaleDateString() : 'October 2026'}
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '20px', color: '#fff' }}>
          {activeArticle.title}
        </h1>

        {/* Author Bio Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          background: 'var(--bg-surface-elevated)',
          borderRadius: '10px',
          border: '1px solid var(--border-subtle)',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800
            }}>
              SO
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#fff' }}>
                {activeArticle.author_name || 'Samuel B. Omotoso'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Lead AI Architect & Executive Keynote Consultant
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="btn btn-secondary"
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
          >
            <Share2 size={13} />
            {copiedShare ? 'Copied Link' : 'Share'}
          </button>
        </div>

        {/* Article Body */}
        <div
          dangerouslySetInnerHTML={{ __html: renderSimpleMarkdown(activeArticle.content) }}
          style={{ marginBottom: '48px' }}
        />

        {/* High-Converting Bottom CTA */}
        <div className="glass-panel" style={{
          padding: '32px',
          textAlign: 'center',
          border: '2px solid rgba(59, 130, 246, 0.4)',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(6, 9, 19, 0.95))'
        }}>
          <span className="badge badge-gold" style={{ marginBottom: '8px' }}>
            ENGINEERED AI PRODUCTIVITY
          </span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '8px 0' }}>
            Put Precision Prompt Engineering to Work
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 20px auto', lineHeight: 1.6 }}>
            Use our 100% free workbench to calibrate high-yield prompts for ChatGPT, Claude, and Gemini, or unlock the 30-Mode Standalone Content Factory.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={onOpenWorkbench}
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
            >
              Open Free AI Workbench
            </button>
            <button
              onClick={onOpenShop}
              className="btn btn-secondary"
              style={{ padding: '10px 18px', fontSize: '0.9rem', border: '1px solid var(--border-blue)' }}
            >
              Explore Flagship Suite
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ARTICLE CATALOG / GRID VIEW
  return (
    <div className="app-container" style={{ padding: '36px clamp(16px, 4vw, 32px)', minHeight: '85vh' }}>
      {/* Blog Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <button
          onClick={onBackToApp}
          className="btn btn-secondary"
          style={{ fontSize: '0.8rem', padding: '6px 12px', marginBottom: '14px' }}
        >
          ← Back to Workbench
        </button>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, margin: '0 0 10px 0' }}>
          Knowledge <span className="gradient-text-red-blue">Hub & Articles</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '0.98rem', lineHeight: 1.6 }}>
          Practical tutorials on modern prompt architecture, autonomous content publishing, and digital creator monetization by Samuel B. Omotoso.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn"
              style={{
                padding: '7px 14px',
                fontSize: '0.82rem',
                borderRadius: '8px',
                background: selectedCategory === cat ? 'var(--blue-primary)' : 'var(--bg-surface-elevated)',
                color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '240px', flex: 1, maxWidth: '340px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 34px',
              borderRadius: '8px',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-glass)',
              color: '#fff',
              fontSize: '0.85rem'
            }}
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filteredPosts.map(post => (
          <article
            key={post.id || post.slug}
            className="glass-panel"
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onClick={() => setActiveArticle(post)}
          >
            <div>
              {post.cover_image && (
                <div style={{ height: '180px', overflow: 'hidden' }}>
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              )}

              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="badge badge-blue">{post.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.read_time}</span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.35, marginBottom: '10px', color: '#fff' }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div style={{
              padding: '14px 20px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'var(--bg-surface-elevated)'
            }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--blue-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Read Article <ArrowRight size={14} />
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                By Samuel Omotoso
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
