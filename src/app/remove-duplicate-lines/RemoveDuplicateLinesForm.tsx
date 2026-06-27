"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { removeDuplicateLines } from "@/lib/utils";

interface Options {
  caseSensitive: boolean;
  trimWhitespace: boolean;
  removeEmptyLines: boolean;
  sortLines: boolean;
}

interface FAQItem {
  qKey: string;
  aKey: string;
}

export default function RemoveDuplicateLinesForm({
  faqItems,
}: {
  faqItems: FAQItem[];
}) {
  const { t } = useLanguage();
  const [input, setInput] = useState("");
  const [realTime, setRealTime] = useState(true);
  const [options, setOptions] = useState<Options>({
    caseSensitive: false,
    trimWhitespace: true,
    removeEmptyLines: true,
    sortLines: false,
  });
  const [copied, setCopied] = useState(false);

  const toggleOption = (key: keyof Options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const result = removeDuplicateLines(input, options);

  const handleCopy = useCallback(async () => {
    if (!result.output) return;
    try {
      await navigator.clipboard.writeText(result.output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = result.output;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [result.output]);

  const handleClear = useCallback(() => {
    setInput("");
  }, []);

  const resolvedFaq = faqItems.map((item) => ({
    q: t(item.qKey),
    a: t(item.aKey),
  }));

  const faqSchemaData = faqSchema(resolvedFaq);
  const breadcrumbSchemaData = breadcrumbSchema([
    {
      name: t("rd.h1"),
      url: "https://texttoolshub.com/remove-duplicate-lines",
    },
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
          { name: t("rd.h1"), url: "/remove-duplicate-lines" },
        ]}
      >
        <article>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">
            {t("rd.h1")}
          </h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            {t("rd.desc")}
          </p>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-text-secondary">
                  {t("rd.realTime")}
                </label>
                <button
                  onClick={() => setRealTime(!realTime)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    realTime ? "bg-primary" : "bg-bg-tertiary"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                      realTime ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
              <button
                onClick={handleClear}
                disabled={!input}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {t("editor.clear")}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-text-secondary">
                  {t("rd.input")}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("rd.inputPlaceholder")}
                  className="w-full h-72 p-4 rounded-xl border border-border bg-bg text-text placeholder:text-text-muted resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm leading-relaxed"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-text-secondary">
                    {t("rd.output")}
                  </label>
                  <button
                    onClick={handleCopy}
                    disabled={!result.output}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {copied ? "Copied!" : t("editor.copy")}
                  </button>
                </div>
                <textarea
                  value={result.output}
                  readOnly
                  placeholder={t("rd.outputPlaceholder")}
                  className="w-full h-72 p-4 rounded-xl border border-border bg-bg-secondary text-text placeholder:text-text-muted resize-none text-sm leading-relaxed"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-text cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={options.caseSensitive}
                  onChange={() => toggleOption("caseSensitive")}
                  className="accent-[var(--color-primary)] w-4 h-4"
                />
                {t("rd.caseSensitive")}
              </label>
              <label className="flex items-center gap-2 text-sm text-text cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={options.trimWhitespace}
                  onChange={() => toggleOption("trimWhitespace")}
                  className="accent-[var(--color-primary)] w-4 h-4"
                />
                {t("rd.trimWhitespace")}
              </label>
              <label className="flex items-center gap-2 text-sm text-text cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={options.removeEmptyLines}
                  onChange={() => toggleOption("removeEmptyLines")}
                  className="accent-[var(--color-primary)] w-4 h-4"
                />
                {t("rd.removeEmptyLines")}
              </label>
              <label className="flex items-center gap-2 text-sm text-text cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={options.sortLines}
                  onChange={() => toggleOption("sortLines")}
                  className="accent-[var(--color-primary)] w-4 h-4"
                />
                {t("rd.sortLines")}
              </label>
            </div>

            {input.trim() && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="text-lg">&#10003;</span>
                <span>
                  {t("rd.stats")
                    .replace("{removed}", String(result.removed))
                    .replace("{remaining}", String(result.remaining))}
                </span>
              </div>
            )}
          </div>

          <div className="mt-10 prose prose-gray max-w-none text-sm sm:text-base text-text-secondary leading-relaxed space-y-4">
            <p>{t("rd.seo")}</p>
          </div>

          <FAQSection items={resolvedFaq} />
          <RelatedTools current="/remove-duplicate-lines" />
        </article>
      </ToolLayout>
    </>
  );
}
