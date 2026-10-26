import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, Lock, Unlock, CheckCircle2, Clock, 
  Mail, MessageSquare, ExternalLink, RefreshCw, Key, UserCheck, AlertCircle, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { fetchAllOrders, verifyOrderAndNotify, fetchSpeakingInquiries, isSupabaseConfigured } from '../utils/supabase';
import { sendOrderReceiptEmail } from '../utils/emailService';

export function AdminDrawer({ isOpen, onClose, onNotify }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('so_admin_authenticated') === 'true';
  });
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'inquiries'

  // Data states
  const [orders, setOrders] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingRef, setProcessingRef] = useState(null);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadAdminData();
    }
  }, [isOpen, isAuthenticated]);

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, inquiriesRes] = await Promise.all([
        fetchAllOrders(),
        fetchSpeakingInquiries()
      ]);

      if (ordersRes.success) {
        setOrders(ordersRes.orders);
      }
      if (inquiriesRes.success) {
        setInquiries(inquiriesRes.inquiries);
      }
    } catch (err) {
      console.error('[Admin] Error loading data:', err);
      onNotify('Could not load cloud admin records', 'red');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthenticate = (e) => {
    e.preventDefault();
    // Default passkey for S. B. Omotoso
    if (passkeyInput.trim() === 'admin2026' || passkeyInput.trim().toLowerCase() === 'omotoso2026') {
      setIsAuthenticated(true);
      localStorage.setItem('so_admin_authenticated', 'true');
      setPasskeyError('');
      onNotify('Authenticated as Samuel Omotoso (Admin)', 'success');
      loadAdminData();
    } else {
      setPasskeyError('Invalid admin passkey. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('so_admin_authenticated');
    onNotify('Logged out from admin console', 'blue');
  };

  const handleApproveOrder = async (order) => {
    setProcessingRef(order.order_ref);
    try {
      // 1. Mark verified in Supabase Cloud
      const verifyRes = await verifyOrderAndNotify(order.order_ref);
      
      // 2. Dispatch email receipt with unlock code via Resend
      const emailRes = await sendOrderReceiptEmail({
        customerEmail: order.customer_email,
        customerName: order.customer_name || 'Valued Creator',
        orderRef: order.order_ref,
        unlockCode: order.unlock_code,
        items: order.items || [],
        totalNGN: order.total_amount_ngn,
        totalUSD: order.total_amount_usd,
        currency: order.currency
      });

      // Update local state
      setOrders(prev => prev.map(o => {
        if (o.order_ref === order.order_ref) {
          return { ...o, status: 'verified', verified_at: new Date().toISOString() };
        }
        return o;
      }));

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#3b82f6', '#f59e0b']
      });

      onNotify(`Order #${order.order_ref} verified and unlock code emailed to ${order.customer_email}!`, 'success');
    } catch (err) {
      console.error('[Admin] Approval error:', err);
      onNotify(`Error approving order: ${err.message}`, 'red');
    } finally {
      setProcessingRef(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1200,
      background: 'rgba(5, 7, 12, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      justifyContent: 'flex-end',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '560px',
        height: '100%',
        background: 'var(--bg-surface)',
        borderLeft: '1px solid var(--border-glass)',
        boxShadow: '-10px 0 35px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-surface-elevated)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.15)',
              color: 'var(--red-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Admin Console
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                Samuel B. Omotoso • Master Prompt Studio
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
                style={{ fontSize: '0.75rem', padding: '5px 10px' }}
              >
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '6px', borderRadius: '50%' }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {!isAuthenticated ? (
            <div style={{ maxWidth: '380px', margin: '40px auto 0 auto', textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(59, 130, 246, 0.12)',
                color: 'var(--blue-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '1px solid var(--border-blue)'
              }}>
                <Lock size={28} />
              </div>

              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>
                Samuel Omotoso Access Only
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Enter your administrative passkey to verify incoming OPAY & GTB bank transfers and review speaking requests.
              </p>

              <form onSubmit={handleAuthenticate}>
                <div style={{ marginBottom: '16px' }}>
                  <input
                    type="password"
                    placeholder="Enter Admin Passkey"
                    value={passkeyInput}
                    onChange={(e) => setPasskeyInput(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-glass)',
                      color: 'var(--text-primary)',
                      fontSize: '0.95rem',
                      textAlign: 'center',
                      letterSpacing: '2px'
                    }}
                    autoFocus
                  />
                  {passkeyError && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--red-light)', marginTop: '8px' }}>
                      {passkeyError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
                >
                  <Unlock size={16} /> Unlock Console
                </button>
              </form>
            </div>
          ) : (
            <div>
              {/* Tab Navigation */}
              <div style={{
                display: 'flex',
                gap: '8px',
                background: 'var(--bg-surface-elevated)',
                padding: '4px',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '1px solid var(--border-subtle)'
              }}>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="btn"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    borderRadius: '6px',
                    background: activeTab === 'orders' ? 'var(--blue-primary)' : 'transparent',
                    color: activeTab === 'orders' ? '#fff' : 'var(--text-secondary)'
                  }}
                >
                  Bank Orders ({orders.filter(o => o.status === 'pending').length} Pending)
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="btn"
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    borderRadius: '6px',
                    background: activeTab === 'inquiries' ? 'var(--blue-primary)' : 'transparent',
                    color: activeTab === 'inquiries' ? '#fff' : 'var(--text-secondary)'
                  }}
                >
                  Speaking Inquiries ({inquiries.length})
                </button>
              </div>

              {/* Refresh Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <button
                  onClick={loadAdminData}
                  disabled={isLoading}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  <RefreshCw size={13} className={isLoading ? 'spin-icon' : ''} />
                  Refresh Cloud Data
                </button>
              </div>

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                      <p>No orders recorded yet.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {orders.map((order) => {
                        const isPending = order.status === 'pending';
                        return (
                          <div
                            key={order.order_ref || order.id}
                            className="glass-panel"
                            style={{
                              padding: '16px',
                              border: isPending ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-subtle)'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                              <div>
                                <span style={{
                                  fontSize: '0.7rem',
                                  fontWeight: 800,
                                  textTransform: 'uppercase',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  background: isPending ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                                  color: isPending ? '#f59e0b' : '#10b981',
                                  border: isPending ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)'
                                }}>
                                  {isPending ? 'Pending Bank Review' : 'Verified & Sent'}
                                </span>
                                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: '6px 0 2px 0' }}>
                                  Order #{order.order_ref}
                                </h4>
                              </div>

                              <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--blue-light)' }}>
                                  {order.currency === 'USD' ? `$${order.total_amount_usd}` : `₦${(order.total_amount_ngn || 0).toLocaleString()}`}
                                </span>
                              </div>
                            </div>

                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                              <div>Customer: <strong>{order.customer_name || 'Creator'}</strong> ({order.customer_email})</div>
                              <div>Unlock Code: <strong style={{ color: '#ffffff', fontFamily: 'monospace' }}>{order.unlock_code}</strong></div>
                              {order.created_at && (
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                                  Placed: {new Date(order.created_at).toLocaleString()}
                                </div>
                              )}
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                              {isPending ? (
                                <button
                                  onClick={() => handleApproveOrder(order)}
                                  disabled={processingRef === order.order_ref}
                                  className="btn btn-primary"
                                  style={{ flex: 1, padding: '8px 12px', fontSize: '0.8rem', background: '#10b981', borderColor: '#059669' }}
                                >
                                  <CheckCircle2 size={14} />
                                  {processingRef === order.order_ref ? 'Approving & Sending...' : 'Approve & Email Unlock Code'}
                                </button>
                              ) : (
                                <span style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <CheckCircle2 size={14} /> Order Activated
                                </span>
                              )}

                              <a
                                href={`mailto:${order.customer_email}?subject=Master Prompt Studio Order #${order.order_ref}`}
                                className="btn btn-secondary"
                                style={{ padding: '8px 10px', fontSize: '0.8rem' }}
                                title="Email Customer"
                              >
                                <Mail size={14} />
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Speaking Inquiries Tab */}
              {activeTab === 'inquiries' && (
                <div>
                  {inquiries.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                      <p>No speaking inquiries received yet.</p>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {inquiries.map((inq) => (
                        <div key={inq.id} className="glass-panel" style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                              {inq.client_name}
                            </h4>
                            <span style={{ fontSize: '0.75rem', color: 'var(--blue-light)', fontWeight: 600 }}>
                              {inq.organization || 'Independent'}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                            <div>Event: <strong>{inq.event_type || 'Keynote'}</strong> • Date: <strong>{inq.preferred_date || 'Flexible'}</strong></div>
                            <div>Audience: <strong>{inq.estimated_audience || 'Not specified'}</strong></div>
                            <div>Topic: <strong>{inq.topic || 'AI & Creative Intelligence'}</strong></div>
                            {inq.additional_notes && (
                              <div style={{
                                marginTop: '8px',
                                padding: '8px 12px',
                                background: 'var(--bg-input)',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                color: 'var(--text-muted)',
                                fontStyle: 'italic'
                              }}>
                                "{inq.additional_notes}"
                              </div>
                            )}
                          </div>

                          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                            <a
                              href={`mailto:${inq.client_email}?subject=Re: Keynote Speaker Booking - Samuel B. Omotoso`}
                              className="btn btn-primary"
                              style={{ flex: 1, padding: '7px 12px', fontSize: '0.8rem' }}
                            >
                              <Mail size={14} /> Reply via Email
                            </a>

                            <a
                              href={`https://wa.me/2348034710699?text=${encodeURIComponent(`Hello Samuel, following up on speaking request from ${inq.client_name} (${inq.organization}) for ${inq.topic}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-secondary"
                              style={{ padding: '7px 12px', fontSize: '0.8rem' }}
                            >
                              <MessageSquare size={14} color="#10b981" /> WhatsApp Log
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
