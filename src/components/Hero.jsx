import React from 'react';
import { Sparkles, Zap, ShieldCheck, ArrowRight, Award, BookOpen, SlidersHorizontal, Mic, CheckCircle2 } from 'lucide-react';

export function Hero({ onStartOptimizing, onExploreShop, onOpenFactory, onOpenSpeaking }) {
  return (
    <section style={{
      textAlign: 'center',
      padding: '40px 16px 28px 16px',
      position: 'relative'
    }}>
      {/* Top Banner Tag */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 18px',
        borderRadius: 'var(--radius-full)',
        background: 'rgba(239, 68, 68, 0.12)',
        border: '1px solid var(--border-red)',
        marginBottom: '20px',
        backdropFilter: 'blur(8px)'
      }}>
        <Sparkles size={16} color="var(--red-light)" />
        <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--red-light)' }}>
          Master Prompt Studio • Advanced AI Prompting & Content Factory Suite
        </span>
        <span style={{
          background: 'var(--blue-primary)',
          color: '#fff',
          fontSize: '0.65rem',
          padding: '2px 8px',
          borderRadius: '10px',
          fontWeight: 700
        }}>
          v2.5 PRO
        </span>
      </div>

      {/* Main Heading */}
      <h1 style={{
        fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
        lineHeight: 1.15,
        marginBottom: '18px',
        fontWeight: 800,
        maxWidth: '960px',
        margin: '0 auto 18px auto'
      }}>
        Transform Vague Ideas into{' '}
        <span className="gradient-text-red-blue">
          High-Yield AI Prompts
        </span>
      </h1>

      {/* Subheading */}
      <p style={{
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        color: 'var(--text-secondary)',
        maxWidth: '780px',
        margin: '0 auto 30px auto',
        lineHeight: 1.6
      }}>
        Rewrite rough instructions into structured, expert-level prompts for <strong style={{ color: 'var(--text-primary)' }}>ChatGPT, Claude 3.5, Gemini, & Midjourney</strong>. Run the 30-mode <strong style={{ color: 'var(--blue-light)' }}>Digital Content Factory</strong>, shop master prompts & eBooks, or book <strong style={{ color: 'var(--red-light)' }}>Samuel B. Omotoso</strong> for keynotes.
      </p>

      {/* 4 Pillars Quick Navigation Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '12px',
        maxWidth: '1020px',
        margin: '0 auto 36px auto'
      }}>
        <div 
          onClick={onStartOptimizing}
          className="glass-card"
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            background: 'var(--bg-surface-elevated)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--blue-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={16} color="var(--blue-light)" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>AI Optimizer</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
            STAR, RTF & CoT prompt engineering. 100% free with 1-click test links.
          </p>
        </div>

        <div 
          onClick={onOpenFactory}
          className="glass-card"
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-blue)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            background: 'rgba(59, 130, 246, 0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--blue-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <SlidersHorizontal size={15} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--blue-light)' }}>Content Factory</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
            30 production modes: eBooks, curricula, academic papers, marketing & speeches.
          </p>
        </div>

        <div 
          onClick={onExploreShop}
          className="glass-card"
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-red)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            background: 'rgba(239, 68, 68, 0.06)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--red-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <BookOpen size={15} />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--red-light)' }}>Special Shop</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
            Master Prompt Vaults & creator eBooks with instant OPAY/GTB delivery.
          </p>
        </div>

        <div 
          onClick={onOpenSpeaking}
          className="glass-card"
          style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.2s ease',
            background: 'var(--bg-surface-elevated)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mic size={15} color="var(--red-light)" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Invite S. B. Omotoso</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
            Book Samuel B. Omotoso for AI keynotes, executive masterclasses & summits.
          </p>
        </div>
      </div>

      {/* Trust & Bank Badges */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} color="#10b981" />
          <span>No Credit Card or Login Needed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={18} color="var(--blue-light)" />
          <span>RTF, STAR & Chain-of-Thought</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            background: 'var(--red-subtle)',
            color: 'var(--red-light)',
            padding: '2px 6px',
            borderRadius: '4px',
            border: '1px solid var(--border-red)'
          }}>
            OPAY: 8034710699 • GTB: 0029103844
          </span>
          <span>Automated WhatsApp Verification</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
