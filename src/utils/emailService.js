// Resend Transactional Email & Messaging Service
// Sends order receipts, unlock tokens, and speaker booking alerts

const RESEND_API_URL = 'https://api.resend.com/emails';

export function isResendConfigured() {
  const envKey = import.meta.env.VITE_RESEND_API_KEY;
  return Boolean(envKey && envKey.startsWith('re_'));
}

/**
 * Dispatch digital store purchase receipt & unlock code to customer
 */
export async function sendOrderReceiptEmail({
  customerEmail,
  customerName = 'Valued Creator',
  orderRef,
  unlockCode,
  items = [],
  totalNGN = 0,
  totalUSD = 0,
  currency = 'NGN'
}) {
  const formattedTotal = currency === 'NGN' ? `₦${totalNGN.toLocaleString()}` : `$${totalUSD.toFixed(2)}`;
  const apiKey = import.meta.env.VITE_RESEND_API_KEY;

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0b0f19; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #60a5fa; font-size: 24px; margin: 0;">Master Prompt Studio</h1>
        <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Digital Store Purchase Confirmation</p>
      </div>

      <p style="font-size: 16px;">Hello ${customerName || 'there'},</p>
      <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">
        Thank you for your order! Your digital products have been prepared. Use your personal single-use Unlock Code below to activate your instant download access.
      </p>

      <div style="background: rgba(59, 130, 246, 0.1); border: 2px dashed #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #93c5fd; margin-bottom: 8px;">Your Verified Unlock Code</div>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #ffffff; font-family: monospace;">${unlockCode}</div>
        <div style="font-size: 12px; color: #94a3b8; margin-top: 8px;">Order Ref: #${orderRef} • Total: ${formattedTotal}</div>
      </div>

      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; margin-top: 24px;">
        <h3 style="font-size: 14px; text-transform: uppercase; color: #94a3b8; margin-bottom: 12px;">Items in this order:</h3>
        <ul style="list-style: none; padding: 0; margin: 0;">
          ${items.map(item => `
            <li style="padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between; font-size: 14px;">
              <span style="color: #e2e8f0;">${item.title}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div style="text-align: center; margin-top: 32px; font-size: 12px; color: #64748b;">
        <p>Master Prompt Studio by S. B. Omotoso</p>
        <p>If you have any questions, reply directly to this email or contact us via WhatsApp.</p>
      </div>
    </div>
  `;

  if (!isResendConfigured()) {
    console.log('[EmailService (Simulation)] Receipt dispatched to:', customerEmail, { orderRef, unlockCode });
    return { success: true, simulated: true };
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Master Prompt Studio <orders@masterpromptstudio.com>',
        to: [customerEmail],
        subject: `Your Unlock Code: #${orderRef} - Master Prompt Studio`,
        html: htmlBody
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.warn('[Resend Email Error]', err);
      return { success: false, error: err };
    }

    return { success: true };
  } catch (error) {
    console.error('[Resend Service Error]', error);
    return { success: false, error: error.message };
  }
}

/**
 * Dispatch Keynote Speaking inquiry to Samuel Omotoso & confirmation to client
 */
export async function sendSpeakerInquiryEmail(inquiry) {
  const apiKey = import.meta.env.VITE_RESEND_API_KEY;

  if (!isResendConfigured()) {
    console.log('[EmailService (Simulation)] Keynote inquiry recorded:', inquiry);
    return { success: true, simulated: true };
  }

  try {
    await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        from: 'Master Prompt Studio <inquiries@masterpromptstudio.com>',
        to: ['samuelomotoso@gmail.com'],
        reply_to: inquiry.email,
        subject: `🎙️ New Keynote Speaking Request: ${inquiry.organization || inquiry.name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Keynote Speaking Booking Inquiry</h2>
            <p><strong>Client Name:</strong> ${inquiry.name}</p>
            <p><strong>Email:</strong> ${inquiry.email}</p>
            <p><strong>Organization:</strong> ${inquiry.organization || 'N/A'}</p>
            <p><strong>Event Type:</strong> ${inquiry.eventType || 'N/A'}</p>
            <p><strong>Preferred Date:</strong> ${inquiry.date || 'Flexible'}</p>
            <p><strong>Audience Size:</strong> ${inquiry.audience || 'N/A'}</p>
            <p><strong>Proposed Topic:</strong> ${inquiry.topic || 'N/A'}</p>
            <p><strong>Message / Scope:</strong><br/>${inquiry.message || 'No additional notes provided.'}</p>
          </div>
        `
      })
    });
    return { success: true };
  } catch (err) {
    console.error('[Resend Inquiry Alert Error]', err);
    return { success: false, error: err.message };
  }
}
