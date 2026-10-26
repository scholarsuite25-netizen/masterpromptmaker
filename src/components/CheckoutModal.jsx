import React, { useState } from 'react';
import { 
  X, MessageSquare, Copy, Check, ShieldCheck, CreditCard, 
  Building2, ExternalLink, Key, Download, CheckCircle2, 
  AlertCircle, Sparkles, BookOpen, Lock, Unlock, Wallet 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BANK_ACCOUNTS, generateOrderSecurity, verifyOrderUnlock } from '../utils/orderSecurity';

export function CheckoutModal({ items, currency, onClose, onClearCart, onUnlockSuccess, onNotify }) {
  const [selectedBankKey, setSelectedBankKey] = useState('opay');
  const [copiedBank, setCopiedBank] = useState(false);
  const [orderRef] = useState(() => "PO-" + Math.floor(100000 + Math.random() * 900000));
  
  // Verification State
  const [unlockCodeInput, setUnlockCodeInput] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [verifyError, setVerifyError] = useState("");

  const selectedBank = BANK_ACCOUNTS[selectedBankKey];
  const totalNGN = items.reduce((sum, item) => sum + item.priceNGN * (item.quantity || 1), 0);
  const totalUSD = items.reduce((sum, item) => sum + item.priceUSD * (item.quantity || 1), 0);

  const displayTotal = currency === 'NGN' 
    ? `₦${totalNGN.toLocaleString()}` 
    : `$${totalUSD.toFixed(2)}`;

  const whatsAppPhone = "2348034710699";
  const expectedUnlockCode = generateOrderSecurity(orderRef);

  const handleCopyBank = () => {
    navigator.clipboard.writeText(selectedBank.accountNumber);
    setCopiedBank(true);
    onNotify(`${selectedBank.bankName} Account (${selectedBank.accountNumber}) copied!`, "success");
    setTimeout(() => setCopiedBank(false), 2500);
  };

  const handleLaunchWhatsApp = () => {
    let message = `*NEW ORDER - MASTER PROMPT STUDIO*\n`;
    message += `🧾 *Order Ref:* #${orderRef}\n`;
    message += `📅 *Date:* ${new Date().toLocaleDateString()}\n\n`;
    message += `📦 *Items Ordered:*\n`;
    
    items.forEach((item, idx) => {
      const itemPrice = currency === 'NGN' 
        ? `₦${(item.priceNGN * (item.quantity || 1)).toLocaleString()}` 
        : `$${(item.priceUSD * (item.quantity || 1)).toFixed(2)}`;
      message += `${idx + 1}. ${item.title} (Qty: ${item.quantity || 1}) - ${itemPrice}\n`;
    });

    message += `\n💰 *Total Amount:* ₦${totalNGN.toLocaleString()} (or $${totalUSD.toFixed(2)})\n`;
    message += `🏦 *Payment Sent To:* ${selectedBank.bankName}\n`;
    message += `💳 *Account Number:* ${selectedBank.accountNumber}\n`;
    message += `👤 *Account Name:* ${selectedBank.accountName}\n\n`;
    message += `I have made the transfer and attached my payment receipt/screenshot above. Please confirm my payment and send my unlock code!\n\n`;
    message += `------------------------------------------\n`;
    message += `🔐 *FOR SAMUEL OMOTOSO ONLY (AFTER VERIFYING PAYMENT):*\n`;
    message += `Customer Unlock Code: *${expectedUnlockCode}*\n`;
    message += `(Reply to the customer with this code to grant instant access)\n`;
    message += `------------------------------------------`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsAppPhone}?text=${encoded}`;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#25d366', '#3b82f6', '#ef4444']
    });

    onNotify("Opening WhatsApp to notify Samuel Omotoso...", "success");
    window.open(whatsappUrl, '_blank');
  };

  const handleVerifyCode = (e) => {
    e?.preventDefault();
    setVerifyError("");

    if (!unlockCodeInput.trim()) {
      setVerifyError("Please enter the unlock code you received from Samuel Omotoso on WhatsApp.");
      return;
    }

    const isValid = verifyOrderUnlock(orderRef, unlockCodeInput);
    if (isValid) {
      setIsUnlocked(true);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#ef4444', '#f59e0b']
      });
      onNotify("Payment verified! Your products are unlocked and ready to download.", "success");
      if (onUnlockSuccess) {
        onUnlockSuccess(items);
      }
    } else {
      setVerifyError("Invalid unlock code for this specific order. Please verify the code sent by Samuel on WhatsApp.");
      onNotify("Verification failed. Check your unlock code.", "red");
    }
  };

  const handleDownloadAsset = (item) => {
    const filename = `${item.id}-FULL-EDITION.md`;
    let content = `# ${item.title}\n`;
    content += `Type: ${item.type.toUpperCase()}\n`;
    content += `License: Single User Authorized License (Order #${orderRef})\n`;
    content += `Verified by: Samuel Omotoso (OPAY / GTB)\n`;
    content += `Date: ${new Date().toISOString()}\n\n`;
    content += `---\n\n`;
    content += `## Full Product Deliverables\n\n`;
    content += `${item.description}\n\n`;
    content += `### Table of Contents & Modules Included:\n`;
    item.features.forEach((f, idx) => {
      content += `${idx + 1}. ${f}\n`;
    });
    content += `\n### Primary Core Asset Content:\n\n`;
    content += `${item.sampleExcerpt?.content || "Full digital asset archive."}\n\n`;
    content += `\n---\nThank you for purchasing from Master Prompt Studio! Lifetime support at +2348034710699`;

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    onNotify(`Downloaded full edition of "${item.title}"!`, "success");
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1100,
      background: 'rgba(7, 9, 14, 0.88)',
      backdropFilter: 'blur(14px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '720px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${isUnlocked ? '#10b981' : 'var(--border-red)'}`,
        boxShadow: isUnlocked ? '0 0 35px rgba(16, 185, 129, 0.3)' : 'var(--shadow-glow-dual)',
        padding: 'clamp(14px, 4vw, 28px)',
        position: 'relative',
        background: 'var(--bg-surface)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn btn-secondary"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '8px',
            borderRadius: '50%'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: isUnlocked ? '#10b981' : 'var(--gradient-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: isUnlocked ? '0 0 20px rgba(16, 185, 129, 0.5)' : 'none'
          }}>
            {isUnlocked ? <Unlock size={22} /> : <Lock size={20} />}
          </div>
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>
              {isUnlocked ? "Order Confirmed & Products Unlocked!" : "Checkout & Payment Confirmation"}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Order Ref: <strong style={{ color: 'var(--blue-light)' }}>#{orderRef}</strong>
              </span>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '6px',
                background: isUnlocked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: isUnlocked ? '#34d399' : 'var(--red-light)',
                border: `1px solid ${isUnlocked ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-red)'}`
              }}>
                {isUnlocked ? "Status: VERIFIED & DELIVERED" : "Status: AWAITING PAYMENT"}
              </span>
            </div>
          </div>
        </div>

        {/* IF NOT UNLOCKED: Show Bank Selection & Transfer Details */}
        {!isUnlocked ? (
          <>
            {/* Step 1: Select Bank Gateway (OPAY vs GTB) */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Select Preferred Payment Gateway:
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {Object.values(BANK_ACCOUNTS).map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBankKey(b.id)}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      background: selectedBankKey === b.id ? b.bgSubtle : 'var(--bg-surface-elevated)',
                      border: `1.5px solid ${selectedBankKey === b.id ? b.tagColor : 'var(--border-subtle)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: selectedBankKey === b.id ? `0 0 16px ${b.bgSubtle}` : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {b.id === 'opay' ? <Wallet size={16} color={b.textColor} /> : <Building2 size={16} color={b.textColor} />}
                        <span style={{ fontWeight: 800, fontSize: '0.95rem', color: selectedBankKey === b.id ? b.textColor : 'var(--text-primary)' }}>
                          {b.bankName}
                        </span>
                      </div>
                      {selectedBankKey === b.id && <CheckCircle2 size={16} color={b.tagColor} />}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {b.badge}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Bank Card */}
            <div style={{
              background: selectedBank.bgSubtle,
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${selectedBank.border}`,
              padding: '18px',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: selectedBank.textColor, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {selectedBank.bankName} Transfer Details
                </span>
                <span className="badge badge-free" style={{ fontSize: '0.7rem' }}>
                  Fast Confirmation
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Bank Name</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {selectedBank.bankName}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Account Name</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {selectedBank.accountName}
                  </div>
                </div>
              </div>

              {/* Account Number Box */}
              <div style={{
                background: 'var(--bg-base)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Account Number ({selectedBank.bankName})
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: selectedBank.textColor,
                    letterSpacing: '0.08em'
                  }}>
                    {selectedBank.accountNumber}
                  </div>
                </div>

                <button
                  onClick={handleCopyBank}
                  className="btn"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.85rem',
                    background: selectedBank.tagColor,
                    color: '#fff'
                  }}
                >
                  {copiedBank ? <Check size={16} /> : <Copy size={16} />}
                  {copiedBank ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Order Items & Total */}
            <div style={{
              background: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Amount to Pay:</span>
                  <div className="gradient-text-red-blue" style={{ fontSize: '1.3rem', fontWeight: 800 }}>
                    {displayTotal}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {items.length} item{items.length > 1 ? 's' : ''} in order
                </div>
              </div>
            </div>

            {/* Action 1: Notify Samuel Omotoso via WhatsApp */}
            <button
              onClick={handleLaunchWhatsApp}
              className="btn btn-whatsapp"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '1.025rem',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px'
              }}
            >
              <MessageSquare size={20} />
              1. I Have Paid — Notify Samuel on WhatsApp (+2348034710699)
              <ExternalLink size={16} />
            </button>

            {/* Step 2: Enter Order-Bound Unlock Code */}
            <div style={{
              background: 'var(--bg-surface-elevated)',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              border: '1px solid var(--border-blue)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Key size={18} color="var(--blue-light)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  2. Enter Your Single-Use Unlock Code
                </h4>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
                After verifying your payment receipt, Samuel will reply to you on WhatsApp with your unique unlock code (e.g., <code>SO-XXXX</code>). Paste it below to unlock your downloads:
              </p>

              <form onSubmit={handleVerifyCode} style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="e.g. SO-8492"
                  value={unlockCodeInput}
                  onChange={(e) => {
                    setUnlockCodeInput(e.target.value);
                    setVerifyError("");
                  }}
                  className="input-field"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    borderColor: verifyError ? 'var(--red-primary)' : 'var(--border-subtle)'
                  }}
                />

                <button
                  type="submit"
                  className="btn btn-blue"
                  style={{ padding: '0 20px', fontSize: '0.9rem', fontWeight: 700 }}
                >
                  Verify & Unlock Access
                </button>
              </form>

              {verifyError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--red-light)', fontSize: '0.8rem', marginTop: '8px' }}>
                  <AlertCircle size={14} />
                  <span>{verifyError}</span>
                </div>
              )}
            </div>
          </>
        ) : (
          /* IF UNLOCKED: Show Instant Downloads & Library Confirmation */
          <div>
            <div style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              marginBottom: '24px',
              textAlign: 'center'
            }}>
              <CheckCircle2 size={44} color="#10b981" style={{ margin: '0 auto 10px auto' }} />
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Payment Successfully Verified!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto' }}>
                Samuel Omotoso has confirmed your order. Your purchased digital products are ready for immediate lifetime download and have been added to your <strong>My Library</strong>.
              </p>
            </div>

            {/* Unlocked Products Download List */}
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Your Unlocked Digital Downloads:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-blue)',
                    borderRadius: 'var(--radius-md)',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span className="badge badge-free" style={{ fontSize: '0.65rem' }}>
                        UNLOCKED
                      </span>
                      <span className="badge badge-blue" style={{ fontSize: '0.65rem' }}>
                        {item.type === 'ebook' ? 'Full PDF eBook' : 'Complete Vault'}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {item.pages || "Digital Archive"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleDownloadAsset(item)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.85rem', padding: '10px 16px' }}
                  >
                    <Download size={16} />
                    Download Full Edition
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={onClose}
                className="btn btn-secondary"
                style={{ padding: '10px 20px', fontSize: '0.9rem' }}
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
