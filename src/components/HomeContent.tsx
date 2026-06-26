"use client";

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
  icon: React.ReactNode;
}

interface FAQData {
  qKey: string;
  aKey: string;
}

interface HomeContentProps {
  tools: ToolData[];
  faqItems: FAQData[];
}

export default function HomeContent({ tools, faqItems }: HomeContentProps) {
  const { t } = useLanguage();

  const resolvedFaq = faqItems.map((item) => ({
    q: t(item.qKey),
    a: t(item.aKey),
  }));

  const schema = faqSchema(resolvedFaq);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto px-4">
        <section className="py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text leading-tight">
            {t("hero.title")}{" "}
            <span className="text-primary">{t("hero.titleAccent")}</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {t("hero.description")}
          </p>
        </section>

        <AdBanner className="mb-8" />

        <section className="py-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Free Tool
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            <span className="text-red-500" style={{fontSize: '60px', fontWeight: 900}}>
              Word Counter
            </span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-4 mb-5" />
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Count words, characters w/o spaces and lines in real time. Check top keywords density, reading &amp; speaking time and level.
          </p>
        </section>

        <section className="py-6">
          <ToolInterface />
        </section>

        <AdBanner className="my-8" />

        <section className="py-10">
          <h2 className="text-2xl font-bold text-text mb-6">
            {t("tools.heading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <ToolCard
                key={tool.href}
                title={t(tool.titleKey)}
                description={t(tool.descKey)}
                href={tool.href}
                icon={tool.icon}
              />
            ))}
          </div>
        </section>

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

        <FAQSection items={resolvedFaq} />

        <AdBanner className="my-8" />
      </div>
    </>
  );
}
