"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

export default function MetaDescriptionForm() {
  const { t } = useLanguage();
  const [meta, setMeta] = useState("");
  const [url, setUrl] = useState("https://example.com/page");
  const [title, setTitle] = useState("Page Title");

  const charCount = meta.length;
  const idealMin = 150;
  const idealMax = 160;

  const faqItems = [
    { q: t("md.faq.q1"), a: t("md.faq.a1") },
    { q: t("md.faq.q2"), a: t("md.faq.a2") },
    { q: t("md.faq.q3"), a: t("md.faq.a3") },
    { q: t("md.faq.q4"), a: t("md.faq.a4") },
  ];

  const breadcrumbSchemaData = breadcrumbSchema([{ name: t("md.h1"), url: "/meta-description-analyzer" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />
      <ToolLayout breadcrumbs={[{ name: t("md.h1"), url: "/meta-description-analyzer" }]}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">{t("md.h1")}</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">{t("md.desc")}</p>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text mb-1.5">Page Title</label>
              <input
                type="text" value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-text mb-1.5">Page URL</label>
              <input
                type="text" value={url}
                onChange={e => setUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text mb-1.5">Meta Description</label>
            <textarea
              value={meta}
              onChange={e => setMeta(e.target.value)}
              placeholder="Write your meta description here..."
              rows={3}
              className="w-full p-3 rounded-xl border border-border bg-bg text-text placeholder:text-text-muted resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-border bg-bg">
            <div className="text-center">
              <div className={`text-2xl font-bold ${charCount > idealMax ? "text-red-500" : charCount >= idealMin ? "text-emerald-500" : "text-amber-500"}`}>
                {charCount}
              </div>
              <div className="text-xs text-text-muted mt-0.5">Characters</div>
            </div>
            <div className="flex-1 h-2 rounded-full bg-bg-tertiary overflow-hidden min-w-[100px]">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-500 via-emerald-500 to-red-500 transition-all" style={{
                width: `${Math.min((charCount / 200) * 100, 100)}%`
              }} />
            </div>
            <div className="text-xs text-text-muted">
              Ideal: {idealMin}-{idealMax} chars
              {charCount > 0 && (
                <span className="block mt-0.5">
                  {charCount < idealMin ? `+${idealMin - charCount} more needed` :
                   charCount > idealMax ? `-${charCount - idealMax} over limit` :
                   "Great length!"}
                </span>
              )}
            </div>
          </div>

          {meta && (
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-text">Google SERP Preview</h2>
              <div className="p-4 rounded-xl border border-border bg-white text-left max-w-[600px]">
                <div className="text-xs text-[#006621] truncate">{url}</div>
                <div className="text-sm text-[#1a0dab] font-medium leading-tight pt-0.5">{title}</div>
                <div className="text-xs text-[#545454] leading-relaxed pt-0.5 line-clamp-2">
                  {meta || "Your meta description will appear here..."}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 text-sm text-text-secondary leading-relaxed">
          <p>{t("md.seo")}</p>
        </div>
        <FAQSection items={faqItems} />
        <RelatedTools current="/meta-description-analyzer" />
      </ToolLayout>
    </>
  );
}
