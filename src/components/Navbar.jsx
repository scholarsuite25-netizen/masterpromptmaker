import React from 'react';
import { Sparkles, ShoppingBag, BookOpen, Layers, Bookmark, Sun, Moon, MessageSquare, Zap, SlidersHorizontal, Mic } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab, cartCount, openCart, theme, toggleTheme }) {
  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 12,
      zIndex: 100,
      margin: '12px auto 24px auto',
      maxWidth: '1380px',
      borderRadius: 'var(--radius-lg)',
      padding: '12px 20px',
      border: '1px solid var(--border-glass)',
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(20px)',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('optimizer')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow-dual)',
            color: '#fff'
          }}>
            <Sparkles size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)'
              }}>
                Master<span className="gradient-text-red-blue">Prompt</span> Studio
              </span>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                background: 'var(--blue-subtle)',
                color: 'var(--blue-light)',
                padding: '2px 6px',
                borderRadius: '6px',
                border: '1px solid var(--border-blue)'
              }}>
                .AI
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              100% Free AI Tool + Digital Factory & Shop
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'var(--bg-surface-elevated)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveTab('optimizer')}
            className="btn"
            style={{
              padding: '8px 13px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              background: activeTab === 'optimizer' ? 'var(--gradient-red-blue)' : 'transparent',
              color: activeTab === 'optimizer' ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeTab === 'optimizer' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Zap size={16} />
            AI Optimizer
          </button>

          <button
            onClick={() => setActiveTab('factory')}
            className="btn"
            style={{
              padding: '8px 13px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              background: activeTab === 'factory' ? 'var(--gradient-red-blue)' : 'transparent',
              color: activeTab === 'factory' ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeTab === 'factory' ? 'var(--shadow-sm)' : 'none',
              position: 'relative'
            }}
          >
            <SlidersHorizontal size={16} />
            Content Factory
            <span style={{
              background: 'rgba(59, 130, 246, 0.25)',
              color: 'var(--blue-light)',
              fontSize: '0.62rem',
              padding: '1px 5px',
              borderRadius: '6px',
              fontWeight: 800,
              border: '1px solid var(--border-blue)'
            }}>
              30 Modes
            </span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className="btn"
            style={{
              padding: '8px 13px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              background: activeTab === 'templates' ? 'var(--gradient-red-blue)' : 'transparent',
              color: activeTab === 'templates' ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeTab === 'templates' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Layers size={16} />
            Templates
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className="btn"
            style={{
              padding: '8px 13px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              background: activeTab === 'shop' ? 'var(--gradient-red-blue)' : 'transparent',
              color: activeTab === 'shop' ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeTab === 'shop' ? 'var(--shadow-sm)' : 'none',
              position: 'relative'
            }}
          >
            <BookOpen size={16} />
            Special Shop
            <span style={{
              background: 'var(--red-primary)',
              color: '#fff',
              fontSize: '0.62rem',
              padding: '1px 5px',
              borderRadius: '10px',
              fontWeight: 800
            }}>
              HOT
            </span>
          </button>

          <button
            onClick={() => setActiveTab('speaking')}
            className="btn"
            style={{
              padding: '8px 13px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              background: activeTab === 'speaking' ? 'var(--gradient-red-blue)' : 'transparent',
              color: activeTab === 'speaking' ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeTab === 'speaking' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Mic size={16} color="var(--red-light)" />
            Invite S. B. Omotoso
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className="btn"
            style={{
              padding: '8px 13px',
              fontSize: '0.85rem',
              borderRadius: '8px',
              background: activeTab === 'library' ? 'var(--gradient-red-blue)' : 'transparent',
              color: activeTab === 'library' ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeTab === 'library' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            <Bookmark size={16} />
            My Library
          </button>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* WhatsApp Direct Chat */}
          <a
            href="https://wa.me/2348034710699?text=Hello%20Master%20Prompt%20Studio%20Support!%20I%20have%20an%20inquiry%20about%20your%20prompts%20and%20eBooks."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp hide-on-mobile"
            style={{
              padding: '7px 12px',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-sm)'
            }}
            title="Chat directly on WhatsApp (+2348034710699)"
          >
            <MessageSquare size={15} />
            WhatsApp Support
          </a>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="btn btn-secondary"
            style={{
              position: 'relative',
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-blue)'
            }}
            title="View Shopping Cart"
          >
            <ShoppingBag size={18} color="var(--blue-light)" />
            <span className="hide-on-mobile" style={{ fontSize: '0.85rem' }}>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: 'var(--red-primary)',
                color: '#fff',
                fontSize: '0.72rem',
                fontWeight: 800,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-glow-red)'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            style={{
              padding: '8px 10px',
              borderRadius: 'var(--radius-sm)'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Cyber Mode'}
          >
            {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
          </button>
        </div>
      </div>
    </header>
  );
}
