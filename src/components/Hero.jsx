import React from 'react';
import { Sparkles, ShoppingBag, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export function Hero({ onStartOptimizing, onExploreShop }) {
  return (
    <section style={{
      textAlign: 'center',
      padding: '48px 16px 36px 16px',
      maxWidth: '920px',
      margin: '0 auto'
    }}>
      {/* Sleek Pill Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        borderRadius: 'var(--radius-full)',
        background: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-blue)',
        marginBottom: '20px',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)'
      }}>
        <Sparkles size={14} color="var(--blue-light)" />
        <span style={{ fontWeight: 600 }}>Next-Gen AI Prompt Studio & Content Factory</span>
      </div>

      {/* Main Headline */}
      <h1 style={{
        fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
        lineHeight: 1.15,
        fontWeight: 800,
        marginBottom: '18px',
        letterSpacing: '-0.03em',
        color: 'var(--text-primary)'
      }}>
        Craft High-Performance{' '}
        <span className="gradient-text-red-blue">
          AI Prompts
        </span>{' '}
        in Seconds
      </h1>

      {/* Subtitle */}
      <p style={{
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        color: 'var(--text-secondary)',
        maxWidth: '680px',
        margin: '0 auto 32px auto',
        lineHeight: 1.6
      }}>
        Instantly transform rough thoughts into calibrated, expert instructions for <strong>ChatGPT, Claude 3.5, Gemini, and Midjourney</strong>.
      </p>

      {/* Primary Action Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '40px'
      }}>
        <button
          onClick={onStartOptimizing}
          className="btn btn-primary"
          style={{
            padding: '12px 24px',
            fontSize: '0.95rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-full)'
          }}
        >
          <Zap size={16} />
          Optimize a Prompt
          <ArrowRight size={16} />
        </button>

        <button
          onClick={onExploreShop}
          className="btn btn-secondary"
          style={{
            padding: '12px 24px',
            fontSize: '0.95rem',
            fontWeight: 600,
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <ShoppingBag size={16} color="var(--blue-light)" />
          Explore Digital Store
        </button>
      </div>

      {/* Clean Feature Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        fontSize: '0.825rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
          <span>STAR, RTF & CoT Frameworks</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue-light)' }}></span>
          <span>Multi-Model Calibration</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--red-light)' }}></span>
          <span>Instant Copy & Export</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
