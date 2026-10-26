import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Building2 } from 'lucide-react';

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
  currency,
  setCurrency
}) {
  if (!isOpen) return null;

  const totalNGN = items.reduce((sum, item) => sum + item.priceNGN * (item.quantity || 1), 0);
  const totalUSD = items.reduce((sum, item) => sum + item.priceUSD * (item.quantity || 1), 0);

  const displayTotal = currency === 'NGN' 
    ? `₦${totalNGN.toLocaleString()}` 
    : `$${totalUSD.toFixed(2)}`;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1050,
      background: 'rgba(7, 9, 14, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: 'var(--bg-surface)',
          borderLeft: '1px solid var(--border-blue)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(16px, 4vw, 24px)',
          position: 'relative',
          borderRadius: 0
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="var(--blue-light)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
              Your Cart ({items.length})
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Currency toggle */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-surface-elevated)',
              padding: '2px',
              borderRadius: '6px',
              border: '1px solid var(--border-subtle)'
            }}>
              <button
                onClick={() => setCurrency('NGN')}
                style={{
                  padding: '3px 8px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  borderRadius: '4px',
                  border: 'none',
                  background: currency === 'NGN' ? 'var(--blue-primary)' : 'transparent',
                  color: currency === 'NGN' ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                NGN ₦
              </button>
              <button
                onClick={() => setCurrency('USD')}
                style={{
                  padding: '3px 8px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  borderRadius: '4px',
                  border: 'none',
                  background: currency === 'USD' ? 'var(--blue-primary)' : 'transparent',
                  color: currency === 'USD' ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                USD $
              </button>
            </div>

            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '6px', borderRadius: '50%' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Cart Item List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {items.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-muted)'
            }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 16px auto', opacity: 0.3 }} />
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: '0.85rem' }}>
                Explore ready-made prompt vaults and eBooks in our shop!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge badge-blue" style={{ fontSize: '0.65rem', marginBottom: '4px' }}>
                      {item.type === 'ebook' ? 'eBook' : 'Prompt Pack'}
                    </span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.3, maxWidth: '240px' }}>
                      {item.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--red-light)',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '6px'
                }}>
                  {/* Quantity Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'var(--bg-base)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                    >
                      <Minus size={13} />
                    </button>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Price */}
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--blue-light)' }}>
                    {currency === 'NGN' 
                      ? `₦${(item.priceNGN * (item.quantity || 1)).toLocaleString()}` 
                      : `$${(item.priceUSD * (item.quantity || 1)).toFixed(2)}`}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Area */}
        {items.length > 0 && (
          <div style={{
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)'
          }}>
            {/* Dual Bank Details Snippet */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid var(--border-blue)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              marginBottom: '14px',
              fontSize: '0.78rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                <span><strong>OPAY:</strong> 8034710699 (Samuel Omotoso)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316' }}></span>
                <span><strong>GTB:</strong> 0029103844</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px'
            }}>
              <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>Total:</span>
              <span className="gradient-text-red-blue" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                {displayTotal}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedCheckout();
              }}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              Proceed to WhatsApp Checkout
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onClearCart}
              style={{
                width: '100%',
                marginTop: '10px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
