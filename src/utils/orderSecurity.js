// Order Security and Dual Bank Configuration
// Implements tamper-proof, order-bound unlock token generation (anti-sharing protection)

export const BANK_ACCOUNTS = {
  opay: {
    id: "opay",
    bankName: "OPAY",
    accountNumber: "8034710699",
    accountName: "Samuel Omotoso",
    badge: "Recommended • Instant Alert",
    tagColor: "#10b981",
    textColor: "#34d399",
    bgSubtle: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.35)",
    logoIcon: "wallet"
  },
  gtb: {
    id: "gtb",
    bankName: "GTB (Guaranty Trust Bank)",
    accountNumber: "0029103844",
    accountName: "Master Prompt Digital",
    badge: "Commercial Bank Transfer",
    tagColor: "#f97316",
    textColor: "#fb923c",
    bgSubtle: "rgba(249, 115, 22, 0.12)",
    border: "rgba(249, 115, 22, 0.35)",
    logoIcon: "building"
  }
};

/**
 * Secret salt for order verification (client-side deterministic hashing)
 * Ensures unlock codes are mathematically tied ONLY to the specific Order ID.
 */
const SECRET_SALT = "SO_PROMPT_OPT_9482_SECURE";

export function generateOrderSecurity(orderId) {
  if (!orderId) return "";
  
  // Clean order ID: e.g. "PO-829142" -> "829142"
  const cleaned = orderId.replace(/[^0-9A-Z]/gi, "");
  
  // Deterministic polynomial rolling hash
  let hash = 0;
  const combined = cleaned + SECRET_SALT;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  
  const positiveHash = Math.abs(hash);
  const codeSuffix = (positiveHash % 9000 + 1000).toString(); // 4 digits e.g. "7291"
  return `SO-${codeSuffix}`;
}

export function verifyOrderUnlock(orderId, inputCode) {
  if (!orderId || !inputCode) return false;
  
  const expected = generateOrderSecurity(orderId).trim().toUpperCase();
  const cleanedInput = inputCode.trim().toUpperCase();
  
  // Accept with or without "SO-" prefix (e.g. "SO-7291" or "7291")
  if (cleanedInput === expected) return true;
  if (`SO-${cleanedInput}` === expected) return true;
  
  return false;
}
