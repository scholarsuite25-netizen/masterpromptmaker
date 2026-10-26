import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Unlock, DollarSign, Package, FileText, 
  Users, MessageSquare, CheckCircle2, Clock, Mail, Search, 
  Plus, Trash2, Edit3, ExternalLink, RefreshCw, Send, AlertCircle, Eye, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  fetchAllOrders, 
  verifyOrderAndNotify, 
  fetchSpeakingInquiries, 
  fetchBlogPosts, 
  upsertBlogPost, 
  deleteBlogPost, 
  isSupabaseConfigured 
} from '../utils/supabase';
import { sendOrderReceiptEmail } from '../utils/emailService';
import { autoVerifyFromBankAlert, parseBankAlertText } from '../utils/bankAlertParser';
import { INITIAL_BLOG_POSTS } from '../data/initialBlogPosts';

export function AdminDashboard({ onBackToApp, onNotify }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('so_admin_authenticated') === 'true';
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'cms' | 'speaking' | 'bank-parser'

  // Data
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [blogPosts, setBlogPosts] = useState(INITIAL_BLOG_POSTS);
  const [isLoading, setIsLoading] = useState(false);
  const [processingRef, setProcessingRef] = useState(null);

  // Bank alert parser state
  const [rawAlertInput, setRawAlertInput] = useState('');
  const [parserResult, setParserResult] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  // CMS editor state
  const [editingPost, setEditingPost] = useState(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [postCategory, setPostCategory] = useState('Prompt Engineering');
  const [postCoverImage, setPostCoverImage] = useState('');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postIsPublished, setPostIsPublished] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllAdminData();
    }
  }, [isAuthenticated]);

  const loadAllAdminData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, inqRes, postsRes] = await Promise.all([
        fetchAllOrders(),
        fetchSpeakingInquiries(),
        fetchBlogPosts(true)
      ]);

      if (ordersRes.success) setOrders(ordersRes.orders);
      if (inqRes.success) setInquiries(inqRes.inquiries);
      if (postsRes.success && postsRes.posts.length > 0) {
        setBlogPosts(postsRes.posts);
      }
    } catch (err) {
      console.error('[Admin] Load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (passkeyInput.trim() === 'admin2026' || passkeyInput.trim().toLowerCase() === 'omotoso2026') {
      setIsAuthenticated(true);
      localStorage.setItem('so_admin_authenticated', 'true');
      setPasskeyError('');
      onNotify('Authenticated as Samuel Omotoso (Executive Admin)', 'success');
      loadAllAdminData();
    } else {
      setPasskeyError('Invalid admin passkey. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('so_admin_authenticated');
    onNotify('Logged out from admin console', 'blue');
    onBackToApp();
  };

  // Order Approval
  const handleApproveOrder = async (order) => {
    setProcessingRef(order.order_ref);
    try {
      await verifyOrderAndNotify(order.order_ref);
      await sendOrderReceiptEmail({
        customerEmail: order.customer_email,
        customerName: order.customer_name || 'Valued Creator',
        orderRef: order.order_ref,
        unlockCode: order.unlock_code,
        items: order.items || [],
        totalNGN: order.total_amount_ngn,
        totalUSD: order.total_amount_usd,
        currency: order.currency
      });

      setOrders(prev => prev.map(o => o.order_ref === order.order_ref ? { ...o, status: 'verified' } : o));
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      onNotify(`Order #${order.order_ref} approved & unlock code emailed!`, 'success');
    } catch (err) {
      onNotify(`Error approving order: ${err.message}`, 'red');
    } finally {
      setProcessingRef(null);
    }
  };

  // Bank Alert Quick Parser
  const handleProcessBankAlert = async (e) => {
    e.preventDefault();
    if (!rawAlertInput.trim()) return;

    setIsParsing(true);
    setParserResult(null);

    const res = await autoVerifyFromBankAlert(rawAlertInput);
    setIsParsing(false);
    setParserResult(res);

    if (res.success) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
      onNotify(res.message, 'success');
      loadAllAdminData();
    } else {
      onNotify(res.reason || 'Could not auto-verify order.', 'red');
    }
  };

  // CMS: Open Post for Edit
  const handleStartEdit = (post) => {
    setEditingPost(post);
    setPostTitle(post.title);
    setPostSlug(post.slug);
    setPostCategory(post.category);
    setPostCoverImage(post.cover_image || '');
    setPostExcerpt(post.excerpt || '');
    setPostContent(post.content);
    setPostIsPublished(post.is_published !== false);
    setIsCreatingPost(true);
  };

  const handleStartNewPost = () => {
    setEditingPost(null);
    setPostTitle('');
    setPostSlug('');
    setPostCategory('Prompt Engineering');
    setPostCoverImage('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=600&q=80');
    setPostExcerpt('');
    setPostContent('# Article Title\n\nWrite your markdown content here...');
    setPostIsPublished(true);
    setIsCreatingPost(true);
  };

  // CMS: Save Post
  const handleSavePost = async (e) => {
    e.preventDefault();
    if (!postTitle.trim()) {
      onNotify('Post title is required', 'red');
      return;
    }

    const slug = postSlug.trim() || postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const postPayload = {
      ...(editingPost?.id ? { id: editingPost.id } : {}),
      title: postTitle.trim(),
      slug,
      category: postCategory,
      cover_image: postCoverImage,
      excerpt: postExcerpt.trim(),
      content: postContent,
      author_name: 'Samuel B. Omotoso',
      read_time: `${Math.max(Math.round(postContent.split(/\s+/).length / 200), 2)} min read`,
      is_published: postIsPublished
    };

    const res = await upsertBlogPost(postPayload);
    if (res.success) {
      onNotify(`Article "${postTitle}" published successfully!`, 'success');
      setIsCreatingPost(false);
      loadAllAdminData();
    } else {
      // Local fallback
      setBlogPosts(prev => [postPayload, ...prev.filter(p => p.slug !== slug)]);
      setIsCreatingPost(false);
      onNotify('Article saved locally!', 'blue');
    }
  };

  const handleDeletePost = async (postId, postTitle) => {
    if (!window.confirm(`Delete article "${postTitle}"?`)) return;
    await deleteBlogPost(postId);
    setBlogPosts(prev => prev.filter(p => p.id !== postId));
    onNotify('Article deleted', 'red');
  };

  // KPI Calculations
  const totalNGN = orders.filter(o => o.currency === 'NGN' && o.status === 'verified').reduce((acc, o) => acc + (o.total_amount_ngn || 0), 0);
  const totalUSD = orders.filter(o => o.currency === 'USD' && o.status === 'verified').reduce((acc, o) => acc + (o.total_amount_usd || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending');

  if (!isAuthenticated) {
    return (
      <div className="app-container" style={{ padding: '80px 20px', maxWidth: '440px', minHeight: '80vh', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '36px 28px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.15)',
            color: 'var(--red-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px auto',
            border: '1px solid var(--border-red)'
          }}>
            <Lock size={30} />
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px' }}>
            Executive Admin Console
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Restricted access for Samuel B. Omotoso. Enter administrative passkey to manage revenue, bank orders, and CMS.
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter Admin Passkey"
              value={passkeyInput}
              onChange={e => setPasskeyInput(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                fontSize: '1rem',
                textAlign: 'center',
                letterSpacing: '2px',
                marginBottom: '12px'
              }}
              autoFocus
            />

            {passkeyError && (
              <p style={{ fontSize: '0.78rem', color: 'var(--red-light)', marginBottom: '14px' }}>
                {passkeyError}
              </p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
            >
              <Unlock size={16} /> Authenticate
            </button>
          </form>

          <div style={{ marginTop: '20px' }}>
            <button
              onClick={onBackToApp}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              ← Return to Main Studio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ padding: '36px clamp(16px, 4vw, 32px)', minHeight: '85vh' }}>
      {/* Top Header */}
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
            ← Exit to Main Studio
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={24} color="#10b981" />
            <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, margin: 0 }}>
              Samuel Omotoso <span className="gradient-text-red-blue">Operations Center</span>
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={loadAllAdminData}
            disabled={isLoading}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '8px 14px' }}
          >
            <RefreshCw size={13} className={isLoading ? 'spin-icon' : ''} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ fontSize: '0.8rem', padding: '8px 14px', color: 'var(--red-light)' }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Verified Gross Revenue (NGN)
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
            ₦{totalNGN.toLocaleString()}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Verified Gross Revenue (USD)
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--blue-light)', marginTop: '4px' }}>
            ${totalUSD.toFixed(2)}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Pending Bank Transfers
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: pendingOrders.length > 0 ? '#f59e0b' : 'var(--text-primary)', marginTop: '4px' }}>
            {pendingOrders.length} Orders
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
            Keynote Inquiries
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
            {inquiries.length} Requests
          </div>
        </div>
      </div>

      {/* Main Tabs */}
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
          onClick={() => setActiveTab('orders')}
          className="btn"
          style={{
            padding: '10px 18px',
            fontSize: '0.88rem',
            borderRadius: '8px',
            background: activeTab === 'orders' ? 'var(--blue-primary)' : 'transparent',
            color: activeTab === 'orders' ? '#fff' : 'var(--text-secondary)'
          }}
        >
          Bank Orders & Verification ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('bank-parser')}
          className="btn"
          style={{
            padding: '10px 18px',
            fontSize: '0.88rem',
            borderRadius: '8px',
            background: activeTab === 'bank-parser' ? 'var(--blue-primary)' : 'transparent',
            color: activeTab === 'bank-parser' ? '#fff' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Sparkles size={15} color="#f59e0b" />
          Bank Alert Quick-Parser
        </button>

        <button
          onClick={() => setActiveTab('cms')}
          className="btn"
          style={{
            padding: '10px 18px',
            fontSize: '0.88rem',
            borderRadius: '8px',
            background: activeTab === 'cms' ? 'var(--blue-primary)' : 'transparent',
            color: activeTab === 'cms' ? '#fff' : 'var(--text-secondary)'
          }}
        >
          Blog & CMS Manager ({blogPosts.length})
        </button>

        <button
          onClick={() => setActiveTab('speaking')}
          className="btn"
          style={{
            padding: '10px 18px',
            fontSize: '0.88rem',
            borderRadius: '8px',
            background: activeTab === 'speaking' ? 'var(--blue-primary)' : 'transparent',
            color: activeTab === 'speaking' ? '#fff' : 'var(--text-secondary)'
          }}
        >
          Speaker Inquiries ({inquiries.length})
        </button>
      </div>

      {/* TAB 1: ORDERS */}
      {activeTab === 'orders' && (
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>
            Store Digital Orders
          </h3>

          {orders.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
              No orders recorded yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {orders.map(order => {
                const isPending = order.status === 'pending';
                return (
                  <div
                    key={order.order_ref || order.id}
                    className="glass-panel"
                    style={{
                      padding: '20px',
                      border: isPending ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: isPending ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                          color: isPending ? '#f59e0b' : '#10b981',
                          border: isPending ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)'
                        }}>
                          {isPending ? 'PENDING BANK REVIEW' : 'VERIFIED & ACTIVE'}
                        </span>
                        <strong style={{ fontSize: '1rem', color: '#fff' }}>Order #{order.order_ref}</strong>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        Customer: <strong>{order.customer_name || 'Creator'}</strong> ({order.customer_email})
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                        Unlock Code: <code style={{ color: '#fff', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{order.unlock_code}</code>
                        {order.created_at && <span> • Placed: {new Date(order.created_at).toLocaleString()}</span>}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--blue-light)' }}>
                          {order.currency === 'USD' ? `$${order.total_amount_usd}` : `₦${(order.total_amount_ngn || 0).toLocaleString()}`}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        {isPending ? (
                          <button
                            onClick={() => handleApproveOrder(order)}
                            disabled={processingRef === order.order_ref}
                            className="btn btn-primary"
                            style={{ background: '#10b981', borderColor: '#059669', padding: '8px 16px', fontSize: '0.85rem' }}
                          >
                            <CheckCircle2 size={15} />
                            {processingRef === order.order_ref ? 'Approving...' : 'Approve & Email Token'}
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={15} /> Activated
                          </span>
                        )}

                        <a
                          href={`mailto:${order.customer_email}?subject=Your Master Prompt Studio Order #${order.order_ref}`}
                          className="btn btn-secondary"
                          style={{ padding: '8px 12px' }}
                          title="Email Customer"
                        >
                          <Mail size={15} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BANK ALERT QUICK-PARSER */}
      {activeTab === 'bank-parser' && (
        <div className="glass-panel" style={{ maxWidth: '720px', padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
            Bank Alert Quick-Parser & Auto-Reconciler
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
            Paste any bank SMS alert or email notification text from <strong>OPAY</strong> or <strong>GTB</strong>. Our parser automatically extracts the Order Reference (<code>PO-XXXXXX</code>) or transaction amount, reconciles it against pending database orders, marks it verified, and emails the customer their unlock token.
          </p>

          <form onSubmit={handleProcessBankAlert}>
            <textarea
              rows={5}
              placeholder="Paste raw SMS or Email Alert here... (e.g. Credit: NGN 35,000.00 from John Doe ref PO-849201 via OPAY)"
              value={rawAlertInput}
              onChange={e => setRawAlertInput(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-input)',
                border: '1px solid var(--border-glass)',
                color: '#fff',
                fontSize: '0.9rem',
                fontFamily: 'monospace',
                marginBottom: '16px'
              }}
            />

            <button
              type="submit"
              disabled={isParsing || !rawAlertInput.trim()}
              className="btn btn-primary"
              style={{ padding: '12px 24px', fontSize: '0.92rem' }}
            >
              <Sparkles size={16} />
              {isParsing ? 'Reconciling against database...' : 'Auto-Match & Unlock Order'}
            </button>
          </form>

          {parserResult && (
            <div style={{
              marginTop: '20px',
              padding: '16px',
              borderRadius: '8px',
              background: parserResult.success ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
              border: parserResult.success ? '1px solid #10b981' : '1px solid var(--border-red)'
            }}>
              <div style={{ fontWeight: 700, color: parserResult.success ? '#10b981' : 'var(--red-light)', marginBottom: '6px' }}>
                {parserResult.success ? '✓ Match Found & Reconciled' : '✕ Match Failed'}
              </div>
              <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-primary)' }}>
                {parserResult.message || parserResult.reason}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BLOG & CMS */}
      {activeTab === 'cms' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                Blog Articles & Knowledge Hub CMS
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                Publish high-converting prompt tutorials and case studies to attract organic Google traffic.
              </p>
            </div>

            <button
              onClick={handleStartNewPost}
              className="btn btn-primary"
              style={{ padding: '10px 18px', fontSize: '0.85rem' }}
            >
              <Plus size={16} /> Write New Article
            </button>
          </div>

          {isCreatingPost ? (
            <div className="glass-panel" style={{ padding: '28px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                  {editingPost ? 'Edit Article' : 'Create New Article'}
                </h4>
                <button
                  onClick={() => setIsCreatingPost(false)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSavePost}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={postTitle}
                    onChange={e => setPostTitle(e.target.value)}
                    placeholder="e.g. 5 Advanced Prompt Chaining Blueprints for 2026"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', color: '#fff' }}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Category
                    </label>
                    <select
                      value={postCategory}
                      onChange={e => setPostCategory(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', color: '#fff' }}
                    >
                      <option value="Prompt Engineering">Prompt Engineering</option>
                      <option value="Digital Monetization">Digital Monetization</option>
                      <option value="Case Studies">Case Studies</option>
                      <option value="AI News & Updates">AI News & Updates</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Cover Image URL
                    </label>
                    <input
                      type="url"
                      value={postCoverImage}
                      onChange={e => setPostCoverImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', color: '#fff' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Short Excerpt (SEO Meta Description)
                  </label>
                  <textarea
                    rows={2}
                    value={postExcerpt}
                    onChange={e => setPostExcerpt(e.target.value)}
                    placeholder="Brief 1-2 sentence preview..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', color: '#fff' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Article Markdown Content
                  </label>
                  <textarea
                    rows={12}
                    value={postContent}
                    onChange={e => setPostContent(e.target.value)}
                    style={{ width: '100%', padding: '14px', borderRadius: '8px', background: 'var(--bg-input)', border: '1px solid var(--border-glass)', color: '#fff', fontFamily: 'monospace', fontSize: '0.88rem' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#fff', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={postIsPublished}
                      onChange={e => setPostIsPublished(e.target.checked)}
                    />
                    Publish Live on Site
                  </label>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                  >
                    Save & Publish Article
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
              {blogPosts.map(post => (
                <div key={post.id || post.slug} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span className="badge badge-blue">{post.category}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{post.read_time}</span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>{post.title}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                      {post.excerpt}
                    </p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                      onClick={() => handleStartEdit(post)}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                    >
                      <Edit3 size={13} /> Edit
                    </button>

                    <button
                      onClick={() => handleDeletePost(post.id, post.title)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 10px', color: 'var(--red-light)' }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SPEAKING INQUIRIES */}
      {activeTab === 'speaking' && (
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px' }}>
            Keynote Speaker Booking Pipeline
          </h3>

          {inquiries.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
              No speaking inquiries logged yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {inquiries.map(inq => (
                <div key={inq.id} className="glass-panel" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{inq.client_name}</h4>
                      <div style={{ fontSize: '0.85rem', color: 'var(--blue-light)', fontWeight: 600 }}>{inq.organization || 'Independent'}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {inq.created_at ? new Date(inq.created_at).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    <div>Event: <strong>{inq.event_type}</strong> • Date: <strong>{inq.preferred_date || 'Flexible'}</strong></div>
                    <div>Audience: <strong>{inq.estimated_audience}</strong> • Topic: <strong>{inq.topic}</strong></div>
                    {inq.additional_notes && (
                      <div style={{ marginTop: '8px', padding: '10px', background: 'var(--bg-input)', borderRadius: '6px', fontSize: '0.8rem', fontStyle: 'italic' }}>
                        "{inq.additional_notes}"
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <a
                      href={`mailto:${inq.client_email}?subject=Keynote Speaker Inquiry - Samuel B. Omotoso`}
                      className="btn btn-primary"
                      style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                    >
                      <Mail size={14} /> Reply via Email ({inq.client_email})
                    </a>

                    <a
                      href={`https://wa.me/2348034710699?text=${encodeURIComponent(`Hello Samuel, follow up on speaking request from ${inq.client_name} (${inq.organization}) for topic "${inq.topic}"`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '8px 14px', fontSize: '0.82rem' }}
                    >
                      <MessageSquare size={14} color="#10b981" /> WhatsApp Log
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
