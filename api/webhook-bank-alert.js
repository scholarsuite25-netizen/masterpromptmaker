// Vercel Serverless Function: Bank Credit Alert Webhook Listener
// Accepts inbound email/SMS webhooks from OPAY / GTB notifications and unlocks orders automatically

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Send POST.' });
  }

  try {
    const payload = req.body || {};
    // Extract raw text from webhook body (JSON payload, Resend Inbound, or plain text)
    const rawText = typeof payload === 'string' 
      ? payload 
      : payload.text || payload.body || payload.content || payload.subject || JSON.stringify(payload);

    if (!rawText) {
      return res.status(400).json({ error: 'Missing alert text in request payload' });
    }

    // 1. Regex parse order ref & amount
    const orderRefRegex = /\b(PO-\d{6})\b/i;
    const refMatch = rawText.match(orderRefRegex);
    const orderRef = refMatch ? refMatch[1].toUpperCase() : null;

    const amountRegex = /(?:NGN|₦|Amt|Amount|Credit|CR)[:\s]*([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?|[0-9]+(?:\.[0-9]{2})?)/i;
    const amtMatch = rawText.match(amountRegex);
    const amount = amtMatch ? parseFloat(amtMatch[1].replace(/,/g, '')) : null;

    if (!orderRef && !amount) {
      return res.status(200).json({
        status: 'ignored',
        reason: 'No order reference (PO-XXXXXX) or amount detected in text.'
      });
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const resendKey = process.env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase credentials not configured on server' });
    }

    // Import Supabase dynamically
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);

    let query = supabase.from('orders').select('*');
    if (orderRef) {
      query = query.eq('order_ref', orderRef);
    } else if (amount) {
      query = query.eq('status', 'pending').eq('total_amount_ngn', amount).order('created_at', { ascending: false }).limit(1);
    }

    const { data: matchedOrders, error: fetchErr } = await query;
    if (fetchErr || !matchedOrders || matchedOrders.length === 0) {
      return res.status(200).json({
        status: 'unmatched',
        orderRef,
        amount,
        message: 'No pending orders found matching this transaction alert.'
      });
    }

    const order = matchedOrders[0];

    if (order.status === 'verified') {
      return res.status(200).json({
        status: 'already_verified',
        orderRef: order.order_ref
      });
    }

    // Update order status to verified
    await supabase
      .from('orders')
      .update({ status: 'verified', verified_at: new Date().toISOString() })
      .eq('order_ref', order.order_ref);

    // Dispatch unlock receipt email via Resend if configured
    if (resendKey && order.customer_email) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendKey}`
          },
          body: JSON.stringify({
            from: `Master Prompt Studio <${process.env.VITE_EMAIL_FROM || 'onboarding@resend.dev'}>`,
            to: [order.customer_email],
            subject: `Verified Unlock Code: #${order.order_ref} - Master Prompt Studio`,
            html: `
              <div style="font-family: sans-serif; background: #0b0f19; color: #fff; padding: 24px; border-radius: 8px;">
                <h2>Payment Received & Verified!</h2>
                <p>Hello ${order.customer_name || 'there'}, your bank transfer has been automatically reconciled.</p>
                <div style="background: rgba(59,130,246,0.15); border: 2px dashed #3b82f6; padding: 18px; text-align: center; margin: 18px 0;">
                  <div style="font-size: 11px; text-transform: uppercase; color: #93c5fd;">Your Lifetime Single-Use Unlock Code</div>
                  <div style="font-size: 28px; font-weight: bold; font-family: monospace; letter-spacing: 4px; color: #fff;">${order.unlock_code}</div>
                </div>
                <p>Order Ref: #${order.order_ref}</p>
                <p>Open <a href="https://masterpromptmaker.vercel.app/?view=dashboard" style="color: #60a5fa;">Your Dashboard</a> to activate and download your files.</p>
              </div>
            `
          })
        });
      } catch (emailErr) {
        console.error('Email dispatch error:', emailErr);
      }
    }

    return res.status(200).json({
      status: 'success',
      orderRef: order.order_ref,
      customerEmail: order.customer_email,
      message: `Order #${order.order_ref} verified automatically from bank alert!`
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: err.message });
  }
}
