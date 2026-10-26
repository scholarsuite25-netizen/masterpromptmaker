import React, { useState } from 'react';
import { 
  Send, MessageSquare, CheckCircle2, Calendar, MapPin, 
  Users, Award, Building2, Sparkles, Check, Phone, Mail, ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function SpeakingInquiry({ onNotify }) {
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [engagementFormat, setEngagementFormat] = useState("Keynote Address");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [audienceSize, setAudienceSize] = useState("");
  const [themeContext, setThemeContext] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  const whatsAppNumber = "2348034710699";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim() || !organization.trim() || !email.trim()) {
      onNotify("Please fill in your Name, Organization, and Email!", "red");
      return;
    }

    const ref = "SPK-" + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);

    // Build structured WhatsApp inquiry
    let message = `*KEYNOTE SPEAKING INQUIRY - S. B. OMOTOSO*\n`;
    message += `📋 *Booking Ref:* #${ref}\n\n`;
    message += `👤 *Client Name:* ${fullName}\n`;
    message += `🏢 *Organization:* ${organization}\n`;
    message += `✉️ *Email:* ${email}\n`;
    message += `📞 *Phone/WhatsApp:* ${phone || "Not provided"}\n\n`;
    message += `🎙️ *Engagement Format:* ${engagementFormat}\n`;
    message += `📅 *Target Date:* ${eventDate || "TBD"}\n`;
    message += `📍 *Location:* ${location || "TBD"}\n`;
    message += `👥 *Estimated Audience:* ${audienceSize || "TBD"}\n\n`;
    message += `🎯 *Event Theme & Objectives:*\n${themeContext || "Discuss strategic keynote topic."}\n\n`;
    message += `Please confirm availability for expedited scheduling!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsAppNumber}?text=${encoded}`;

    confetti({
      particleCount: 60,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#0284c7', '#3b82f6', '#ef4444', '#10b981']
    });

    setSubmitted(true);
    onNotify("Speaking inquiry generated! Connecting with S. B. Omotoso...", "success");
    window.open(whatsappUrl, '_blank');
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName("");
    setOrganization("");
    setEmail("");
    setPhone("");
    setEventDate("");
    setLocation("");
    setAudienceSize("");
    setThemeContext("");
  };

  return (
    <section id="speaking-inquiry" style={{ marginBottom: '80px' }}>
      {/* Speaker Showcase Profile */}
      <div className="glass-panel" style={{
        padding: 'clamp(16px, 4vw, 32px)',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
        border: '1px solid var(--border-blue)'
      }}>
        <div className="responsive-two-col" style={{ alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--blue-subtle)',
              border: '1px solid var(--border-blue)',
              marginBottom: '10px'
            }}>
              <Award size={14} color="var(--blue-light)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--blue-light)', textTransform: 'uppercase' }}>
                Keynote Speaker & Institutional Strategist
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', fontWeight: 800, marginBottom: '8px' }}>
              S. B. <span className="gradient-text-red-blue">Omotoso</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
              University administrator, orator, and digital transformation strategist delivering transformative convocation lectures, leadership retreats, and keynotes across tertiary institutions and corporate summits.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>40+ Keynote & Convocation Lectures</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>WhatsApp: +2348034710699</span>
              </div>
            </div>
          </div>

          {/* Keynote Signature Topics Card */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            border: '1px solid var(--border-subtle)'
          }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--red-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px', fontWeight: 800 }}>
              Signature Keynote Themes:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Sparkles size={16} color="var(--blue-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>The Algorithmic Era:</strong> Human conviction, ethics, and leadership in an AI-driven society.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Sparkles size={16} color="var(--blue-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Autonomous Digital Factories:</strong> Scaling institutional output and digital revenue pipelines.</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <Sparkles size={16} color="var(--blue-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Institutional Excellence:</strong> Governance, strategic foresight, and sustainable administration.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Inquiry Form Container (Matches Reference Screenshot Exactly) */}
      <div className="glass-panel" style={{
        maxWidth: '820px',
        margin: '0 auto',
        padding: 'clamp(18px, 4vw, 36px)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-glass)',
        boxShadow: 'var(--shadow-lg)',
        background: 'var(--bg-surface)'
      }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            fontSize: '0.825rem',
            fontWeight: 800,
            color: '#0284c7',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '6px'
          }}>
            DIRECT SPEAKING INQUIRY
          </div>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Invite S. B. Omotoso to Speak
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem' }}>
            Submit your event details below or connect immediately via WhatsApp for expedited scheduling.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="form-vertical-mobile">
            {/* Row 1: Full Name & Organization */}
            <div className="form-row-mobile">
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  YOUR FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chief Funke Adeleke"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.95rem', padding: '12px 14px', width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  ORGANIZATION / INSTITUTION *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nigerian Institute of Management"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.95rem', padding: '12px 14px', width: '100%' }}
                />
              </div>
            </div>

            {/* Row 2: Corporate Email & Phone/WhatsApp */}
            <div className="form-row-mobile">
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  CORPORATE EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. adeleke@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.95rem', padding: '12px 14px', width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  PHONE / WHATSAPP NUMBER
                </label>
                <input
                  type="text"
                  placeholder="e.g. +234 803 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.95rem', padding: '12px 14px', width: '100%' }}
                />
              </div>
            </div>

            {/* Row 3: Engagement Format, Date, Location */}
            <div className="form-row-three-mobile">
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  ENGAGEMENT FORMAT
                </label>
                <select
                  value={engagementFormat}
                  onChange={(e) => setEngagementFormat(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.95rem', padding: '12px 14px', width: '100%' }}
                >
                  <option value="Keynote Address" style={{ background: '#0f172a', color: '#fff' }}>Keynote Address</option>
                  <option value="Convocation Lecture" style={{ background: '#0f172a', color: '#fff' }}>Convocation Lecture</option>
                  <option value="Executive Leadership Workshop" style={{ background: '#0f172a', color: '#fff' }}>Executive Leadership Workshop</option>
                  <option value="Panel Discussion / Fireside Chat" style={{ background: '#0f172a', color: '#fff' }}>Panel Discussion / Fireside Chat</option>
                  <option value="Institutional Policy Address" style={{ background: '#0f172a', color: '#fff' }}>Institutional Policy Address</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  EVENT DATE / TARGET MONTH
                </label>
                <input
                  type="text"
                  placeholder="e.g. Nov 14, 2026 or Q4 2026"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.95rem', padding: '12px 14px', width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  LOCATION / CITY (OR VIRTUAL)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lagos, Abuja, London, or Virtual"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input-field"
                  style={{ fontSize: '0.95rem', padding: '12px 14px', width: '100%' }}
                />
              </div>
            </div>

            {/* Row 4: Audience Size */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                ESTIMATED IN-PERSON / VIRTUAL AUDIENCE
              </label>
              <input
                type="text"
                placeholder="e.g. 500 – 1,000 attendees"
                value={audienceSize}
                onChange={(e) => setAudienceSize(e.target.value)}
                className="input-field"
                style={{ fontSize: '0.9rem', padding: '12px 14px', width: '100%' }}
              />
            </div>

            {/* Row 5: Theme & Objectives Textarea */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
                EVENT THEME, CONTEXT & AUDIENCE OBJECTIVES
              </label>
              <textarea
                rows={4}
                placeholder="Please describe the purpose of your event, keynote expectations, and any specific themes or lecture material companion packs you would like to distribute to attendees..."
                value={themeContext}
                onChange={(e) => setThemeContext(e.target.value)}
                className="textarea-field"
                style={{ fontSize: '0.9rem', padding: '14px', minHeight: '110px' }}
              />
            </div>

            {/* Submit Button matching blue pill from screenshot */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                background: '#0284c7',
                border: 'none',
                boxShadow: '0 4px 18px rgba(2, 132, 199, 0.4)'
              }}
            >
              <Send size={18} />
              Submit Keynote & Speaking Inquiry
            </button>
          </form>
        ) : (
          /* Confirmation State */
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            <CheckCircle2 size={54} color="#10b981" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
              Speaking Inquiry Dispatched!
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto 16px auto', lineHeight: 1.6 }}>
              Thank you, <strong>{fullName}</strong>. Your speaking brief for <strong>{organization}</strong> has been logged under Booking Reference <strong style={{ color: 'var(--blue-light)' }}>#{bookingRef}</strong> and routed directly to S. B. Omotoso's executive WhatsApp.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${whatsAppNumber}?text=Hello%20S.%20B.%20Omotoso!%20Following%20up%20on%20my%20Speaking%20Inquiry%20%23${bookingRef}%20for%20${encodeURIComponent(organization)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
              >
                <MessageSquare size={18} />
                Follow-up on WhatsApp (+2348034710699)
              </a>

              <button
                onClick={handleReset}
                className="btn btn-secondary"
                style={{ padding: '12px 20px', fontSize: '0.95rem' }}
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
