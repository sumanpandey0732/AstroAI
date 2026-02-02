/**
 * 🧠 AI Service
 * Handles all interactions with OpenRouter API (LLMs & Vision Models).
 * Enforces the "Spiritual & Safe" persona.
 */

import { config } from '../config/appConfig';

// 🛡️ The Golden Rule: System Prompt
// This instructs the AI how to behave. STRICTLY ENFORCED.
const SYSTEM_PROMPT = `
You are a wise, compassionate, and spiritual AI Palm Reader and Astrologer.
Your goal is to provide guidance, reflection, and empowerment to the user.

🚨 STRICT RULES (ABSOLUTE):
1. NEVER predict death, serious illness, legal verdicts, or guaranteed future events.
2. NEVER give medical, legal, or financial advice.
3. DO NOT use fear-based language (e.g., "curse", "bad omen", "danger").
4. ALWAYS keep answers positive, empowering, and open-ended.
5. Use symbolic and metaphorical language (e.g., "The energy suggests...", "The cards indicate...").
6. If a user asks a dangerous question (e.g., "When will I die?"), gently refuse and pivot to a positive topic.
7. Format your response in clean Markdown (bold headings, bullet points).
`;

/**
 * 📨 Generic API Call Wrapper
 */
async function callOpenRouter(messages, model = config.api.openRouter.textModel) {
  try {
    const response = await fetch(`${config.api.openRouter.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.api.openRouter.key}`,
        'HTTP-Referer': window.location.origin, // Required by OpenRouter
        'X-Title': config.app.name,
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7, // Balance between creativity and focus
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'AI Service Error');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "I couldn't receive a clear message from the stars. Please try again.";

  } catch (error) {
    console.error('🔮 AI Service Error:', error);
    throw error;
  }
}

/**
 * 🗣️ Chat / Tarot Interpretation
 * @param {string} userQuery - The user's question or tarot spread details
 * @param {string} language - User's selected language
 */
export const generateGuidance = async (userQuery, language = 'en') => {
  const languageInstruction = `Please respond in ${language} language.`;
  
  const messages = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n${languageInstruction}` },
    { role: 'user', content: userQuery }
  ];

  return await callOpenRouter(messages, config.api.openRouter.textModel);
};

/**
 * ✋ Palm Reading (Vision AI)
 * @param {string} base64Image - The uploaded palm image
 * @param {string} language - User's selected language
 */
export const analyzePalm = async (base64Image, language = 'en') => {
  const languageInstruction = `Please respond in ${language} language.`;
  
  // Specific prompt for Palm Reading
  const palmPrompt = `
    Look at this palm image carefully. Analyze the following lines if visible:
    1. Heart Line (Emotions, Love)
    2. Head Line (Intellect, Mentality)
    3. Life Line (Vitality, Energy)
    4. Fate Line (Career, Destiny)

    Provide a structured reading. Mention the shape of the hand and length of fingers if clear.
    Remember: No negative predictions. Focus on personality traits and potential.
  `;

  const messages = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n${languageInstruction}` },
    {
      role: 'user',
      content: [
        { type: 'text', text: palmPrompt },
        {
          type: 'image_url',
          image_url: {
            url: base64Image // Data URL (data:image/jpeg;base64,...)
          }
        }
      ]
    }
  ];

  return await callOpenRouter(messages, config.api.openRouter.visionModel);
};

export default {
  generateGuidance,
  analyzePalm
};
