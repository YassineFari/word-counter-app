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
    "grammar checker",
    "text rewriter",
    "keyword density analyzer",
    "meta description analyzer",
    "readability score",
    "text tools",
    "writing tools",
    "seo tools",
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

const tools = [
  {
    titleKey: "tools.wordCounter.title",
    descKey: "tools.wordCounter.desc",
    href: "/word-counter",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    titleKey: "tools.charCounter.title",
    descKey: "tools.charCounter.desc",
    href: "/character-counter",
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
  {
    titleKey: "tools.sentenceCounter.title",
    descKey: "tools.sentenceCounter.desc",
    href: "/sentence-counter",
    icon: (
      <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    titleKey: "tools.paragraphCounter.title",
    descKey: "tools.paragraphCounter.desc",
    href: "/paragraph-counter",
    icon: (
      <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    titleKey: "tools.readingTime.title",
    descKey: "tools.readingTime.desc",
    href: "/reading-time-calculator",
    icon: (
      <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titleKey: "tools.wordFrequency.title",
    descKey: "tools.wordFrequency.desc",
    href: "/word-frequency-counter",
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    titleKey: "tools.removeDuplicates.title",
    descKey: "tools.removeDuplicates.desc",
    href: "/remove-duplicate-lines",
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    titleKey: "tools.textToSlug.title",
    descKey: "tools.textToSlug.desc",
    href: "/text-to-slug",
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    titleKey: "tools.caseConverter.title",
    descKey: "tools.caseConverter.desc",
    href: "/case-converter",
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7V4m0 0h3M4 4l4 4m12-4v3m0-3h-3m3 0l-4 4M4 17v3m0 0h3m-3 0l4-4m12 4v-3m0 3h-3m3 0l-4-4" />
      </svg>
    ),
  },
];

const faqItems = [
  { qKey: "faq.q1" as const, aKey: "faq.a1" as const },
  { qKey: "faq.q2" as const, aKey: "faq.a2" as const },
  { qKey: "faq.q3" as const, aKey: "faq.a3" as const },
  { qKey: "faq.q4" as const, aKey: "faq.a4" as const },
  { qKey: "faq.q5" as const, aKey: "faq.a5" as const },
];

export default function HomePage() {
  return <HomeContent tools={tools} faqItems={faqItems} />;
}
