"use client";

import { useState, useMemo, useCallback } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { getWordFrequency } from "@/lib/utils";
import type { WordFrequencyEntry } from "@/lib/utils";

type TopFilter = 10 | 20 | 0;

interface FAQItem {
  qKey: string;
  aKey: string;
}

export default function WordFrequencyForm({
  faqItems,
}: {
  faqItems: FAQItem[];
}) {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [excludeStopWords, setExcludeStopWords] = useState(false);
  const [topFilter, setTopFilter] = useState<TopFilter>(10);

  const frequencyData = useMemo(
    () => getWordFrequency(text, excludeStopWords),
    [text, excludeStopWords]
  );

  const topLabel = topFilter === 0 ? t("wf.all") : topFilter === 20 ? t("wf.top20") : t("wf.top10");

  const filteredData = useMemo(() => {
    if (topFilter === 0) return frequencyData;
    return frequencyData.slice(0, topFilter);
  }, [frequencyData, topFilter]);

  const maxCount = frequencyData.length > 0 ? frequencyData[0].count : 1;

  const totalUnique = frequencyData.length;
  const totalWords = text.trim()
    ? text.trim().toLowerCase().match(/\b\w+\b/g)?.length ?? 0
    : 0;

  const handleCopyTable = useCallback(async () => {
    const header = `${t("wf.table.word")}\t${t("wf.table.frequency")}\t${t("wf.table.percentage")}`;
    const rows = filteredData.map(
      (entry) => `${entry.word}\t${entry.count}\t${entry.percentage}%`
    );
    const tableText = [header, ...rows].join("\n");
    try {
      await navigator.clipboard.writeText(tableText);
    } catch {
      const el = document.createElement("textarea");
      el.value = tableText;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  }, [filteredData, t]);

  const resolvedFaq = faqItems.map((item) => ({
    q: t(item.qKey),
    a: t(item.aKey),
  }));

  const faqSchemaData = faqSchema(resolvedFaq);
  const breadcrumbSchemaData = breadcrumbSchema([
    { name: t("wf.h1"), url: "https://texttoolshub.com/word-frequency-counter" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }}
      />
      <ToolLayout
        breadcrumbs={[
          { name: t("wf.h1"), url: "/word-frequency-counter" },
        ]}
      >
        <article>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">
            {t("wf.h1")}
          </h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            {t("wf.desc")}
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="wf-editor"
                className="text-sm font-medium text-text"
              >
                {t("editor.label")}
              </label>
              <textarea
                id="wf-editor"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t("editor.placeholder")}
                className="w-full h-64 sm:h-80 p-4 rounded-xl border border-border bg-bg text-text placeholder:text-text-muted resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm leading-relaxed"
              />
            </div>

            {text.trim() && (
              <>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-bg border border-border rounded-lg p-1">
                    {([10, 20, 0] as TopFilter[]).map((val) => (
                      <button
                        key={val}
                        onClick={() => setTopFilter(val)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                          topFilter === val
                            ? "bg-primary text-white"
                            : "text-text-secondary hover:text-text"
                        }`}
                      >
                        {val === 0 ? t("wf.all") : val === 20 ? t("wf.top20") : t("wf.top10")}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setExcludeStopWords(!excludeStopWords)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                      excludeStopWords
                        ? "bg-primary text-white border-primary"
                        : "border-border text-text-secondary hover:bg-bg-tertiary"
                    }`}
                  >
                    {excludeStopWords ? t("wf.excludeStopWords") : t("wf.includeStopWords")}
                  </button>
                  <button
                    onClick={() => setText("")}
                    disabled={!text.trim()}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {t("editor.clear")}
                  </button>
                  <button
                    onClick={handleCopyTable}
                    disabled={filteredData.length === 0}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {t("wf.copyTable")}
                  </button>
                </div>

                <div className="flex gap-4 text-sm text-text-secondary">
                  <span>
                    <strong className="text-text">{totalUnique}</strong>{" "}
                    {t("wf.totalUnique")}
                  </span>
                  <span>
                    <strong className="text-text">{totalWords}</strong>{" "}
                    {t("stats.words")}
                  </span>
                </div>

                {filteredData.length > 0 ? (
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-bg-secondary border-b border-border">
                          <th className="text-left px-4 py-3 font-semibold text-text">
                            #
                          </th>
                          <th className="text-left px-4 py-3 font-semibold text-text">
                            {t("wf.table.word")}
                          </th>
                          <th className="text-right px-4 py-3 font-semibold text-text">
                            {t("wf.table.frequency")}
                          </th>
                          <th className="text-right px-4 py-3 font-semibold text-text">
                            {t("wf.table.percentage")}
                          </th>
                          <th className="px-4 py-3 font-semibold text-text">
                            {t("wf.table.progress")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((entry, index) => (
                          <tr
                            key={entry.word}
                            className={`border-b border-border ${
                              index % 2 === 0 ? "bg-bg" : "bg-bg-secondary/50"
                            }`}
                          >
                            <td className="px-4 py-2.5 text-text-secondary text-xs w-8">
                              {index + 1}
                            </td>
                            <td className="px-4 py-2.5 font-medium text-text">
                              {entry.word}
                            </td>
                            <td className="px-4 py-2.5 text-right text-text-secondary tabular-nums">
                              {entry.count}
                            </td>
                            <td className="px-4 py-2.5 text-right text-text-secondary tabular-nums">
                              {entry.percentage}%
                            </td>
                            <td className="px-4 py-2.5">
                              <div className="w-full bg-bg-tertiary rounded-full h-2.5">
                                <div
                                  className="bg-primary rounded-full h-2.5 transition-all duration-300"
                                  style={{
                                    width: `${Math.max(
                                      1,
                                      (entry.count / maxCount) * 100
                                    )}%`,
                                  }}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-text-muted">{t("wf.noResults")}</p>
                )}
              </>
            )}

            {!text.trim() && (
              <p className="text-sm text-text-muted">{t("wf.noResults")}</p>
            )}
          </div>

          <div className="mt-10 prose prose-gray max-w-none text-sm sm:text-base text-text-secondary leading-relaxed space-y-4">
            <p>{t("wf.seo")}</p>
          </div>

          <FAQSection items={resolvedFaq} />
          <RelatedTools current="/word-frequency-counter" />
        </article>
      </ToolLayout>
    </>
  );
}
