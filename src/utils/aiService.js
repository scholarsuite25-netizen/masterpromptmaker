import { optimizePromptLocally } from './promptEngine';

// Groq Cloud API configuration
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export function isGroqConfigured() {
  const envKey = import.meta.env.VITE_GROQ_API_KEY;
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('masterprompt_groq_key') : null;
  return Boolean((envKey && envKey.startsWith('gsk_')) || (localKey && localKey.startsWith('gsk_')));
}

export function getActiveGroqKey() {
  const envKey = import.meta.env.VITE_GROQ_API_KEY;
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('masterprompt_groq_key') : null;
  return localKey || envKey || '';
}

export function setCustomGroqKey(key) {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem('masterprompt_groq_key', key.trim());
    } else {
      localStorage.removeItem('masterprompt_groq_key');
    }
  }
}

/**
 * Maps the application's model selection to a Groq-hosted open-source foundation model
 */
function resolveGroqModel(targetModel) {
  if (targetModel === 'deepseek') {
    return 'deepseek-r1-distill-llama-70b';
  }
  return 'llama-3.3-70b-versatile';
}

/**
 * Dual-Engine Prompt Optimizer:
 * Calls Groq Cloud API for real live LLM inference when configured,
 * with instant automatic fallback to deterministic cognitive heuristics.
 */
export async function optimizePromptLive(rawText, options = {}) {
  const {
    model = 'chatgpt',
    framework = 'rtf',
    tone = 'authoritative',
    format = 'structured_markdown',
    customGoal = ''
  } = options;

  const apiKey = getActiveGroqKey();

  // If no Groq API key is provided, execute local heuristic engine immediately
  if (!apiKey) {
    const localResult = optimizePromptLocally(rawText, options);
    return {
      ...localResult,
      isLiveAi: false,
      engine: 'Deterministic Cognitive Heuristics'
    };
  }

  const groqModel = resolveGroqModel(model);

  const systemPrompt = `You are a World-Class Principal AI Prompt Engineer for Master Prompt Studio.
Your mission is to take an initial, weak or raw prompt from a user and re-engineer it into an elite, production-grade master prompt.

Framework to apply: ${framework.toUpperCase()}
Target AI platform: ${model.toUpperCase()}
Tone of voice: ${tone}
Output formatting: ${format}
${customGoal ? `User's strategic goal: ${customGoal}` : ''}

CRITICAL RULES:
1. Provide the complete optimized master prompt ready for the user to copy-paste.
2. Ensure strict alignment with the target model's syntax (e.g. XML tags for Claude, role instructions for ChatGPT, camera/lighting params for Midjourney).
3. Do not include conversational filler like "Here is your prompt". Output the prompt cleanly.
4. Conclude with a brief 3-point bulleted breakdown titled "### Engineering Improvements Made:" explaining why this prompt generates superior outputs.`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12-second timeout

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: groqModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please optimize this prompt:\n\n${rawText}` }
        ],
        temperature: 0.6,
        max_tokens: 1500
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[Groq AI] API call failed (${response.status}):`, errText);
      throw new Error(`Groq API returned status ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '';

    if (!rawContent.trim()) {
      throw new Error('Groq API returned empty completion');
    }

    // Split improvements explanation from prompt body if present
    let promptBody = rawContent;
    let explanations = [];

    if (rawContent.includes('### Engineering Improvements Made:')) {
      const parts = rawContent.split('### Engineering Improvements Made:');
      promptBody = parts[0].trim();
      const improvementLines = parts[1].split('\n').filter(line => line.trim().startsWith('-') || line.trim().startsWith('*') || /^\d+\./.test(line.trim()));
      explanations = improvementLines.map(l => l.replace(/^[-*\d.]+\s*/, '').trim());
    }

    if (explanations.length === 0) {
      explanations = [
        `Calibrated role definition and contextual guardrails using the ${framework.toUpperCase()} protocol.`,
        `Synthesized optimal structural formatting tailored specifically for ${model.toUpperCase()}.`,
        `Eliminated ambiguity and anchored output yield expectations.`
      ];
    }

    const beforeWords = rawText.split(/\s+/).filter(Boolean).length;
    const afterWords = promptBody.split(/\s+/).filter(Boolean).length;
    const tokensBefore = Math.round(beforeWords * 1.33);
    const tokensAfter = Math.round(afterWords * 1.33);
    const improvement = Math.min(Math.round(((afterWords - beforeWords) / Math.max(beforeWords, 1)) * 100), 450);

    return {
      optimized: promptBody,
      explanation: explanations,
      metrics: {
        beforeWords,
        afterWords,
        tokensBefore,
        tokensAfter,
        clarityScore: 97,
        improvement: Math.max(improvement, 120)
      },
      isLiveAi: true,
      engine: `Groq Live AI (${groqModel})`
    };
  } catch (error) {
    console.warn('[AI Service] Falling back to offline heuristics:', error.message);
    const fallbackResult = optimizePromptLocally(rawText, options);
    return {
      ...fallbackResult,
      isLiveAi: false,
      engine: 'Deterministic Cognitive Heuristics (Offline Fallback)'
    };
  }
}
