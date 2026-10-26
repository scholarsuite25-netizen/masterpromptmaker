import React, { useState } from 'react';
import { 
  ShoppingBag, BookOpen, Star, Check, Eye, Download, 
  MessageSquare, Sparkles, Search, Building2, ShieldCheck, Zap 
} from 'lucide-react';
import { digitalProducts, shopCategories } from '../data/mockProducts';

export function DigitalShop({
  onAddToCart,
  onOpenPreview,
  onDirectBuy,
  currency,
  setCurrency,
  onNotify
}) {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = digitalProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All Products" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="digital-shop" style={{ marginBottom: '80px' }}>
      {/* Store Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 14px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid var(--border-red)',
          marginBottom: '12px'
        }}>
          <Sparkles size={14} color="var(--red-light)" />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--red-light)', textTransform: 'uppercase' }}>
            Exclusive Digital Store
          </span>
        </div>
        <h2 style={{ fontSize: '2.4rem', marginBottom: '12px', fontWeight: 800 }}>
          Master <span className="gradient-text-red-blue">Digital Products Store</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '720px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
          Explore curated high-yield digital products: master prompt vaults, eBooks, Notion OS workspaces, Next.js code boilerplates, Figma design systems, financial models, and legal contract suites. Instant automated checkout via WhatsApp with verified OPAY & GTB bank transfer.
        </p>

        {/* Streamlined Trust Badge */}
        <div style={{
          marginTop: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '6px 16px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-surface-elevated)',
          border: '1px solid var(--border-blue)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)'
        }}>
          <ShieldCheck size={15} color="#10b981" />
          <span>Instant OPAY & GTB Delivery • Single-User Authorized License</span>
        </div>
      </div>

      {/* Filter, Currency & Search Controls */}
      <div className="glass-panel" style={{
        padding: '16px 20px',
        marginBottom: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Category Filter Pills */}
        <div className="scroll-pills-row" style={{ width: '100%', marginBottom: '4px' }}>
          {shopCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="btn"
              style={{
                padding: '7px 14px',
                fontSize: '0.825rem',
                borderRadius: 'var(--radius-sm)',
                background: selectedCategory === cat ? 'var(--gradient-brand)' : 'var(--bg-surface-elevated)',
                color: selectedCategory === cat ? '#ffffff' : 'var(--text-secondary)',
                border: `1px solid ${selectedCategory === cat ? 'transparent' : 'var(--border-subtle)'}`,
                boxShadow: selectedCategory === cat ? 'var(--shadow-glow-dual)' : 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Currency Switcher & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', width: '100%' }}>
          {/* Currency Toggle */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-surface-elevated)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid var(--border-subtle)',
            flexShrink: 0
          }}>
            <button
              onClick={() => setCurrency('NGN')}
              style={{
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: 'none',
                background: currency === 'NGN' ? 'var(--blue-primary)' : 'transparent',
                color: currency === 'NGN' ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              NGN (₦)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              style={{
                padding: '6px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: 'none',
                background: currency === 'USD' ? 'var(--blue-primary)' : 'transparent',
                color: currency === 'USD' ? '#fff' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              USD ($)
            </button>
          </div>

          {/* Search Box */}
          <div className="search-bar-wrap" style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search store items..."
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
      </div>

      {/* Products Grid */}
      <div className="responsive-cards-grid">
        {filteredProducts.map((product) => {
          const priceDisplay = currency === 'NGN' 
            ? `₦${product.priceNGN.toLocaleString()}` 
            : `$${product.priceUSD.toFixed(2)}`;
          
          const origPriceDisplay = currency === 'NGN'
            ? `₦${product.originalPriceNGN.toLocaleString()}`
            : `$${product.originalPriceUSD.toFixed(2)}`;

          return (
            <div
              key={product.id}
              className="glass-panel glass-card-dual-hover"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Accent Gradient Border */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '4px',
                background: product.badgeColor === 'red' ? 'var(--gradient-brand)' : 'linear-gradient(90deg, #3b82f6, #06b6d4)'
              }}></div>

              <div>
                {/* Badges & Meta */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span className={`badge badge-${product.badgeColor || 'red'}`}>
                      {product.badge}
                    </span>
                    <span className="badge badge-blue">
                      {product.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span>{product.rating}</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', lineHeight: 1.3, fontWeight: 700 }}>
                  {product.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
                  {product.subtitle}
                </p>

                {/* Key Bullet Features */}
                <div style={{
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 14px',
                  marginBottom: '18px',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {product.pages}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {product.features.slice(0, 3).map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                        <Check size={14} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ lineHeight: 1.3 }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pricing & Actions */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-subtle)'
                }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Price:</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {priceDisplay}
                      </span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        {origPriceDisplay}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenPreview(product)}
                    className="btn btn-secondary"
                    style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                    title="View table of contents and free sample chapter"
                  >
                    <Eye size={14} color="var(--blue-light)" />
                    Preview Excerpt
                  </button>
                </div>

                {/* Primary Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    onClick={() => {
                      onAddToCart(product);
                      onNotify(`Added "${product.title}" to cart!`, "blue");
                    }}
                    className="btn btn-secondary"
                    style={{
                      padding: '10px',
                      fontSize: '0.85rem',
                      border: '1px solid var(--border-blue)'
                    }}
                  >
                    <ShoppingBag size={16} color="var(--blue-light)" />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => onDirectBuy(product)}
                    className="btn btn-whatsapp"
                    style={{
                      padding: '10px',
                      fontSize: '0.85rem'
                    }}
                  >
                    <MessageSquare size={16} />
                    WhatsApp Buy
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
