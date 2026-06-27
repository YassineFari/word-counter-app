"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import ToolLayout from "@/components/ToolLayout";
import FAQSection from "@/components/FAQSection";
import AdBanner from "@/components/AdBanner";
import { checkPasswordStrength } from "@/lib/utils";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

const faqItems = [
  { qKey: "ps.faq.q1", aKey: "ps.faq.a1" },
  { qKey: "ps.faq.q2", aKey: "ps.faq.a2" },
  { qKey: "ps.faq.q3", aKey: "ps.faq.a3" },
  { qKey: "ps.faq.q4", aKey: "ps.faq.a4" },
  { qKey: "ps.faq.q5", aKey: "ps.faq.a5" },
];

export default function PasswordStrengthForm() {
  const { t } = useLanguage();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const result = useMemo(() => checkPasswordStrength(password), [password]);

  const resolvedFaq = faqItems.map((item) => ({
    q: t(item.qKey),
    a: t(item.aKey),
  }));

  const faqSchemaData = faqSchema(resolvedFaq);
  const breadcrumbSchemaData = breadcrumbSchema([
    { name: t("ps.h1"), url: "https://texttoolshub.com/password-strength-checker" },
  ]);

  const strengthLabelMap: Record<string, string> = {
    None: "",
    Weak: t("ps.weak"),
    Fair: t("ps.fair"),
    Strong: t("ps.strong"),
    "Very Strong": t("ps.veryStrong"),
  };

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
          { name: t("ps.h1"), url: "/password-strength-checker" },
        ]}
      >
        <article>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">
            {t("ps.h1")}
          </h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            {t("ps.desc")}
          </p>

          <div className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="ps-input"
                className="text-sm font-medium text-text"
              >
                {t("ps.label")}
              </label>
              <div className="relative">
                <input
                  id="ps-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("ps.placeholder")}
                  className="w-full h-12 sm:h-14 px-4 pr-12 rounded-xl border border-border bg-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-base"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-text-secondary hover:text-text hover:bg-bg-tertiary transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {password.length > 0 && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-text">
                      {t("ps.strength")}
                    </span>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full text-white ${result.color.replace("bg-", "bg-")}`}
                      style={{ backgroundColor: result.color.replace("bg-", "") === "bg-red-500" ? "#ef4444" : result.color.replace("bg-", "") === "bg-orange-500" ? "#f97316" : result.color.replace("bg-", "") === "bg-yellow-500" ? "#eab308" : result.color.replace("bg-", "") === "bg-green-500" ? "#22c55e" : "#6b7280" }}
                    >
                      {strengthLabelMap[result.label] || result.label}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-bg-tertiary overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ease-out ${result.color}`}
                      style={{ width: `${(result.score / 4) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>{t("ps.weak")}</span>
                    <span>{t("ps.veryStrong")}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-text">
                    {t("ps.checks")}
                  </h3>
                  <div className="space-y-2">
                    {([
                      { key: "length", labelKey: "ps.check.length" },
                      { key: "uppercase", labelKey: "ps.check.uppercase" },
                      { key: "lowercase", labelKey: "ps.check.lowercase" },
                      { key: "numbers", labelKey: "ps.check.numbers" },
                      { key: "symbols", labelKey: "ps.check.symbols" },
                    ] as const).map((check) => {
                      const passed = result.checks[check.key];
                      return (
                        <div
                          key={check.key}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                            passed
                              ? "border-green-500/30 bg-green-500/5 text-green-600 dark:text-green-400"
                              : "border-border text-text-secondary"
                          }`}
                        >
                          {passed ? (
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          <span>{t(check.labelKey)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {result.tips.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-text">
                      {t("ps.tips")}
                    </h3>
                    <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
                      <ul className="space-y-2">
                        {result.tips.map((tip, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400"
                          >
                            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => { setPassword(""); setShowPassword(false); }}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary transition-colors"
                >
                  {t("editor.clear")}
                </button>
              </>
            )}

            {password.length === 0 && (
              <div className="p-8 rounded-xl border border-border bg-bg-secondary/50 text-center">
                <svg className="w-12 h-12 mx-auto text-text-muted mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-sm text-text-muted">
                  {t("ps.placeholder")}
                </p>
              </div>
            )}
          </div>

          <AdBanner className="my-8" />

          <div className="mt-10 prose prose-gray max-w-none text-sm sm:text-base text-text-secondary leading-relaxed space-y-4">
            <p>{t("ps.seo")}</p>
          </div>

          <FAQSection items={resolvedFaq} />
        </article>
      </ToolLayout>
    </>
  );
}
