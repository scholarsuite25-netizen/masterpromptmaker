import React from 'react';
import { Sparkles, MessageSquare, Building2, ShieldCheck, Heart } from 'lucide-react';

export function Footer({ setActiveTab, scrollToSection, onOpenLegal, onOpenAdmin }) {
  const handleNav = (id, tab) => {
    if (scrollToSection) {
      scrollToSection(id, tab);
    } else if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-surface)',
      padding: '48px clamp(14px, 3vw, 24px) 32px clamp(14px, 3vw, 24px)',
      position: 'relative',
      zIndex: 1
    }}>
      <div className="app-container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
        gap: '36px',
        marginBottom: '36px'
      }}>
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--gradient-brand)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Sparkles size={18} />
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem' }}>
              Master<span className="gradient-text-red-blue">Prompt</span> Studio
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            The free, intelligent prompt optimization suite engineered for creators, software developers, and marketers. Plus curated ready-made prompt vaults & eBooks.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <ShieldCheck size={16} color="#10b981" />
            <span>100% Free Core Tool • No Paywall</span>
          </div>
        </div>

        {/* Bank & WhatsApp Order Details */}
        <div style={{
          background: 'var(--bg-surface-elevated)',
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-blue)'
        }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue-light)', textTransform: 'uppercase', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building2 size={16} />
            Payment & Bank Transfer
          </h4>
          <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div>
              <span style={{ color: '#34d399', fontWeight: 700 }}>OPAY:</span> <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>8034710699</strong> (Samuel Omotoso)
            </div>
            <div>
              <span style={{ color: 'var(--blue-light)', fontWeight: 700 }}>GTB:</span> <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>0029103844</strong> (Master Prompt Digital)
            </div>
          </div>
          
          <a
            href="https://wa.me/2348034710699?text=Hello%20Master%20Prompt%20Studio%20Support!%20I%20have%20an%20inquiry%20about%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ fontSize: '0.8rem', padding: '8px 12px', width: '100%' }}
          >
            <MessageSquare size={15} />
            WhatsApp: +2348034710699
          </a>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Navigation & Tools
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <li>
              <button 
                onClick={() => handleNav('optimizer-workbench', 'optimizer')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
              >
                Prompt Studio
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNav('content-factory-studio', 'factory')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
              >
                Content Factory
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNav('templates-gallery', 'templates')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
              >
                Prompt Templates
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNav('digital-shop', 'shop')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
              >
                Digital Store
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNav('speaking-inquiry', 'speaking')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
              >
                Speaker Booking (S. B. Omotoso)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNav('prompt-library', 'library')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
              >
                My Library
              </button>
            </li>
          </ul>
        </div>

        {/* Engineering Frameworks */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
            Supported Frameworks
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <span className="badge badge-blue">RTF Method</span>
            <span className="badge badge-red">STAR Protocol</span>
            <span className="badge badge-blue">Chain-of-Thought</span>
            <span className="badge badge-purple">Expert Persona</span>
            <span className="badge badge-blue">Few-Shot Demo</span>
            <span className="badge badge-red">Midjourney v6.1</span>
          </div>
        </div>
      </div>

      {/* Copyright, Legal & Admin Links */}
      <div style={{
        textAlign: 'center',
        paddingTop: '20px',
        borderTop: '1px solid var(--border-subtle)',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          <button
            onClick={() => onOpenLegal && onOpenLegal('terms')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.78rem' }}
          >
            Terms of Service
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenLegal && onOpenLegal('privacy')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.78rem' }}
          >
            Privacy Policy (GDPR/NDPR)
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenLegal && onOpenLegal('refund')}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.78rem' }}
          >
            Refund & Delivery Policy
          </button>
          <span>•</span>
          <button
            onClick={() => onOpenAdmin && onOpenAdmin()}
            style={{ background: 'transparent', border: 'none', color: 'var(--blue-light)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
          >
            🔐 Samuel Omotoso Admin Portal
          </button>
        </div>

        <span>© {new Date().getFullYear()} Master Prompt Studio • Built for creators and developers worldwide.</span>
      </div>
    </footer>
  );
}
