import React from 'react';
import { X, ShieldCheck, FileText, Lock, RefreshCw, CheckCircle2 } from 'lucide-react';

export function LegalModal({ type, isOpen, onClose }) {
  if (!isOpen || !type) return null;

  const contentMap = {
    terms: {
      title: "Terms of Service",
      subtitle: "Master Prompt Studio • Last updated: October 2026",
      badge: "LEGAL AGREEMENT",
      body: (
        <div>
          <h4>1. Acceptance of Terms</h4>
          <p>
            By accessing or utilizing Master Prompt Studio (the "Platform"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not use the platform.
          </p>

          <h4>2. Intellectual Property & Commercial License</h4>
          <p>
            All prompts engineered, transformed, or generated using the Master Prompt Studio workbench and 30-mode Content Factory are 100% royalty-free and owned entirely by you. You have full commercial rights to use, publish, resell, or distribute the prompts and their resulting AI outputs without attribution.
          </p>

          <h4>3. Digital Shop Assets & Unlocking</h4>
          <p>
            Digital products purchased through our store (eBooks, Prompt Vaults, and System Architectures) grant a lifetime, single-creator commercial license. Distribution of raw source archives to unauthorized third parties without permission is prohibited.
          </p>

          <h4>4. AI Inference Disclaimers</h4>
          <p>
            Master Prompt Studio interfaces with high-performance foundation models (including Groq-hosted LLaMA 3.3 70B and DeepSeek R1). While our cognitive engineering frameworks achieve state-of-the-art yields, all AI outputs should be verified for factual precision in mission-critical applications.
          </p>

          <h4>5. Keynote & Advisory Engagements</h4>
          <p>
            Keynote speaking and corporate AI advisory requests submitted to Samuel B. Omotoso are subject to scheduling availability and formal contractual execution prior to event dates.
          </p>
        </div>
      )
    },
    privacy: {
      title: "Privacy & Data Sovereignty Policy",
      subtitle: "GDPR & NDPR Compliant Architecture • Zero Data Mining",
      badge: "DATA PRIVACY",
      body: (
        <div>
          <h4>1. Zero-Telemetry Prompt Engineering</h4>
          <p>
            Your prompts belong strictly to you. Master Prompt Studio operates primarily on local cognitive heuristics in your browser. When live Groq AI inference is enabled, prompts are processed ephemerally in volatile memory and are <strong>never used to train public foundation models</strong>.
          </p>

          <h4>2. Cloud Storage via Supabase</h4>
          <p>
            If you opt to sync your prompts or purchase digital products, your email and saved prompt records are stored in encrypted PostgreSQL tables managed by Supabase, protected by Row-Level Security (RLS) policies. You retain the right to export or delete your stored data at any time.
          </p>

          <h4>3. No Third-Party Tracking or Ads</h4>
          <p>
            We do not sell, rent, or monetize your personal information or prompt history with third-party advertising networks. We do not use third-party tracking pixels or behavioral profiling cookies.
          </p>

          <h4>4. Contact for Data Subject Inquiries</h4>
          <p>
            To request full data deletion or privacy inquiries, contact Samuel B. Omotoso directly via email at tintoldigitalservices@gmail.com or via official WhatsApp (+2348034710699).
          </p>
        </div>
      )
    },
    refund: {
      title: "Refund & Delivery Policy",
      subtitle: "Instant Digital Delivery & Purchase Protection",
      badge: "PURCHASE GUARANTEE",
      body: (
        <div>
          <h4>1. Instant Digital Fulfillment</h4>
          <p>
            All digital products (Prompt Vaults, Guides, and Executive eBooks) are delivered immediately in your browser upon verification of your order unlock code. Additionally, your assets are permanently archived in your personal <strong>My Library</strong> tab.
          </p>

          <h4>2. Bank Transfer Verification Guarantee</h4>
          <p>
            When completing checkout via OPAY (9062334005) or Guaranty Trust Bank (0123797682), orders are logged into our verified database with a cryptographic order reference (e.g. <code>PO-XXXXXX</code>). Once payment is received, your unlock code is transmitted automatically via email and WhatsApp within minutes.
          </p>

          <h4>3. 7-Day Satisfaction & Dispute Resolution</h4>
          <p>
            Because digital deliverables cannot be physically returned once downloaded, refunds are assessed on a case-by-case basis. If you experience technical defects or corrupt archives that our team cannot resolve within 48 hours, you are entitled to a full replacement or refund.
          </p>

          <h4>4. Dedicated Support</h4>
          <p>
            For any billing or transaction inquiries, Samuel Omotoso provides direct creator-level support via WhatsApp at +2348034710699.
          </p>
        </div>
      )
    }
  };

  const activeDoc = contentMap[type] || contentMap.terms;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1300,
      background: 'rgba(5, 7, 12, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '680px',
        width: '100%',
        maxHeight: '88vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-blue)',
        boxShadow: 'var(--shadow-glow-blue)',
        padding: 'clamp(18px, 4vw, 32px)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              padding: '3px 8px',
              borderRadius: '4px',
              background: 'rgba(59, 130, 246, 0.15)',
              color: 'var(--blue-light)',
              border: '1px solid var(--border-blue)',
              display: 'inline-block',
              marginBottom: '8px'
            }}>
              {activeDoc.badge}
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
              {activeDoc.title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              {activeDoc.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="btn btn-secondary"
            style={{ padding: '8px', borderRadius: '50%' }}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)'
        }}>
          {activeDoc.body}
        </div>

        {/* Close Button */}
        <div style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onClose}
            className="btn btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.88rem' }}
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
