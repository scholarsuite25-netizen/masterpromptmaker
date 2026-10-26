import { createClient } from '@supabase/supabase-js';

// Read Supabase environment variables from Vite env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://'));
};

// Create Supabase client singleton with graceful fallback
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

/**
 * Save an optimized prompt to Supabase Cloud
 */
export async function savePromptToCloud({ email, title, content, framework, targetModel, tags = [] }) {
  if (!isSupabaseConfigured()) {
    console.warn('[Supabase] Not configured - skipping cloud prompt save.');
    return { success: false, reason: 'unconfigured' };
  }

  try {
    const { data, error } = await supabase
      .from('saved_prompts')
      .insert([
        {
          user_email: email.trim().toLowerCase(),
          title: title || 'Untitled Prompt',
          content,
          framework: framework || 'STAR',
          target_model: targetModel || 'ChatGPT 4o',
          tags: Array.isArray(tags) ? tags : [tags],
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('[Supabase] Failed to save prompt:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch all saved prompts for a given user email
 */
export async function fetchUserPrompts(email) {
  if (!isSupabaseConfigured() || !email) {
    return { success: false, prompts: [] };
  }

  try {
    const { data, error } = await supabase
      .from('saved_prompts')
      .select('*')
      .eq('user_email', email.trim().toLowerCase())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, prompts: data || [] };
  } catch (err) {
    console.error('[Supabase] Failed to fetch prompts:', err.message);
    return { success: false, error: err.message, prompts: [] };
  }
}

/**
 * Record a new digital store order in Supabase
 */
export async function recordOrder({
  orderRef,
  customerEmail,
  customerName = '',
  items = [],
  totalNGN = 0,
  totalUSD = 0,
  currency = 'NGN',
  unlockCode = ''
}) {
  if (!isSupabaseConfigured()) {
    console.warn('[Supabase] Not configured - recording order locally.');
    return { success: false, reason: 'unconfigured' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          order_ref: orderRef,
          customer_email: customerEmail.trim().toLowerCase(),
          customer_name: customerName,
          items,
          total_amount_ngn: totalNGN,
          total_amount_usd: totalUSD,
          currency,
          payment_method: 'bank_transfer',
          status: 'pending',
          unlock_code: unlockCode,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('[Supabase] Failed to record order:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Verify an order unlock against Supabase Cloud records
 */
export async function verifyOrderWithCloud(orderRef, inputCode) {
  if (!isSupabaseConfigured()) {
    return { verified: false, reason: 'unconfigured' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('unlock_code, status')
      .eq('order_ref', orderRef.trim())
      .single();

    if (error || !data) {
      return { verified: false, reason: 'not_found' };
    }

    const matches = data.unlock_code && 
      data.unlock_code.trim().toUpperCase() === inputCode.trim().toUpperCase();

    if (matches && data.status === 'pending') {
      // Mark as verified in cloud
      await supabase
        .from('orders')
        .update({ status: 'verified', verified_at: new Date().toISOString() })
        .eq('order_ref', orderRef.trim());
    }

    return { verified: matches };
  } catch (err) {
    console.error('[Supabase] Order verification error:', err.message);
    return { verified: false, error: err.message };
  }
}

/**
 * Fetch all digital orders (for Samuel Omotoso Admin drawer)
 */
export async function fetchAllOrders() {
  if (!isSupabaseConfigured()) {
    // Return mock orders from localStorage if any
    try {
      const local = localStorage.getItem('po_pending_orders');
      return { success: true, orders: local ? JSON.parse(local) : [] };
    } catch {
      return { success: true, orders: [] };
    }
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return { success: true, orders: data || [] };
  } catch (err) {
    console.error('[Supabase] Failed to fetch orders:', err.message);
    return { success: false, error: err.message, orders: [] };
  }
}

/**
 * Admin action: mark order verified and optionally notify customer
 */
export async function verifyOrderAndNotify(orderRef) {
  if (!isSupabaseConfigured()) {
    return { success: true, simulated: true };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .update({
        status: 'verified',
        verified_at: new Date().toISOString()
      })
      .eq('order_ref', orderRef.trim())
      .select()
      .single();

    if (error) throw error;
    return { success: true, order: data };
  } catch (err) {
    console.error('[Supabase] Failed to verify order:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Record Keynote Speaker booking inquiry
 */
export async function recordSpeakingInquiry(inquiryData) {
  if (!isSupabaseConfigured()) {
    return { success: false, reason: 'unconfigured' };
  }

  try {
    const { data, error } = await supabase
      .from('speaking_inquiries')
      .insert([
        {
          client_name: inquiryData.name,
          client_email: inquiryData.email.trim().toLowerCase(),
          organization: inquiryData.organization || '',
          event_type: inquiryData.eventType || '',
          preferred_date: inquiryData.date || '',
          estimated_audience: inquiryData.audience || '',
          topic: inquiryData.topic || '',
          additional_notes: inquiryData.message || '',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (err) {
    console.error('[Supabase] Failed to record speaking inquiry:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch Keynote Speaker inquiries (for Samuel Omotoso Admin drawer)
 */
export async function fetchSpeakingInquiries() {
  if (!isSupabaseConfigured()) {
    return { success: true, inquiries: [] };
  }

  try {
    const { data, error } = await supabase
      .from('speaking_inquiries')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return { success: true, inquiries: data || [] };
  } catch (err) {
    console.error('[Supabase] Failed to fetch inquiries:', err.message);
    return { success: false, error: err.message, inquiries: [] };
  }
}
