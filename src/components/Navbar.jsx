import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ShoppingBag, BookOpen, Bookmark, Sun, Moon, 
  MessageSquare, Zap, SlidersHorizontal, Mic, Menu, X, ArrowRight, User, LogIn 
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../utils/supabase';
import { AuthModal } from './AuthModal';

export function Navbar({ activeTab, setActiveTab, cartCount, openCart, theme, toggleTheme, onNotify }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (supabase) {
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user) setUser(data.user);
      }).catch(() => {});

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });

      return () => {
        authListener?.subscription?.unsubscribe();
      };
    }
  }, []);

  const scrollTo = (targetId, tab) => {
    if (setActiveTab) setActiveTab(tab);
    setMobileMenuOpen(false);

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
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
    { id: 'optimizer-workbench', tab: 'optimizer', label: 'Prompt Studio', icon: Zap },
    { id: 'content-factory-studio', tab: 'factory', label: 'Content Factory', icon: SlidersHorizontal },
    { id: 'digital-shop', tab: 'shop', label: 'Digital Store', icon: ShoppingBag },
    { id: 'speaking-inquiry', tab: 'speaking', label: 'Speaker Booking', icon: Mic },
    { id: 'prompt-library', tab: 'library', label: 'My Library', icon: Bookmark },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 12,
      zIndex: 100,
      margin: '0 auto 24px auto',
      maxWidth: '1280px',
      padding: '0 16px'
    }}>
      <div className="glass-panel" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 18px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-glass)',
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        boxShadow: 'var(--shadow-md)',
        gap: '16px'
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
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow-dual)',
            color: '#fff',
            flexShrink: 0
          }}>
            <Sparkles size={18} />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap'
          }}>
            Master<span className="gradient-text-red-blue">Prompt</span>
          </span>
        </div>

        {/* Clean Desktop Navigation Tabs */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'var(--bg-surface-elevated)',
          padding: '4px 6px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id, item.tab)}
                className="btn"
                style={{
                  padding: '7px 14px',
                  fontSize: '0.825rem',
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: 'var(--radius-full)',
                  background: isActive ? 'var(--gradient-red-blue)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  border: 'none',
                  boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Icon size={14} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* WhatsApp Support Button */}
          <a
            href="https://wa.me/2348034710699?text=Hello%20Master%20Prompt%20Support!%20I%20have%20an%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp hide-on-mobile"
            style={{
              padding: '7px 12px',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="Chat directly on WhatsApp"
          >
            <MessageSquare size={14} />
            Support
          </a>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="btn btn-secondary"
            style={{
              position: 'relative',
              padding: '8px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title="View Shopping Cart"
          >
            <ShoppingBag size={16} color="var(--blue-light)" />
            <span className="hide-on-mobile" style={{ fontSize: '0.8rem', fontWeight: 600 }}>Cart</span>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--red-primary)',
                color: '#fff',
                fontSize: '0.65rem',
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

          {/* Account / Cloud Auth Button */}
          <button
            onClick={() => setShowAuthModal(true)}
            className="btn btn-secondary"
            style={{
              padding: '8px 12px',
              borderRadius: 'var(--radius-full)',
              border: `1px solid ${user ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)'}`,
              background: user ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-surface-elevated)',
              color: user ? '#34d399' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            title={user ? `Signed in as ${user.email}` : "Sign In to sync cloud account"}
          >
            <User size={15} color={user ? '#34d399' : 'var(--blue-light)'} />
            <span className="hide-on-mobile" style={{ fontSize: '0.8rem', fontWeight: 600 }}>
              {user ? (user.email ? user.email.split('@')[0] : 'Account') : 'Sign In'}
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-secondary"
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)'
            }}
            title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#6366f1" />}
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary mobile-menu-toggle"
            style={{
              padding: '8px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-blue)'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} color="var(--red-light)" /> : <Menu size={18} color="var(--text-primary)" />}
          </button>
        </div>
      </div>

      {/* Simple, Sleek Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="glass-panel" style={{
          marginTop: '8px',
          padding: '12px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          boxShadow: 'var(--shadow-lg)',
          animation: 'fadeIn 0.2s ease-out'
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
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'var(--gradient-surface)' : 'var(--bg-surface-elevated)',
                  border: `1px solid ${isActive ? 'var(--blue-light)' : 'var(--border-subtle)'}`,
                  color: isActive ? '#fff' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} color={isActive ? 'var(--blue-light)' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </div>
                <ArrowRight size={14} color="var(--text-muted)" />
              </div>
            );
          })}

          {/* Mobile WhatsApp Direct Link */}
          <a
            href="https://wa.me/2348034710699?text=Hello%20Master%20Prompt%20Support!%20I%20have%20an%20inquiry."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{
              padding: '12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              marginTop: '4px',
              justifyContent: 'center',
              fontWeight: 600
            }}
          >
            <MessageSquare size={16} />
            WhatsApp Support (+2348034710699)
          </a>
        </div>
      )}

      {/* Cloud Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        user={user}
        onNotify={onNotify}
      />
    </header>
  );
}

export default Navbar;
