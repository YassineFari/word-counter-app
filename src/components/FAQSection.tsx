"use client";

import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQSection({
  items,
  title,
}: {
  items: FAQItem[];
  title?: string;
}) {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const heading = title || t("faq.heading");

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-text mb-6">{heading}</h2>
      <div id="faq" className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-border rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left bg-bg hover:bg-bg-secondary transition-colors"
            >
              <span className="font-medium text-text text-sm sm:text-base">
                {item.q}
              </span>
              <svg
                className={`w-5 h-5 text-text-secondary shrink-0 ml-4 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-sm text-text-secondary leading-relaxed">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
