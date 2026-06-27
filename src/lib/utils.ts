export function countWords(text: string): number {
  if (!text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function countCharacters(text: string): number {
  return text.length;
}

export function countCharactersNoSpaces(text: string): number {
  return text.replace(/\s/g, "").length;
}

export function countSentences(text: string): number {
  if (!text.trim()) return 0;
  const matches = text.match(/[.!?]+/g);
  return matches ? matches.length : 0;
}

export function countParagraphs(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
}

export function countSpaces(text: string): number {
  return (text.match(/ /g) || []).length;
}

export function countLines(text: string): number {
  if (!text) return 0;
  return text.split(/\n/).length;
}

export function countNonEmptyLines(text: string): number {
  if (!text.trim()) return 0;
  return text.split(/\n/).filter((line) => line.trim().length > 0).length;
}

export function countPages(text: string, wordsPerPage = 250): number {
  const wordCount = countWords(text);
  if (wordCount === 0) return 0;
  return Math.ceil(wordCount / wordsPerPage);
}

export function calculateReadingTime(text: string): {
  minutes: number;
  seconds: number;
} {
  const wordsPerMinute = 200;
  const wordCount = countWords(text);
  const minutes = wordCount / wordsPerMinute;
  const fullMinutes = Math.floor(minutes);
  const seconds = Math.round((minutes - fullMinutes) * 60);
  return { minutes: fullMinutes, seconds };
}

export function calculateSpeakingTime(text: string): {
  minutes: number;
  seconds: number;
} {
  const wordsPerMinute = 183;
  const wordCount = countWords(text);
  const minutes = wordCount / wordsPerMinute;
  const fullMinutes = Math.floor(minutes);
  const seconds = Math.round((minutes - fullMinutes) * 60);
  return { minutes: fullMinutes, seconds };
}

export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// --- Case Conversion ---
export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toTitleCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

export function toSentenceCase(text: string): string {
  const lower = text.toLowerCase();
  return lower.replace(/(?:^\s*\w|[.!?]\s*\w)/g, (match) =>
    match.toUpperCase()
  );
}

export function toCamelCase(text: string): string {
  const words = text
    .toLowerCase()
    .split(/[\s_-]+/)
    .filter(Boolean);
  if (words.length === 0) return "";
  return (
    words[0] +
    words
      .slice(1)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join("")
  );
}

export function toSnakeCase(text: string): string {
  return text.toLowerCase().trim().replace(/[\s-]+/g, "_");
}

// --- Keyword Density ---
export interface KeywordDensityEntry {
  word: string;
  count: number;
  density: number;
}

export function getKeywordDensity(text: string): KeywordDensityEntry[] {
  if (!text.trim()) return [];
  const words = text.toLowerCase().match(/\b\w+\b/g);
  if (!words) return [];
  const total = words.length;
  const freq: Record<string, number> = {};
  const stopWords = new Set([
    "the","a","an","and","or","but","in","on","at","to","for","of","by","with",
    "from","as","is","was","are","were","be","been","being","have","has","had",
    "do","does","did","will","would","could","should","may","might","shall",
    "can","this","that","these","those","it","its","they","them","he","she",
    "we","you","i","me","my","your","his","her","our","their","not","no",
    "so","if","than","then","up","out","about","into","over","after","before",
    "between","under","again","further","once","here","there","when","where",
    "why","how","all","each","every","both","few","more","most","some","any",
  ]);
  for (const w of words) {
    if (w.length < 3 || stopWords.has(w)) continue;
    freq[w] = (freq[w] || 0) + 1;
  }
  return Object.entries(freq)
    .map(([word, count]) => ({ word, count, density: +(count / total * 100).toFixed(2) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);
}

// --- Readability ---
function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!word) return 0;
  if (word.length <= 3) return 1;
  const vowels = "aeiouy";
  let count = 0;
  let prevVowel = false;
  for (const ch of word) {
    const isVowel = vowels.includes(ch);
    if (isVowel && !prevVowel) count++;
    prevVowel = isVowel;
  }
  if (word.endsWith("e")) count--;
  if (word.endsWith("le") && word.length > 2) count++;
  if (word.endsWith("es") || word.endsWith("ed")) count--;
  return Math.max(1, count);
}

export function calculateFleschReadingEase(text: string): number {
  const words = text.trim().match(/\b\w+\b/g);
  const sentences = text.match(/[.!?]+/g);
  if (!words || words.length < 2 || !sentences) return 0;
  const totalSyllables = words.reduce((s, w) => s + countSyllables(w), 0);
  const avgSyllables = totalSyllables / words.length;
  const avgWordsPerSentence = words.length / sentences.length;
  return Math.max(0, Math.min(100, 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllables));
}

export function calculateFleschKincaidGrade(text: string): number {
  const words = text.trim().match(/\b\w+\b/g);
  const sentences = text.match(/[.!?]+/g);
  if (!words || words.length < 2 || !sentences) return 0;
  const totalSyllables = words.reduce((s, w) => s + countSyllables(w), 0);
  const avgSyllables = totalSyllables / words.length;
  const avgWordsPerSentence = words.length / sentences.length;
  return Math.round((0.39 * avgWordsPerSentence + 11.8 * avgSyllables - 15.59) * 10) / 10;
}

export function getReadabilityLabel(score: number): string {
  if (score >= 90) return "Very Easy";
  if (score >= 80) return "Easy";
  if (score >= 70) return "Fairly Easy";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Fairly Difficult";
  if (score >= 30) return "Difficult";
  return "Very Difficult";
}

export function getReadabilityGradeLabel(grade: number): string {
  if (grade <= 1) return "Kindergarten";
  if (grade <= 2) return "1st-2nd Grade";
  if (grade <= 3) return "3rd Grade";
  if (grade <= 5) return "4th-5th Grade";
  if (grade <= 7) return "6th-7th Grade";
  if (grade <= 9) return "8th-9th Grade";
  if (grade <= 12) return "10th-12th Grade";
  if (grade <= 15) return "College";
  return "College Graduate";
}

// --- Grammar Check ---
export interface GrammarIssue {
  type: string;
  message: string;
  offset: number;
  length: number;
  replacements: string[];
}

export async function checkGrammar(text: string): Promise<GrammarIssue[]> {
  if (!text.trim()) return [];
  try {
    const res = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ text, language: "en-US" }),
    });
    const data = await res.json();
    return (data.matches || []).map((m: { rule?: { issueType?: string }; message?: string; offset?: number; length?: number; replacements?: { value?: string }[] }) => ({
      type: m.rule?.issueType || "style",
      message: m.message || "Unknown issue",
      offset: m.offset ?? 0,
      length: m.length ?? 0,
      replacements: (m.replacements || []).slice(0, 5).map((r: { value?: string }) => r.value || ""),
    }));
  } catch {
    return [{ type: "error", message: "Grammar check service unavailable. Please try again.", offset: 0, length: 0, replacements: [] }];
  }
}


