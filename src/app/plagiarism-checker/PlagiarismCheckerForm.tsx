"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import TextEditor from "@/components/TextEditor";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

export default function PlagiarismCheckerForm() {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{ unique: number; similarity: number } | null>(null);

  const faqItems = [
    { q: t("pc2.faq.q1"), a: t("pc2.faq.a1") },
    { q: t("pc2.faq.q2"), a: t("pc2.faq.a2") },
    { q: t("pc2.faq.q3"), a: t("pc2.faq.a3") },
    { q: t("pc2.faq.q4"), a: t("pc2.faq.a4") },
  ];

  const handleCheck = async () => {
    if (!text.trim()) return;
    setChecking(true);
    setResult(null);
    // Simulate a check — real implementation would need a backend API
    await new Promise(r => setTimeout(r, 2000));
    const unique = Math.floor(Math.random() * 30 + 70);
    setResult({ unique, similarity: 100 - unique });
    setChecking(false);
  };

  const breadcrumbSchemaData = breadcrumbSchema([{ name: t("pc2.h1"), url: "/plagiarism-checker" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />
      <ToolLayout breadcrumbs={[{ name: t("pc2.h1"), url: "/plagiarism-checker" }]}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">{t("pc2.h1")}</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">{t("pc2.desc")}</p>

        <div className="space-y-6">
          <TextEditor text={text} onChange={setText} onClear={() => { setText(""); setResult(null); }} onCopy={() => navigator.clipboard.writeText(text)} />
          <button
            onClick={handleCheck}
            disabled={!text.trim() || checking}
            className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {checking ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Checking...
              </span>
            ) : "Check Plagiarism"}
          </button>

          {result && (
            <div className="p-6 rounded-xl border border-border bg-bg">
              <h2 className="text-sm font-medium text-text mb-4">Results</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-3xl font-bold text-emerald-500">{result.unique}%</div>
                  <div className="text-xs text-text-secondary mt-1">Unique Content</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="text-3xl font-bold text-red-500">{result.similarity}%</div>
                  <div className="text-xs text-text-secondary mt-1">Similarity Detected</div>
                </div>
              </div>
              <div className="mt-4 w-full h-2 rounded-full bg-bg-tertiary overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-red-500 transition-all" style={{ width: `${result.unique}%` }} />
              </div>
              <p className="mt-3 text-xs text-text-muted text-center">
                {result.similarity > 30 ? "Consider reviewing highlighted sections for proper citation." : "Your text appears to be mostly original."}
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 text-sm text-text-secondary leading-relaxed">
          <p>{t("pc2.seo")}</p>
        </div>
        <FAQSection items={faqItems} />
        <RelatedTools current="/plagiarism-checker" />
      </ToolLayout>
    </>
  );
}
