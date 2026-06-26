import type { ReactNode } from "react";

export interface ToolNavItem {
  id: string;
  nameKey: string;
  descKey: string;
  href: string;
  icon: ReactNode;
}

export interface NavCategory {
  id: string;
  titleKey: string;
  emoji: string;
  tools: ToolNavItem[];
}

export const categories: NavCategory[] = [
  {
    id: "text-analysis",
    titleKey: "nav.category.textAnalysis",
    emoji: "📊",
    tools: [
      {
        id: "word-counter",
        nameKey: "tools.wordCounter.title",
        descKey: "tools.wordCounter.desc",
        href: "/word-counter",
        icon: (
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
      },
      {
        id: "character-counter",
        nameKey: "tools.charCounter.title",
        descKey: "tools.charCounter.desc",
        href: "/character-counter",
        icon: (
          <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
        ),
      },
      {
        id: "sentence-counter",
        nameKey: "tools.sentenceCounter.title",
        descKey: "tools.sentenceCounter.desc",
        href: "/sentence-counter",
        icon: (
          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        ),
      },
      {
        id: "paragraph-counter",
        nameKey: "tools.paragraphCounter.title",
        descKey: "tools.paragraphCounter.desc",
        href: "/paragraph-counter",
        icon: (
          <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ),
      },
      {
        id: "reading-time",
        nameKey: "tools.readingTime.title",
        descKey: "tools.readingTime.desc",
        href: "/reading-time-calculator",
        icon: (
          <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "writing-tools",
    titleKey: "nav.category.writingTools",
    emoji: "✍️",
    tools: [
      {
        id: "grammar-checker",
        nameKey: "tools.grammarChecker.title",
        descKey: "tools.grammarChecker.desc",
        href: "/grammar-checker",
        icon: (
          <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        id: "plagiarism-checker",
        nameKey: "tools.plagiarismChecker.title",
        descKey: "tools.plagiarismChecker.desc",
        href: "/plagiarism-checker",
        icon: (
          <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        ),
      },
      {
        id: "text-rewriter",
        nameKey: "tools.textRewriter.title",
        descKey: "tools.textRewriter.desc",
        href: "/text-rewriter",
        icon: (
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ),
      },
    ],
  },
  {
    id: "seo-tools",
    titleKey: "nav.category.seoTools",
    emoji: "🔍",
    tools: [
      {
        id: "keyword-density",
        nameKey: "tools.keywordDensity.title",
        descKey: "tools.keywordDensity.desc",
        href: "/keyword-density-analyzer",
        icon: (
          <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
        ),
      },
      {
        id: "meta-description-analyzer",
        nameKey: "tools.metaDescAnalyzer.title",
        descKey: "tools.metaDescAnalyzer.desc",
        href: "/meta-description-analyzer",
        icon: (
          <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        ),
      },
      {
        id: "readability-score",
        nameKey: "tools.readabilityScore.title",
        descKey: "tools.readabilityScore.desc",
        href: "/readability-score",
        icon: (
          <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
      },
    ],
  },
];
