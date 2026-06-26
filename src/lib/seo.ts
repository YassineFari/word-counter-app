export interface ToolMeta {
  title: string;
  description: string;
  h1: string;
  slug: string;
}

export const tools: ToolMeta[] = [
  {
    title: "Word Counter - Count Words Online",
    description:
      "Free online word counter tool. Count the number of words in your text instantly. Perfect for essays, articles, social media posts, and more.",
    h1: "Free Word Counter Tool",
    slug: "word-counter",
  },
  {
    title: "Character Counter - Count Characters Online",
    description:
      "Free online character counter tool. Count characters with and without spaces. Ideal for tweets, bios, meta descriptions, and character-limited content.",
    h1: "Free Character Counter Tool",
    slug: "character-counter",
  },
  {
    title: "Sentence Counter - Count Sentences Online",
    description:
      "Free online sentence counter tool. Instantly count the number of sentences in your text. Improve your writing structure and readability.",
    h1: "Free Sentence Counter Tool",
    slug: "sentence-counter",
  },
  {
    title: "Paragraph Counter - Count Paragraphs Online",
    description:
      "Free online paragraph counter tool. Count paragraphs in your text instantly. Organize your content and maintain proper structure.",
    h1: "Free Paragraph Counter Tool",
    slug: "paragraph-counter",
  },
  {
    title: "Reading Time Calculator - Calculate Reading Time",
    description:
      "Free online reading time calculator. Estimate how long it takes to read any text. Perfect for bloggers, writers, and content creators.",
    h1: "Free Reading Time Calculator",
    slug: "reading-time-calculator",
  },
];

export function getToolMeta(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}
