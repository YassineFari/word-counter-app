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

export function toCapitalizedCase(text: string): string {
  return text.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

export function toTitleCase(text: string): string {
  const smallWords = new Set([
    "a", "an", "the", "and", "or", "but", "in", "on", "at", "to",
    "for", "of", "by", "with", "is", "are", "was", "were", "be",
    "been", "being", "have", "has", "had", "do", "does", "did",
    "nor", "not", "so", "yet", "as", "if", "than", "that",
  ]);
  return text.replace(/\w\S*/g, (word, offset) => {
    const lower = word.toLowerCase();
    if (offset !== 0 && smallWords.has(lower)) return lower;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

export function toSentenceCase(text: string): string {
  const lower = text.toLowerCase();
  return lower.replace(/(?:^\s*\w|[.!?]\s*\w)/g, (match) =>
    match.toUpperCase()
  );
}

export function toAlternatingCase(text: string): string {
  return text
    .split("")
    .map((char, i) => {
      if (/[a-zA-Z]/.test(char)) {
        return i % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
      }
      return char;
    })
    .join("");
}

export function toInverseCase(text: string): string {
  return text
    .split("")
    .map((char) => {
      if (char >= "a" && char <= "z") return char.toUpperCase();
      if (char >= "A" && char <= "Z") return char.toLowerCase();
      return char;
    })
    .join("");
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

// --- Word Frequency ---
export interface WordFrequencyEntry {
  word: string;
  count: number;
  percentage: number;
}

// --- Remove Duplicate Lines ---
export interface RemoveDuplicateResult {
  output: string;
  removed: number;
  remaining: number;
}

export function removeDuplicateLines(
  text: string,
  options: {
    caseSensitive: boolean;
    trimWhitespace: boolean;
    removeEmptyLines: boolean;
    sortLines: boolean;
  }
): RemoveDuplicateResult {
  let lines = text.replace(/\r\n/g, "\n").split("\n");
  const totalLines = lines.length;

  if (options.trimWhitespace) {
    lines = lines.map((l) => l.trim());
  }

  if (options.removeEmptyLines) {
    lines = lines.filter((l) => l.length > 0);
  }

  const seen = new Set<string>();
  const unique: string[] = [];

  for (const line of lines) {
    const key = options.caseSensitive ? line : line.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(line);
    }
  }

  if (options.sortLines) {
    const cmp = options.caseSensitive
      ? (a: string, b: string) => a.localeCompare(b)
      : (a: string, b: string) => a.toLowerCase().localeCompare(b.toLowerCase());
    unique.sort(cmp);
  }

  const removed = totalLines - unique.length;

  return {
    output: unique.join("\n"),
    removed,
    remaining: unique.length,
  };
}

// --- Slug Generation ---
export function toSlug(
  text: string,
  options: {
    separator: "-" | "_";
    caseOption: "lower" | "upper" | "preserve";
    removeNumbers: boolean;
    maxLength: number;
  }
): string {
  let slug = text.trim();
  if (!slug) return "";

  if (options.caseOption === "lower") {
    slug = slug.toLowerCase();
  } else if (options.caseOption === "upper") {
    slug = slug.toUpperCase();
  }

  if (options.removeNumbers) {
    slug = slug.replace(/[0-9]/g, "");
  }

  slug = slug.replace(/[^a-zA-Z0-9\s-]/g, "");
  slug = slug.replace(/[\s-]+/g, options.separator);
  slug = slug.replace(new RegExp(`^${options.separator}|${options.separator}$`, "g"), "");

  if (options.maxLength > 0 && slug.length > options.maxLength) {
    slug = slug.slice(0, options.maxLength);
    slug = slug.replace(new RegExp(`${options.separator}$`), "");
  }

  return slug;
}

export function getWordFrequency(
  text: string,
  excludeStopWords = false
): WordFrequencyEntry[] {
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
    if (excludeStopWords && (w.length < 2 || stopWords.has(w))) continue;
    freq[w] = (freq[w] || 0) + 1;
  }

  return Object.entries(freq)
    .map(([word, count]) => ({
      word,
      count,
      percentage: +((count / total) * 100).toFixed(2),
    }))
    .sort((a, b) => b.count - a.count);
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

// --- Password Strength ---
export interface PasswordStrengthResult {
  score: number;
  label: string;
  color: string;
  checks: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
  tips: string[];
}

export function checkPasswordStrength(password: string): PasswordStrengthResult {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    symbols: /[^a-zA-Z0-9]/.test(password),
  };

  const passed = Object.values(checks).filter(Boolean).length;
  let score: number, label: string, color: string;

  if (password.length === 0) {
    score = 0; label = "None"; color = "bg-gray-500";
  } else if (passed <= 1) {
    score = 1; label = "Weak"; color = "bg-red-500";
  } else if (passed === 2) {
    score = 2; label = "Fair"; color = "bg-orange-500";
  } else if (passed === 3) {
    score = 3; label = "Strong"; color = "bg-yellow-500";
  } else {
    score = 4; label = "Very Strong"; color = "bg-green-500";
  }

  const tips: string[] = [];
  if (!checks.length) tips.push("Use at least 8 characters");
  if (!checks.uppercase) tips.push("Add an uppercase letter");
  if (!checks.lowercase) tips.push("Add a lowercase letter");
  if (!checks.numbers) tips.push("Add a number");
  if (!checks.symbols) tips.push("Add a symbol (e.g. !@#$%)");

  return { score, label, color, checks, tips };
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


