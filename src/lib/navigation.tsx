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
      {
        id: "case-converter",
        nameKey: "tools.caseConverter.title",
        descKey: "tools.caseConverter.desc",
        href: "/case-converter",
        icon: (
          <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7V4m0 0h3M4 4l4 4m12-4v3m0-3h-3m3 0l-4 4M4 17v3m0 0h3m-3 0l4-4m12 4v-3m0 3h-3m3 0l-4-4" />
          </svg>
        ),
      },
    ],
  },
];
