import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let ai: GoogleGenAI | null = null;
try {
  if (API_KEY) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
} catch (e) {
  console.warn('Gemini AI init failed:', e);
}

const SYSTEM_PROMPT = `You are E-Prayog AI Tutor — a friendly, expert science tutor built into the E-Prayog Virtual Science Lab platform for Karnataka PUC (Pre-University Course) students.

Your role:
- Help students understand Physics, Chemistry, Biology, Mathematics, and Computer Science experiments.
- Provide clear, step-by-step explanations aligned with the Karnataka PUC syllabus.
- When a student is inside a specific experiment, you will be provided context about that experiment (aim, theory, procedure, formulas, viva questions). Use this context to give highly relevant answers.
- Use simple language. Offer analogies and real-world examples familiar to Indian students.
- When asked about formulas, write them clearly. Use markdown formatting for emphasis.
- If asked about something outside science/academics, politely redirect.
- Be encouraging and patient. Use occasional Kannada phrases where appropriate (e.g., "ಚೆನ್ನಾಗಿ ಮಾಡಿದ್ದೀರಿ!" — Well done!).

Always respond in markdown format.`;

// ---------- Chat session type ----------
export interface ChatSession {
  history: { role: string; text: string }[];
  contextString: string | null;
}

export function createChatSession(labContext?: string): ChatSession {
  return { history: [], contextString: labContext ?? null };
}

// ---------- Streaming send ----------
export async function sendMessageToGemini(
  session: ChatSession,
  message: string,
  onChunk: (chunk: string) => void
): Promise<void> {
  if (!ai) throw new Error('AI not configured');

  let systemPrompt = SYSTEM_PROMPT;
  if (session.contextString) {
    systemPrompt += `\n\n--- CURRENT EXPERIMENT CONTEXT ---\n${session.contextString}\n--- END CONTEXT ---\n\nUse the above experiment context to give targeted, specific help.`;
  }

  // Build conversation history as plain text context
  const historyText = session.history
    .map(h => `${h.role === 'user' ? 'Student' : 'Tutor'}: ${h.text}`)
    .join('\n');

  const fullPrompt = historyText
    ? `${historyText}\nStudent: ${message}`
    : message;

  // Add user message to history
  session.history.push({ role: 'user', text: message });

  try {
    const result = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    let fullText = '';
    for await (const chunk of result) {
      const chunkText = chunk.text ?? '';
      if (chunkText) {
        fullText += chunkText;
        onChunk(chunkText);
      }
    }

    // Add assistant response to history
    session.history.push({ role: 'model', text: fullText });
  } catch (e: any) {
    console.error('Gemini stream error:', e);
    throw e;
  }
}

// ---------- One-shot (Tutor page) ----------
export async function askTutor(question: string, labContext?: string): Promise<string> {
  if (!ai) return 'AI Tutor is not configured. Please check the API key.';

  let prompt = SYSTEM_PROMPT;
  if (labContext && labContext !== 'General') {
    prompt += `\n\nCurrent lab context: ${labContext}`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: prompt,
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });
    return response.text || 'I could not generate a response. Please try again.';
  } catch (e: any) {
    console.error('Gemini askTutor error:', e);
    if (e?.message?.includes('429')) return 'Rate limit exceeded. Please wait a moment and try again.';
    if (e?.message?.includes('API_KEY')) return 'Invalid API key. Please check configuration.';
    return `Error: ${e.message || 'Failed to get response from AI.'}`;
  }
}
