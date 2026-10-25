import React from 'react';
import { X, BookOpen, Download, ShoppingBag, MessageSquare, Check, Sparkles } from 'lucide-react';

export function ProductPreviewModal({ product, currency, onClose, onAddToCart, onBuyWhatsApp, onNotify }) {
  if (!product) return null;

  const displayPrice = currency === 'NGN' 
    ? `₦${product.priceNGN.toLocaleString()}` 
    : `$${product.priceUSD.toFixed(2)}`;

  const handleDownloadSample = () => {
    const filename = `${product.id}-free-sample.md`;
    const content = `# Free Sample Preview: ${product.title}\n\nType: ${product.type.toUpperCase()}\nPrice: ${displayPrice}\nBank Details: GTB | Account Number: 0029103844\nWhatsApp Support: +2348034710699\n\n---\n\n${product.sampleExcerpt?.chapter || "Sample Chapter"}\n\n${product.sampleExcerpt?.content || product.description}\n\n---\n\nOrder the full edition via WhatsApp at https://wa.me/2348034710699`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    onNotify(`Downloaded free sample excerpt for "${product.title}"!`, "success");
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(7, 9, 14, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '720px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-blue)',
        boxShadow: 'var(--shadow-glow-dual)',
        padding: '28px',
        position: 'relative',
        background: 'var(--bg-surface)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-secondary"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '8px',
            borderRadius: '50%'
          }}
        >
          <X size={18} />
        </button>

        {/* Product Type Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span className={`badge badge-${product.badgeColor || 'red'}`}>
            {product.badge}
          </span>
          <span className="badge badge-blue">
            {product.type === 'ebook' ? 'Digital eBook (PDF/ePub)' : 'Ready-Made Prompt Vault'}
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {product.pages}
          </span>
        </div>

        {/* Title */}
        <h2 style={{ fontSize: '1.6rem', marginBottom: '8px', lineHeight: 1.3 }}>
          {product.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '20px' }}>
          {product.subtitle}
        </p>

        {/* Features List */}
        <div style={{
          background: 'var(--bg-surface-elevated)',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          marginBottom: '20px'
        }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--blue-light)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            What's Included in the Full Version:
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px' }}>
            {product.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <Check size={14} color="#10b981" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Excerpt Reader Box */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--red-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} />
              {product.sampleExcerpt?.chapter || "Sample Chapter Preview"}
            </h4>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Free Excerpt Preview
            </span>
          </div>

          <div style={{
            background: 'var(--bg-input)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-glass)',
            padding: '18px',
            maxHeight: '260px',
            overflowY: 'auto',
            fontFamily: product.type === 'prompts' ? 'var(--font-mono)' : 'var(--font-sans)',
            fontSize: '0.88rem',
            lineHeight: 1.6,
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap'
          }}>
            {product.sampleExcerpt?.content || product.description}
          </div>
        </div>

        {/* Bottom Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Full Access Price</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {displayPrice}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={handleDownloadSample}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', padding: '10px 14px' }}
            >
              <Download size={16} />
              Download Free Excerpt
            </button>

            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="btn btn-blue"
              style={{ fontSize: '0.85rem', padding: '10px 16px' }}
            >
              <ShoppingBag size={16} />
              Add to Cart
            </button>

            <button
              onClick={() => {
                onBuyWhatsApp(product);
                onClose();
              }}
              className="btn btn-whatsapp"
              style={{ fontSize: '0.85rem', padding: '10px 16px' }}
            >
              <MessageSquare size={16} />
              Order on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
