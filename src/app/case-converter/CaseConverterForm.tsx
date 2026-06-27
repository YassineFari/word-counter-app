"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  toCamelCase,
  toSnakeCase,
} from "@/lib/utils";

type CaseType = "upper" | "lower" | "title" | "sentence" | "camel" | "snake";

const caseFunctions: Record<CaseType, (text: string) => string> = {
  upper: toUpperCase,
  lower: toLowerCase,
  title: toTitleCase,
  sentence: toSentenceCase,
  camel: toCamelCase,
  snake: toSnakeCase,
};

const buttons: { id: CaseType; label: string; preview: string }[] = [
  { id: "upper", label: "UPPER CASE", preview: "EXAMPLE" },
  { id: "lower", label: "lower case", preview: "example" },
  { id: "title", label: "Title Case", preview: "Example Text" },
  { id: "sentence", label: "Sentence case", preview: "Example sentence." },
  { id: "camel", label: "camelCase", preview: "exampleText" },
  { id: "snake", label: "snake_case", preview: "example_text" },
];

interface FAQItem {
  qKey: string;
  aKey: string;
}

export default function CaseConverterForm({
  faqItems,
}: {
  faqItems: FAQItem[];
}) {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [activeCase, setActiveCase] = useState<CaseType | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = useCallback((caseType: CaseType) => {
    const fn = caseFunctions[caseType];
    if (fn) {
      setText((prev) => fn(prev));
      setActiveCase(caseType);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const handleClear = useCallback(() => {
    setText("");
    setActiveCase(null);
  }, []);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  const resolvedFaq = faqItems.map((item) => ({
    q: t(item.qKey),
    a: t(item.aKey),
  }));

  const faqSchemaData = faqSchema(resolvedFaq);
  const breadcrumbSchemaData = breadcrumbSchema([
    { name: t("case.h1"), url: "https://texttoolshub.com/case-converter" },
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
          { name: t("case.h1"), url: "/case-converter" },
        ]}
      >
        <article>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">
            {t("case.h1")}
          </h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            {t("case.desc")}
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="case-editor"
                  className="text-sm font-medium text-text"
                >
                  {t("editor.label")}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    disabled={!text}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {copied ? "Copied!" : t("editor.copy")}
                  </button>
                  <button
                    onClick={handleClear}
                    disabled={!text}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {t("editor.clear")}
                  </button>
                </div>
              </div>
              <textarea
                id="case-editor"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setActiveCase(null);
                }}
                placeholder={t("editor.placeholder")}
                className="w-full h-64 sm:h-80 p-4 rounded-xl border border-border bg-bg text-text placeholder:text-text-muted resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {buttons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => handleConvert(btn.id)}
                  className={`flex flex-col items-center justify-center gap-1 p-4 rounded-xl font-medium text-sm transition-all ${
                    activeCase === btn.id
                      ? "bg-primary text-white shadow-md"
                      : "border border-border bg-bg text-text hover:bg-bg-tertiary"
                  }`}
                >
                  <span>{btn.label}</span>
                  <span
                    className={`text-xs ${
                      activeCase === btn.id ? "text-white/70" : "text-text-muted"
                    }`}
                  >
                    {btn.preview}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-4 text-sm text-text-secondary">
              <span>
                <strong className="text-text">{words}</strong>{" "}
                {t("stats.words")}
              </span>
              <span>
                <strong className="text-text">{chars}</strong>{" "}
                {t("stats.characters")}
              </span>
            </div>
          </div>

          <div className="mt-10 prose prose-gray max-w-none text-sm sm:text-base text-text-secondary leading-relaxed space-y-4">
            <p>{t("case.seo")}</p>
          </div>

          <FAQSection items={resolvedFaq} />
          <RelatedTools current="/case-converter" />
        </article>
      </ToolLayout>
    </>
  );
}
