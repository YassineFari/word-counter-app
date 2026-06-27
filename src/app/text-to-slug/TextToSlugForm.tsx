"use client";

import { useState, useMemo, useCallback } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { toSlug } from "@/lib/utils";

interface SlugOptions {
  separator: "-" | "_";
  lowercase: boolean;
  removeNumbers: boolean;
  maxLength: number;
}

interface FAQItem {
  qKey: string;
  aKey: string;
}

export default function TextToSlugForm({ faqItems }: { faqItems: FAQItem[] }) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [input, setInput] = useState("");
  const [bulkInput, setBulkInput] = useState("");
  const [options, setOptions] = useState<SlugOptions>({
    separator: "-",
    lowercase: true,
    removeNumbers: false,
    maxLength: 0,
  });

  const slug = useMemo(
    () => toSlug(input, options),
    [input, options]
  );

  const bulkSlugs = useMemo(() => {
    if (!bulkInput.trim()) return [];
    return bulkInput
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((title) => ({
        title,
        slug: toSlug(title, options),
      }));
  }, [bulkInput, options]);

  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = useCallback(async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  const updateOption = <K extends keyof SlugOptions>(
    key: K,
    value: SlugOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const resolvedFaq = faqItems.map((item) => ({
    q: t(item.qKey),
    a: t(item.aKey),
  }));

  const faqSchemaData = faqSchema(resolvedFaq);
  const breadcrumbSchemaData = breadcrumbSchema([
    { name: t("slug.h1"), url: "https://texttoolshub.com/text-to-slug" },
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
          { name: t("slug.h1"), url: "/text-to-slug" },
        ]}
      >
        <article>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">
            {t("slug.h1")}
          </h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            {t("slug.desc")}
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-2 bg-bg border border-border rounded-lg p-1 w-fit">
              {(["single", "bulk"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    mode === m
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text"
                  }`}
                >
                  {m === "single" ? t("slug.single") : t("slug.bulk")}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-text-secondary">
                  {t("slug.separator")}
                </label>
                <select
                  value={options.separator}
                  onChange={(e) =>
                    updateOption("separator", e.target.value as "-" | "_")
                  }
                  className="px-2 py-1.5 text-sm rounded-lg border border-border bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="-">- (hyphen)</option>
                  <option value="_">_ (underscore)</option>
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm text-text cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) => updateOption("lowercase", e.target.checked)}
                  className="accent-[var(--color-primary)] w-4 h-4"
                />
                {t("slug.lowercase")}
              </label>
              <label className="flex items-center gap-2 text-sm text-text cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={options.removeNumbers}
                  onChange={(e) => updateOption("removeNumbers", e.target.checked)}
                  className="accent-[var(--color-primary)] w-4 h-4"
                />
                {t("slug.removeNumbers")}
              </label>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-text-secondary">
                  {t("slug.maxLength")}
                </label>
                <input
                  type="number"
                  min={0}
                  max={200}
                  value={options.maxLength}
                  onChange={(e) =>
                    updateOption("maxLength", Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className="w-16 px-2 py-1.5 text-sm rounded-lg border border-border bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>

            {mode === "single" ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("slug.inputPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                />
                {input.trim() && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-text-secondary">
                        {t("slug.generatedSlug")}
                      </label>
                      <button
                        onClick={() => handleCopy(slug, "single")}
                        className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary transition-colors"
                      >
                        {copied === "single" ? "Copied!" : t("editor.copy")}
                      </button>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-primary font-mono text-lg break-all">
                      {slug || t("slug.emptySlug")}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder={t("slug.bulkPlaceholder")}
                  className="w-full h-40 p-4 rounded-xl border border-border bg-bg text-text placeholder:text-text-muted resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm leading-relaxed"
                />
                {bulkSlugs.length > 0 && (
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-bg-secondary border-b border-border">
                          <th className="text-left px-4 py-3 font-semibold text-text">
                            {t("slug.tableTitle")}
                          </th>
                          <th className="text-left px-4 py-3 font-semibold text-text">
                            {t("slug.tableSlug")}
                          </th>
                          <th className="w-20 px-4 py-3" />
                        </tr>
                      </thead>
                      <tbody>
                        {bulkSlugs.map((item, i) => (
                          <tr
                            key={i}
                            className={`border-b border-border ${
                              i % 2 === 0 ? "bg-bg" : "bg-bg-secondary/50"
                            }`}
                          >
                            <td className="px-4 py-2.5 text-text max-w-[200px] truncate">
                              {item.title}
                            </td>
                            <td className="px-4 py-2.5 text-primary font-mono text-xs max-w-[250px] truncate">
                              {item.slug}
                            </td>
                            <td className="px-4 py-2.5">
                              <button
                                onClick={() => handleCopy(item.slug, `bulk-${i}`)}
                                className="px-2 py-1 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary transition-colors"
                              >
                                {copied === `bulk-${i}` ? "Copied!" : t("editor.copy")}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-10 prose prose-gray max-w-none text-sm sm:text-base text-text-secondary leading-relaxed space-y-4">
            <p>{t("slug.seo")}</p>
          </div>

          <FAQSection items={resolvedFaq} />
          <RelatedTools current="/text-to-slug" />
        </article>
      </ToolLayout>
    </>
  );
}
