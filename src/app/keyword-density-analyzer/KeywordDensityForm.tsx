"use client";

import { useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import TextEditor from "@/components/TextEditor";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import { getKeywordDensity, countWords } from "@/lib/utils";
import { useTextStore } from "@/hooks/useTextStore";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

export default function KeywordDensityForm() {
  const { t } = useLanguage();
  const { text, updateText, clearText, copyText, mounted } = useTextStore();

  const keywords = useMemo(() => getKeywordDensity(text), [text]);
  const totalWords = countWords(text);

  const faqItems = [
    { q: t("kd.faq.q1"), a: t("kd.faq.a1") },
    { q: t("kd.faq.q2"), a: t("kd.faq.a2") },
    { q: t("kd.faq.q3"), a: t("kd.faq.a3") },
    { q: t("kd.faq.q4"), a: t("kd.faq.a4") },
  ];

  const breadcrumbSchemaData = breadcrumbSchema([{ name: t("kd.h1"), url: "/keyword-density-analyzer" }]);

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-4 max-w-4xl mx-auto px-4 py-8">
        <div className="h-8 bg-bg-tertiary rounded w-64" />
        <div className="h-64 bg-bg-tertiary rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />
      <ToolLayout breadcrumbs={[{ name: t("kd.h1"), url: "/keyword-density-analyzer" }]}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">{t("kd.h1")}</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">{t("kd.desc")}</p>

        <div className="space-y-6">
          <TextEditor text={text} onChange={updateText} onClear={clearText} onCopy={copyText} />
          {text.trim() && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-text">
                  Keywords ({keywords.length}) from {totalWords} words
                </h2>
              </div>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-bg-secondary">
                      <th className="text-left px-4 py-2.5 font-medium text-text">#</th>
                      <th className="text-left px-4 py-2.5 font-medium text-text">Keyword</th>
                      <th className="text-right px-4 py-2.5 font-medium text-text">Count</th>
                      <th className="text-right px-4 py-2.5 font-medium text-text">Density</th>
                      <th className="hidden sm:table-cell text-right px-4 py-2.5 font-medium text-text">Bar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {keywords.map((kw, i) => (
                      <tr key={kw.word} className="hover:bg-bg-secondary/50 transition-colors">
                        <td className="px-4 py-2.5 text-text-muted">{i + 1}</td>
                        <td className="px-4 py-2.5 font-medium text-text">{kw.word}</td>
                        <td className="px-4 py-2.5 text-right text-text">{kw.count}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={`font-medium ${
                            kw.density > 3 ? "text-red-500" : kw.density > 1.5 ? "text-amber-500" : "text-emerald-500"
                          }`}>
                            {kw.density}%
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-4 py-2.5">
                          <div className="w-full h-1.5 rounded-full bg-bg-tertiary">
                            <div
                              className={`h-full rounded-full ${
                                kw.density > 3 ? "bg-red-500" : kw.density > 1.5 ? "bg-amber-500" : "bg-emerald-500"
                              }`}
                              style={{ width: `${Math.min(kw.density / 5 * 100, 100)}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {keywords.length === 0 && (
                <p className="text-xs text-text-muted text-center py-4">
                  No significant keywords found. Try adding more meaningful content.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-10 text-sm text-text-secondary leading-relaxed">
          <p>{t("kd.seo")}</p>
        </div>
        <FAQSection items={faqItems} />
        <RelatedTools current="/keyword-density-analyzer" />
      </ToolLayout>
    </>
  );
}
