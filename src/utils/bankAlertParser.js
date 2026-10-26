import { supabase, isSupabaseConfigured, verifyOrderAndNotify } from './supabase';
import { sendOrderReceiptEmail } from './emailService';

/**
 * Intelligent Bank Alert SMS & Email Parser
 * Extracts order references, transfer amounts, and sender names from OPAY and GTB notifications.
 */
export function parseBankAlertText(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return { orderRef: null, amount: null, sender: null, confidence: 0 };
  }

  const cleanText = rawText.trim();

  // 1. Extract Order Reference (PO-XXXXXX)
  const orderRefRegex = /\b(PO-\d{6})\b/i;
  const refMatch = cleanText.match(orderRefRegex);
  const orderRef = refMatch ? refMatch[1].toUpperCase() : null;

  // 2. Extract Amount (e.g. ₦35,000.00, NGN 35000, Amt: 15,000)
  const amountRegex = /(?:NGN|₦|Amt|Amount|Credit|CR)[:\s]*([0-9]{1,3}(?:,[0-9]{3})*(?:\.[0-9]{2})?|[0-9]+(?:\.[0-9]{2})?)/i;
  const amtMatch = cleanText.match(amountRegex);
  let amount = null;
  if (amtMatch) {
    amount = parseFloat(amtMatch[1].replace(/,/g, ''));
  }

  // 3. Extract Sender Name
  const senderRegex = /(?:from|sender|fwd by|trans from)[:\s]+([A-Za-z\s]{3,30})(?:[\n\r.,;]|$)/i;
  const senderMatch = cleanText.match(senderRegex);
  const sender = senderMatch ? senderMatch[1].trim() : null;

  const confidence = (orderRef ? 60 : 0) + (amount ? 25 : 0) + (sender ? 15 : 0);

  return {
    orderRef,
    amount,
    sender,
    confidence,
    rawLength: cleanText.length
  };
}

/**
 * Automatically match a bank alert against Supabase pending orders and verify
 */
export async function autoVerifyFromBankAlert(rawText) {
  const parsed = parseBankAlertText(rawText);

  if (!parsed.orderRef && !parsed.amount) {
    return {
      success: false,
      reason: 'Could not extract an order reference (PO-XXXXXX) or transfer amount from the provided alert text.'
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      success: false,
      reason: 'Supabase database is not configured in this environment.'
    };
  }

  try {
    let matchedOrder = null;

    // A. Match by exact Order Reference
    if (parsed.orderRef) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_ref', parsed.orderRef)
        .single();

      if (!error && data) {
        matchedOrder = data;
      }
    }

    // B. Fallback: Match by exact amount among pending orders
    if (!matchedOrder && parsed.amount) {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending')
        .eq('total_amount_ngn', parsed.amount)
        .order('created_at', { ascending: false })
        .limit(1);

      if (!error && data && data.length > 0) {
        matchedOrder = data[0];
      }
    }

    if (!matchedOrder) {
      return {
        success: false,
        reason: `No pending order matched ${parsed.orderRef ? `Order Ref #${parsed.orderRef}` : `Amount ₦${parsed.amount?.toLocaleString()}`}.`,
        parsed
      };
    }

    if (matchedOrder.status === 'verified') {
      return {
        success: true,
        alreadyVerified: true,
        order: matchedOrder,
        message: `Order #${matchedOrder.order_ref} was already verified.`
      };
    }

    // Mark as verified in Supabase
    await verifyOrderAndNotify(matchedOrder.order_ref);

    // Dispatch unlock receipt email via Resend
    await sendOrderReceiptEmail({
      customerEmail: matchedOrder.customer_email,
      customerName: matchedOrder.customer_name || 'Valued Creator',
      orderRef: matchedOrder.order_ref,
      unlockCode: matchedOrder.unlock_code,
      items: matchedOrder.items || [],
      totalNGN: matchedOrder.total_amount_ngn,
      totalUSD: matchedOrder.total_amount_usd,
      currency: matchedOrder.currency
    });

    return {
      success: true,
      order: { ...matchedOrder, status: 'verified' },
      parsed,
      message: `Successfully verified Order #${matchedOrder.order_ref}! Unlock code dispatched to ${matchedOrder.customer_email}.`
    };
  } catch (err) {
    console.error('[BankAlertParser] Verification error:', err);
    return { success: false, error: err.message };
  }
}
