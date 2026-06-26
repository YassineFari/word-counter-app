"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import TextEditor from "@/components/TextEditor";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import { rewriteText } from "@/lib/utils";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

export default function TextRewriterForm() {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [rewritten, setRewritten] = useState("");
  const [intensity, setIntensity] = useState<"light" | "medium" | "strong">("medium");

  const handleRewrite = () => {
    if (!text.trim()) return;
    setRewritten(rewriteText(text, intensity));
  };

  const faqItems = [
    { q: t("tr.faq.q1"), a: t("tr.faq.a1") },
    { q: t("tr.faq.q2"), a: t("tr.faq.a2") },
    { q: t("tr.faq.q3"), a: t("tr.faq.a3") },
    { q: t("tr.faq.q4"), a: t("tr.faq.a4") },
  ];

  const breadcrumbSchemaData = breadcrumbSchema([{ name: t("tr.h1"), url: "/text-rewriter" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />
      <ToolLayout breadcrumbs={[{ name: t("tr.h1"), url: "/text-rewriter" }]}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">{t("tr.h1")}</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">{t("tr.desc")}</p>

        <div className="space-y-6">
          <TextEditor text={text} onChange={setText} onClear={() => { setText(""); setRewritten(""); }} onCopy={() => navigator.clipboard.writeText(text)} />
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary font-medium">Intensity:</span>
              {(["light", "medium", "strong"] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setIntensity(opt)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    intensity === opt
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-text-secondary hover:bg-bg-tertiary"
                  }`}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={handleRewrite}
              disabled={!text.trim()}
              className="px-6 py-2 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Rewrite Text
            </button>
          </div>
          {rewritten && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-text">Rewritten Version</h2>
                <button
                  onClick={() => navigator.clipboard.writeText(rewritten)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary transition-colors"
                >
                  Copy
                </button>
              </div>
              <div className="p-4 rounded-xl border border-border bg-bg-secondary text-text text-sm leading-relaxed whitespace-pre-wrap">
                {rewritten}
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 text-sm text-text-secondary leading-relaxed">
          <p>{t("tr.seo")}</p>
        </div>
        <FAQSection items={faqItems} />
        <RelatedTools current="/text-rewriter" />
      </ToolLayout>
    </>
  );
}
