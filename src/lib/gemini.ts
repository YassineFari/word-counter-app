const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const MODEL = "gemini-2.0-flash";

export function isGeminiAvailable(): boolean {
  return !!API_KEY;
}

async function callGemini(prompt: string): Promise<string> {
  if (!API_KEY) throw new Error("Gemini API key not configured");
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

export async function rewriteWithAI(text: string, intensity: "light" | "medium" | "strong"): Promise<string> {
  if (!text.trim()) return "";
  const instructions = {
    light: "Make minimal changes, only improving awkward phrasing while keeping most words intact.",
    medium: "Rephrase sentences to improve clarity and flow. Change sentence structure moderately.",
    strong: "Completely rewrite the text with different wording and sentence structures while preserving the original meaning.",
  };
  const prompt = `Rewrite the following text. ${instructions[intensity]} Return only the rewritten text without explanations or markdown.\n\n${text}`;
  return callGemini(prompt);
}

export async function grammarCheckWithAI(text: string): Promise<string> {
  if (!text.trim()) return "";
  const prompt = `Check the following text for grammar, spelling, and punctuation errors. For each issue, explain the problem and provide the correction. Format as a short list. If no issues found, say "No issues found."\n\n${text}`;
  return callGemini(prompt);
}
