"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import TextEditor from "@/components/TextEditor";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import { checkGrammar, type GrammarIssue } from "@/lib/utils";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

export default function GrammarCheckerForm() {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [checking, setChecking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const runCheck = useCallback(async (val: string) => {
    if (!val.trim()) {
      setIssues([]);
      return;
    }
    setChecking(true);
    const result = await checkGrammar(val);
    setIssues(result);
    setChecking(false);
  }, []);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => runCheck(text), 800);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [text, runCheck]);

  const faqItems = [
    { q: t("gc.faq.q1"), a: t("gc.faq.a1") },
    { q: t("gc.faq.q2"), a: t("gc.faq.a2") },
    { q: t("gc.faq.q3"), a: t("gc.faq.a3") },
    { q: t("gc.faq.q4"), a: t("gc.faq.a4") },
  ];

  const breadcrumbSchemaData = breadcrumbSchema([{ name: t("gc.h1"), url: "/grammar-checker" }]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />
      <ToolLayout breadcrumbs={[{ name: t("gc.h1"), url: "/grammar-checker" }]}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">{t("gc.h1")}</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">{t("gc.desc")}</p>

        <div className="space-y-6">
          <TextEditor text={text} onChange={setText} onClear={() => setText("")} onCopy={() => navigator.clipboard.writeText(text)} />
          {checking && (
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Checking grammar...
            </div>
          )}
          {!checking && issues.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-text">Found {issues.length} issue{issues.length > 1 ? "s" : ""}</h2>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {issues.filter(i => i.message !== "Grammar check service unavailable. Please try again.").map((issue, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-border bg-bg">
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                        <svg className="w-3 h-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                        </svg>
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm text-text">{issue.message}</p>
                        <p className="text-xs text-text-muted mt-0.5">Type: {issue.type}</p>
                        {issue.replacements.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {issue.replacements.map((rep, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  const before = text.slice(0, issue.offset);
                                  const after = text.slice(issue.offset + issue.length);
                                  setText(before + rep + after);
                                }}
                                className="px-2 py-0.5 text-xs rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                              >
                                {rep}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!checking && text.trim() && issues.length === 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-emerald-500">No issues found! Your text looks great.</span>
            </div>
          )}
        </div>

        <div className="mt-10 text-sm text-text-secondary leading-relaxed">
          <p>{t("gc.seo")}</p>
        </div>
        <FAQSection items={faqItems} />
        <RelatedTools current="/grammar-checker" />
      </ToolLayout>
    </>
  );
}
