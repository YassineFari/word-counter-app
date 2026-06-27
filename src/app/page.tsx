import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "Free Online Word Counter Tool",
  description:
    "Free online text analysis tools. Count words, characters, sentences, paragraphs, and calculate reading time. Fast, accurate, and privacy-focused.",
  keywords: [
    "word counter",
    "character counter",
    "sentence counter",
    "paragraph counter",
    "reading time calculator",
    "text tools",
    "writing tools",
  ],
  openGraph: {
    title: "TextToolsHub - Free Online Text Analysis Tools",
    description:
      "Free online text analysis tools. Count words, characters, sentences, paragraphs, and calculate reading time.",
    url: "https://texttoolshub.com",
    siteName: "TextToolsHub",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TextToolsHub - Free Online Text Analysis Tools",
    description:
      "Free online text analysis tools. Count words, characters, sentences, paragraphs, and calculate reading time.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://texttoolshub.com",
  },
};

const toolCategories = [
  {
    id: "text-analysis",
    titleKey: "nav.category.textAnalysis",
    tools: [
      { titleKey: "tools.wordCounter.title", descKey: "tools.wordCounter.desc", href: "/word-counter", popular: true },
      { titleKey: "tools.charCounter.title", descKey: "tools.charCounter.desc", href: "/character-counter", popular: true },
      { titleKey: "tools.sentenceCounter.title", descKey: "tools.sentenceCounter.desc", href: "/sentence-counter" },
      { titleKey: "tools.paragraphCounter.title", descKey: "tools.paragraphCounter.desc", href: "/paragraph-counter" },
      { titleKey: "tools.readingTime.title", descKey: "tools.readingTime.desc", href: "/reading-time-calculator" },
    ],
  },
  {
    id: "case-converter",
    titleKey: "nav.category.caseConverter",
    tools: [
      { titleKey: "tools.caseConverter.title", descKey: "tools.caseConverter.desc", href: "/case-converter" },
      { titleKey: "tools.wordFrequency.title", descKey: "tools.wordFrequency.desc", href: "/word-frequency-counter" },
      { titleKey: "tools.removeDuplicates.title", descKey: "tools.removeDuplicates.desc", href: "/remove-duplicate-lines" },
      { titleKey: "tools.textToSlug.title", descKey: "tools.textToSlug.desc", href: "/text-to-slug" },
    ],
  },
  {
    id: "security",
    titleKey: "nav.category.security",
    tools: [
      { titleKey: "tools.passwordStrength.title", descKey: "tools.passwordStrength.desc", href: "/password-strength-checker" },
    ],
  },
];

const allTools = toolCategories.flatMap((c) => c.tools);
const totalTools = allTools.length;

const faqItems = [
  { qKey: "faq.q1" as const, aKey: "faq.a1" as const },
  { qKey: "faq.q2" as const, aKey: "faq.a2" as const },
  { qKey: "faq.q3" as const, aKey: "faq.a3" as const },
  { qKey: "faq.q4" as const, aKey: "faq.a4" as const },
  { qKey: "faq.q5" as const, aKey: "faq.a5" as const },
];

export default function HomePage() {
  return <HomeContent toolCategories={toolCategories} totalTools={totalTools} faqItems={faqItems} />;
}
