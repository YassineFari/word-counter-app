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
