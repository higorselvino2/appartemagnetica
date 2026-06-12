
import { Language } from "../types";

const callOpenAI = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.text;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateNicheIdeas = async (
  style: string,
  themes: string[],
  preference: string,
  emotion: string,
  lang: Language = 'en'
): Promise<string> => {
  const langName = lang === 'pt' ? 'Português' : lang === 'es' ? 'Espanhol' : 'Inglês';
  const prompt = `
    Act as an art career specialist for illustrators wanting to sell in dollars.
    The user is using the app in ${langName}.
    User data:
    - Style: ${style}
    - Themes: ${themes.join(", ")}
    - Preference: ${preference}
    - Emotion: ${emotion}

    Generate 3 profitable and specific NICHE suggestions.
    For each niche, provide:
    1. Niche Name (in ${langName})
    2. Short description of why it's profitable (in ${langName}).
    3. Audience Profile (In English).
    4. 3 Portfolio drawing ideas (in ${langName}).

    Format as clear Markdown.
  `;

  try {
    return await callOpenAI(prompt);
  } catch (error) {
    return "AI Error. Please try again.";
  }
};

export const generateCaptions = async (
  niche: string,
  topic: string,
  emotion: string,
  platform: 'Instagram' | 'Reddit' | 'Facebook',
  lang: Language = 'en'
): Promise<string> => {
  const prompt = `
    Create 3 caption options in ENGLISH for an artist on ${platform}.
    The user's interface is in ${lang}.
    Context:
    - Niche: ${niche}
    - Topic: ${topic}
    - Emotion: ${emotion}

    Output should be in English (native, natural).
    Option 1: Storytelling
    Option 2: Viral/Short
    Option 3: Professional/Soft Sell
    Include hashtags.
  `;

  try {
    return await callOpenAI(prompt);
  } catch (error) {
    return "AI Connection Error.";
  }
};

export const generateScript = async (
  scenario: string,
  clientName: string,
  details: string,
  tone: 'Friendly' | 'Professional' | 'Firm',
  lang: Language = 'en'
): Promise<string> => {
  const langName = lang === 'pt' ? 'Português' : lang === 'es' ? 'Español' : 'English';
  const prompt = `
    Write an ENGLISH response for an art commission client.
    Scenario: ${scenario}
    Client Name: ${clientName}
    Details: ${details}
    Tone: ${tone}

    The script MUST be in English.
    Provide a brief explanation of why this works in ${langName} at the end.
  `;

  try {
    return await callOpenAI(prompt);
  } catch (error) {
    return "AI Connection Error.";
  }
};

export const generatePortfolioBio = async (
  name: string,
  niche: string,
  vibe: string,
  lang: Language = 'en'
): Promise<string> => {
  const langName = lang === 'pt' ? 'Português' : lang === 'es' ? 'Español' : 'English';
  const prompt = `
    Create a profile structure (Bio) for an artist.
    Name: ${name}
    Niche: ${niche}
    Vibe: ${vibe}

    Generate:
    1. Suggested Username
    2. Bio in English
    3. Hook phrase in English
    Explain the choices briefly in ${langName}.
  `;
  
  try {
    return await callOpenAI(prompt);
  } catch (error) {
    return "AI Connection Error.";
  }
};
