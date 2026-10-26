import React, { useState } from 'react';
import { X, Mail, ShieldCheck, LogOut, CheckCircle2, AlertCircle, Sparkles, User } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../utils/supabase';

export function AuthModal({ isOpen, onClose, user, onNotify }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    if (!isSupabaseConfigured() || !supabase) {
      onNotify("Supabase keys not yet active in this session.", "red");
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error('Google sign in error:', err);
      setErrorMsg(err.message || 'Failed to authenticate with Google.');
      onNotify("Google authentication failed.", "red");
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    if (!isSupabaseConfigured() || !supabase) {
      onNotify("Supabase is not configured.", "red");
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: window.location.origin
        }
      });
      if (error) throw error;
      setMagicLinkSent(true);
      onNotify(`Magic link sent to ${email}! Check your inbox.`, "success");
    } catch (err) {
      console.error('Magic link error:', err);
      setErrorMsg(err.message || 'Failed to send magic login link.');
      onNotify("Could not send magic login link.", "red");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      onNotify("Successfully signed out.", "blue");
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.78)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '440px',
        width: '100%',
        padding: '28px',
        position: 'relative',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-blue)',
        boxShadow: 'var(--shadow-glow-blue)',
        borderRadius: 'var(--radius-lg)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-secondary"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '8px',
            borderRadius: '50%'
          }}
        >
          <X size={16} />
        </button>

        {user ? (
          /* Authenticated User View */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'var(--gradient-brand)',
              margin: '0 auto 16px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
            }}>
              <User size={26} color="#fff" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px' }}>
              Account Synced
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '20px' }}>
              Signed in as <strong style={{ color: 'var(--blue-light)' }}>{user.email}</strong>
            </p>
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '0.8rem',
              color: '#34d399',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ShieldCheck size={16} />
              <span>Your prompt vault and orders sync across all devices.</span>
            </div>
            <button
              onClick={handleSignOut}
              className="btn btn-secondary"
              style={{ width: '100%', padding: '12px', color: 'var(--red-light)', borderColor: 'var(--border-red)' }}
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        ) : (
          /* Sign In / Up View */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--gradient-brand)',
                margin: '0 auto 12px auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={22} color="#fff" />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '4px' }}>
                Sign In to Master Prompt
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
                Sync saved prompts and purchase history across all your devices.
              </p>
            </div>

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="btn"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: '#ffffff',
                color: '#1f2937',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '18px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '16px 0',
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              <span style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              <span>Or Magic Email Link</span>
              <span style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
            </div>

            {magicLinkSent ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
                color: '#34d399'
              }}>
                <CheckCircle2 size={24} style={{ margin: '0 auto 8px auto' }} />
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>Check Your Email!</h4>
                <p style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                  We sent a passwordless login link to <strong>{email}</strong>. Click it to log in immediately.
                </p>
              </div>
            ) : (
              <form onSubmit={handleMagicLink} className="form-vertical-mobile">
                <input
                  type="email"
                  placeholder="your-email@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg('');
                  }}
                  className="input-field"
                  style={{ minHeight: '44px', padding: '10px 14px', fontSize: '0.85rem' }}
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-blue"
                  style={{ minHeight: '44px', width: '100%', fontSize: '0.875rem', fontWeight: 700 }}
                >
                  <Mail size={16} />
                  {loading ? "Sending link..." : "Send Passwordless Link"}
                </button>
              </form>
            )}

            {errorMsg && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--red-light)',
                fontSize: '0.78rem',
                marginTop: '10px'
              }}>
                <AlertCircle size={14} />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
