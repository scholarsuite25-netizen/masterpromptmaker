import React, { useState } from 'react';
import { Sparkles, ShoppingBag, BookOpen, Layers, Bookmark, Sun, Moon, MessageSquare, Zap, SlidersHorizontal, Mic, Menu, X, ChevronRight } from 'lucide-react';

export function Navbar({ activeTab, setActiveTab, cartCount, openCart, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (targetId, tab) => {
    if (setActiveTab) setActiveTab(tab);
    setMobileMenuOpen(false);

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = Math.max(0, elementPosition - navOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'optimizer-workbench', tab: 'optimizer', label: 'AI Optimizer', icon: Zap },
    { id: 'content-factory-studio', tab: 'factory', label: 'Content Factory', badge: '30 Modes', icon: SlidersHorizontal },
    { id: 'templates-gallery', tab: 'templates', label: 'Templates', icon: Layers },
    { id: 'digital-shop', tab: 'shop', label: 'Special Shop', badge: 'HOT', icon: BookOpen },
    { id: 'speaking-inquiry', tab: 'speaking', label: 'Invite S. B. Omotoso', icon: Mic },
    { id: 'prompt-library', tab: 'library', label: 'My Library', icon: Bookmark },
  ];

  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 8,
      zIndex: 100,
      margin: '8px auto 20px auto',
      maxWidth: '1380px',
      borderRadius: 'var(--radius-lg)',
      padding: '10px 16px',
      border: '1px solid var(--border-glass)',
      background: 'var(--bg-glass)',
      backdropFilter: 'blur(20px)',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => scrollTo('top', 'optimizer')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            userSelect: 'none',
            flexShrink: 0
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow-dual)',
            color: '#fff',
            flexShrink: 0
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.15rem',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap'
              }}>
                Master<span className="gradient-text-red-blue">Prompt</span> Studio
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                background: 'var(--blue-subtle)',
                color: 'var(--blue-light)',
                padding: '2px 5px',
                borderRadius: '6px',
                border: '1px solid var(--border-blue)'
              }}>
                .AI
              </span>
            </div>
            <div className="hide-on-mobile" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              100% Free AI Tool + Digital Factory & Shop
            </div>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id, item.tab)}
                className="btn"
                style={{
                  padding: '7px 12px',
                  fontSize: '0.825rem',
                  borderRadius: '8px',
                  background: isActive ? 'var(--gradient-red-blue)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-secondary)',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  position: 'relative'
                }}
              >
                <Icon size={15} color={item.tab === 'speaking' ? 'var(--red-light)' : undefined} />
                {item.label}
                {item.badge && (
                  <span style={{
                    background: item.badge === 'HOT' ? 'var(--red-primary)' : 'rgba(59, 130, 246, 0.25)',
                    color: item.badge === 'HOT' ? '#fff' : 'var(--blue-light)',
                    fontSize: '0.6rem',
                    padding: '1px 5px',
                    borderRadius: '6px',
                    fontWeight: 800,
                    border: item.badge === 'HOT' ? 'none' : '1px solid var(--border-blue)'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* WhatsApp Direct Chat */}
          <a
            href="https://wa.me/2348034710699?text=Hello%20Master%20Prompt%20Studio%20Support!%20I%20have%20an%20inquiry%20about%20your%20prompts%20and%20eBooks."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp hide-on-mobile"
            style={{
              padding: '7px 11px',
              fontSize: '0.78rem',
              borderRadius: 'var(--radius-sm)'
            }}
            title="Chat directly on WhatsApp (+2348034710699)"
          >
            <MessageSquare size={14} />
            WhatsApp
          </a>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="btn btn-secondary"
            style={{
              position: 'relative',
              padding: '7px 11px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-blue)'
            }}
            title="View Shopping Cart"
          >
            <ShoppingBag size={17} color="var(--blue-light)" />
            <span className="hide-on-mobile" style={{ fontSize: '0.8rem' }}>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: 'var(--red-primary)',
                color: '#fff',
                fontSize: '0.68rem',
                fontWeight: 800,
                width: '18px',
                height: '18px',
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
              padding: '7px 9px',
              borderRadius: 'var(--radius-sm)'
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Cyber Mode'}
          >
            {theme === 'dark' ? <Sun size={17} color="#f59e0b" /> : <Moon size={17} color="#6366f1" />}
          </button>

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary mobile-menu-toggle"
            style={{
              padding: '7px 9px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-red)'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} color="var(--red-light)" /> : <Menu size={18} color="var(--text-primary)" />}
          </button>
        </div>
      </div>

      {/* Mobile Swipeable Quick-Pill Bar */}
      <div className="mobile-quick-pills">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id, item.tab)}
              className="btn"
              style={{
                padding: '5px 10px',
                fontSize: '0.75rem',
                borderRadius: 'var(--radius-full)',
                background: isActive ? 'var(--gradient-red-blue)' : 'var(--bg-surface-elevated)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${isActive ? 'transparent' : 'var(--border-subtle)'}`,
                boxShadow: isActive ? 'var(--shadow-glow-dual)' : 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              <Icon size={13} color={item.tab === 'speaking' ? 'var(--red-light)' : undefined} />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Mobile Dropdown Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <div
                key={item.id}
                onClick={() => scrollTo(item.id, item.tab)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--gradient-surface)' : 'var(--bg-surface-elevated)',
                  border: `1px solid ${isActive ? 'var(--blue-light)' : 'var(--border-subtle)'}`,
                  color: isActive ? '#fff' : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isActive ? 'var(--blue-primary)' : 'rgba(148, 163, 184, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isActive ? '#fff' : 'var(--blue-light)'
                  }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.label}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {item.badge && (
                    <span style={{
                      background: item.badge === 'HOT' ? 'var(--red-primary)' : 'rgba(59, 130, 246, 0.25)',
                      color: item.badge === 'HOT' ? '#fff' : 'var(--blue-light)',
                      fontSize: '0.62rem',
                      padding: '2px 6px',
                      borderRadius: '6px',
                      fontWeight: 800
                    }}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              </div>
            );
          })}

          {/* WhatsApp Direct in Mobile Menu */}
          <a
            href="https://wa.me/2348034710699?text=Hello%20Master%20Prompt%20Studio%20Support!%20I%20have%20an%20inquiry%20about%20your%20prompts%20and%20eBooks."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{
              padding: '12px 16px',
              fontSize: '0.875rem',
              borderRadius: 'var(--radius-md)',
              marginTop: '6px',
              justifyContent: 'center'
            }}
          >
            <MessageSquare size={16} />
            Chat with Samuel Omotoso on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
