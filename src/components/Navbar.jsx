import React, { useState } from 'react';
import { 
  Sparkles, ShoppingBag, BookOpen, Bookmark, Sun, Moon, 
  MessageSquare, Zap, SlidersHorizontal, Mic, Menu, X, 
  ChevronDown, ChevronRight, ArrowRight, CheckCircle2 
} from 'lucide-react';

export function Navbar({ activeTab, setActiveTab, cartCount, openCart, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState('optimizer');

  const scrollTo = (targetId, tab) => {
    if (setActiveTab) setActiveTab(tab);
    setMobileMenuOpen(false);

    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 84;
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

  const toggleExpand = (sectionKey) => {
    setExpandedSection(prev => prev === sectionKey ? null : sectionKey);
  };

  // 5 Logically Arranged Main Sections with Expandable Submenus
  const navSections = [
    {
      id: 'optimizer-workbench',
      tab: 'optimizer',
      label: 'Prompt Workbench',
      icon: Zap,
      desc: 'AI Prompt Engineering Studio',
      submenus: [
        { label: 'Interactive Prompt Studio', targetId: 'optimizer-workbench', tab: 'optimizer' },
        { label: 'STAR, RTF & CoT Frameworks', targetId: 'optimizer-workbench', tab: 'optimizer' },
        { label: 'Target AI Models (Claude, GPT-4o, Gemini)', targetId: 'optimizer-workbench', tab: 'optimizer' },
        { label: '4-Format Prompt Export', targetId: 'optimizer-workbench', tab: 'optimizer' },
      ]
    },
    {
      id: 'content-factory-studio',
      tab: 'factory',
      label: 'Content Factory',
      icon: SlidersHorizontal,
      badge: '30 Modes',
      desc: 'Autonomous Document & Publishing Suite',
      submenus: [
        { label: '30 Production Modes Overview', targetId: 'content-factory-studio', tab: 'factory' },
        { label: 'eBooks & Monograph Publishing', targetId: 'content-factory-studio', tab: 'factory' },
        { label: 'Academic & Curricula Generator', targetId: 'content-factory-studio', tab: 'factory' },
        { label: 'Master Prompt Spec Compiler', targetId: 'content-factory-studio', tab: 'factory' },
      ]
    },
    {
      id: 'digital-shop',
      tab: 'shop',
      label: 'Digital Shop',
      icon: BookOpen,
      desc: 'eBooks, Prompt Vaults & Systems',
      submenus: [
        { label: 'All Digital Products Catalog', targetId: 'digital-shop', tab: 'shop' },
        { label: 'eBooks & Founder Playbooks', targetId: 'digital-shop', tab: 'shop' },
        { label: 'Prompt Vaults & Code Starters', targetId: 'digital-shop', tab: 'shop' },
        { label: 'OPAY & GTB Instant Delivery', targetId: 'digital-shop', tab: 'shop' },
      ]
    },
    {
      id: 'speaking-inquiry',
      tab: 'speaking',
      label: 'Keynote Speaking',
      icon: Mic,
      desc: 'Convocation & Executive Keynotes',
      submenus: [
        { label: 'S. B. Omotoso Speaker Profile', targetId: 'speaking-inquiry', tab: 'speaking' },
        { label: 'Signature Convocation Themes', targetId: 'speaking-inquiry', tab: 'speaking' },
        { label: 'Direct Booking Inquiry Form', targetId: 'speaking-inquiry', tab: 'speaking' },
      ]
    },
    {
      id: 'prompt-library',
      tab: 'library',
      label: 'My Library',
      icon: Bookmark,
      desc: 'Saved Prompts & Purchased Downloads',
      submenus: [
        { label: 'Saved Custom Prompts', targetId: 'prompt-library', tab: 'library' },
        { label: 'Purchased Products & Downloads', targetId: 'prompt-library', tab: 'library' },
      ]
    },
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
            <div className="hide-on-mobile" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              AI Studio • Content Factory • Digital Store
            </div>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="desktop-nav">
          {navSections.map((item) => {
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
                    background: 'rgba(59, 130, 246, 0.25)',
                    color: 'var(--blue-light)',
                    fontSize: '0.6rem',
                    padding: '1px 5px',
                    borderRadius: '6px',
                    fontWeight: 800,
                    border: '1px solid var(--border-blue)'
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
            title="Chat on WhatsApp (+2348034710699)"
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
              padding: '7px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-blue)'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} color="var(--red-light)" /> : <Menu size={18} color="var(--text-primary)" />}
          </button>
        </div>
      </div>

      {/* Refactored Mobile Hamburger Drawer with Expandable Submenus */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-glass)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            padding: '2px 4px'
          }}>
            Navigation Menu & Submenus
          </div>

          {navSections.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            const isExpanded = expandedSection === item.tab;

            return (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Main Section Header Row */}
                <div
                  className={`drawer-main-item ${isActive ? 'active' : ''}`}
                  onClick={() => toggleExpand(item.tab)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isActive ? 'var(--blue-primary)' : 'rgba(148, 163, 184, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? '#fff' : 'var(--blue-light)'
                    }}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.label}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {item.badge && (
                      <span style={{
                        background: 'rgba(59, 130, 246, 0.25)',
                        color: 'var(--blue-light)',
                        fontSize: '0.62rem',
                        padding: '2px 6px',
                        borderRadius: '6px',
                        fontWeight: 800
                      }}>
                        {item.badge}
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronDown size={17} color="var(--blue-light)" />
                    ) : (
                      <ChevronRight size={17} color="var(--text-muted)" />
                    )}
                  </div>
                </div>

                {/* Expandable Submenus Accordion */}
                {isExpanded && (
                  <div className="drawer-submenus-wrap">
                    {/* Quick Link to Jump Directly to Main Section */}
                    <div
                      className="drawer-submenu-item"
                      onClick={() => scrollTo(item.id, item.tab)}
                      style={{ fontWeight: 700, color: 'var(--blue-light)' }}
                    >
                      <span>Jump to {item.label}</span>
                      <ArrowRight size={13} />
                    </div>

                    {/* Submenu Features */}
                    {item.submenus.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="drawer-submenu-item"
                        onClick={() => scrollTo(sub.targetId, sub.tab)}
                      >
                        <span>{sub.label}</span>
                        <ChevronRight size={13} color="var(--text-muted)" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Clean Mobile WhatsApp Direct Help */}
          <a
            href="https://wa.me/2348034710699?text=Hello%20Master%20Prompt%20Studio%20Support!%20I%20have%20an%20inquiry%20about%20your%20prompts%20and%20eBooks."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{
              padding: '11px 16px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-md)',
              marginTop: '4px',
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
