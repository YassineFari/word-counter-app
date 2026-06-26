"use client";

import { useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import TextEditor from "@/components/TextEditor";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import RelatedTools from "@/components/RelatedTools";
import { calculateFleschReadingEase, calculateFleschKincaidGrade, getReadabilityLabel, getReadabilityGradeLabel, countWords, countSentences, countCharacters } from "@/lib/utils";
import { useTextStore } from "@/hooks/useTextStore";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

export default function ReadabilityScoreForm() {
  const { t } = useLanguage();
  const { text, updateText, clearText, copyText, mounted } = useTextStore();

  const scores = useMemo(() => {
    if (!text.trim()) return null;
    const flesch = calculateFleschReadingEase(text);
    const grade = calculateFleschKincaidGrade(text);
    return {
      flesch: Math.round(flesch * 10) / 10,
      label: getReadabilityLabel(flesch),
      grade,
      gradeLabel: getReadabilityGradeLabel(grade),
      words: countWords(text),
      sentences: countSentences(text),
      chars: countCharacters(text),
    };
  }, [text]);

  const faqItems = [
    { q: t("rs.faq.q1"), a: t("rs.faq.a1") },
    { q: t("rs.faq.q2"), a: t("rs.faq.a2") },
    { q: t("rs.faq.q3"), a: t("rs.faq.a3") },
    { q: t("rs.faq.q4"), a: t("rs.faq.a4") },
  ];

  const breadcrumbSchemaData = breadcrumbSchema([{ name: t("rs.h1"), url: "/readability-score" }]);

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-4 max-w-4xl mx-auto px-4 py-8">
        <div className="h-8 bg-bg-tertiary rounded w-64" />
        <div className="h-64 bg-bg-tertiary rounded-xl" />
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-green-500";
    if (score >= 50) return "text-amber-500";
    if (score >= 30) return "text-orange-500";
    return "text-red-500";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-green-500";
    if (score >= 50) return "bg-amber-500";
    if (score >= 30) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />
      <ToolLayout breadcrumbs={[{ name: t("rs.h1"), url: "/readability-score" }]}>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">{t("rs.h1")}</h1>
        <p className="text-text-secondary mb-8 leading-relaxed">{t("rs.desc")}</p>

        <div className="space-y-6">
          <TextEditor text={text} onChange={updateText} onClear={clearText} onCopy={copyText} />
          {scores && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl border border-border bg-bg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-text">Flesch Reading Ease</h3>
                    <span className={`text-2xl font-bold ${getScoreColor(scores.flesch)}`}>{scores.flesch}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-bg-tertiary">
                    <div className={`h-full rounded-full ${getScoreBg(scores.flesch)}`} style={{ width: `${scores.flesch}%` }} />
                  </div>
                  <p className="text-xs text-text-secondary mt-2">{scores.label}</p>
                </div>
                <div className="p-5 rounded-xl border border-border bg-bg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-text">Flesch-Kincaid Grade</h3>
                    <span className="text-2xl font-bold text-primary">{scores.grade}</span>
                  </div>
                  <p className="text-xs text-text-muted mt-1">Grade Level</p>
                  <p className="text-sm text-text-secondary mt-1">{scores.gradeLabel}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 text-center rounded-lg border border-border bg-bg">
                  <div className="text-lg font-bold text-text">{scores.words}</div>
                  <div className="text-xs text-text-secondary">Words</div>
                </div>
                <div className="p-3 text-center rounded-lg border border-border bg-bg">
                  <div className="text-lg font-bold text-text">{scores.sentences}</div>
                  <div className="text-xs text-text-secondary">Sentences</div>
                </div>
                <div className="p-3 text-center rounded-lg border border-border bg-bg">
                  <div className="text-lg font-bold text-text">{scores.chars}</div>
                  <div className="text-xs text-text-secondary">Characters</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 text-sm text-text-secondary leading-relaxed">
          <p>{t("rs.seo")}</p>
        </div>
        <FAQSection items={faqItems} />
        <RelatedTools current="/readability-score" />
      </ToolLayout>
    </>
  );
}
