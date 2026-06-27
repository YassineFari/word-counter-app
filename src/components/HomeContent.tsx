"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "./LanguageProvider";
import ToolCard from "./ToolCard";
import AdBanner from "./AdBanner";
import FAQSection from "./FAQSection";
import ToolInterface from "./ToolInterface";
import { faqSchema } from "@/lib/schema";

interface ToolData {
  titleKey: string;
  descKey: string;
  href: string;
  popular?: boolean;
}

interface ToolCategory {
  id: string;
  titleKey: string;
  tools: ToolData[];
}

interface FAQData {
  qKey: string;
  aKey: string;
}

interface HomeContentProps {
  toolCategories: ToolCategory[];
  totalTools: number;
  faqItems: FAQData[];
}

export default function HomeContent({ toolCategories, totalTools, faqItems }: HomeContentProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const resolvedFaq = faqItems.map((item) => ({
    q: t(item.qKey),
    a: t(item.aKey),
  }));

  const schema = faqSchema(resolvedFaq);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return toolCategories;
    const q = searchQuery.toLowerCase();
    return toolCategories
      .map((cat) => ({
        ...cat,
        tools: cat.tools.filter(
          (tool) =>
            t(tool.titleKey).toLowerCase().includes(q) ||
            t(tool.descKey).toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.tools.length > 0);
  }, [searchQuery, toolCategories, t]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-4">
        <section className="py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {totalTools} Free Tools &middot; No Signup Required
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text leading-tight">
            {t("hero.title")}{" "}
            <span className="text-primary">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs sm:text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No signup
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No ads
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              100% Free
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Private & local
            </span>
          </div>
        </section>

        <div className="relative mb-8">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
          />
        </div>

        <AdBanner className="mb-8" />

        <section className="py-6">
          <ToolInterface />
        </section>

        <AdBanner className="my-8" />

        {filteredCategories.map((cat) => (
          <section key={cat.id} className="py-8">
            <h2 className="text-xl font-bold text-text mb-5 flex items-center gap-2">
              <span>{t(cat.titleKey)}</span>
              <span className="text-xs font-normal text-text-muted bg-bg-tertiary px-2 py-0.5 rounded-full">
                {cat.tools.length}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cat.tools.map((tool) => (
                <div key={tool.href} className="relative">
                  {tool.popular && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-primary text-white shadow-sm">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Popular
                      </span>
                    </div>
                  )}
                  <ToolCard
                    title={t(tool.titleKey)}
                    description={t(tool.descKey)}
                    href={tool.href}
                    icon={null}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}

        {filteredCategories.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-text-muted text-sm">
              No tools found for &quot;{searchQuery}&quot;
            </p>
          </div>
        )}

        <AdBanner className="my-8" />

        <section className="py-10">
          <h2 className="text-2xl font-bold text-text mb-4">
            {t("seo.heading")}
          </h2>
          <div className="prose prose-gray max-w-none text-sm sm:text-base text-text-secondary leading-relaxed space-y-4">
            <p>{t("seo.p1")}</p>
            <p>{t("seo.p2")}</p>
            <p>{t("seo.p3")}</p>
          </div>
        </section>

        <section className="py-6 border-t border-border mb-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-bg-secondary/50">
              <div className="text-2xl font-bold text-primary">{totalTools}</div>
              <div className="text-xs text-text-secondary mt-1">Free Tools</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-secondary/50">
              <div className="text-2xl font-bold text-secondary">100%</div>
              <div className="text-xs text-text-secondary mt-1">Client-Side</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-secondary/50">
              <div className="text-2xl font-bold text-primary">0</div>
              <div className="text-xs text-text-secondary mt-1">Servers Used</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-secondary/50">
              <div className="text-2xl font-bold text-secondary">10+</div>
              <div className="text-xs text-text-secondary mt-1">Languages</div>
            </div>
          </div>
        </section>

        <FAQSection items={resolvedFaq} />

        <AdBanner className="my-8" />
      </div>
    </>
  );
}
