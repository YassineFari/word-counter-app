import type { Metadata } from "next";
import CaseConverterForm from "./CaseConverterForm";

export const metadata: Metadata = {
  title: "Case Converter - Free Online Text Case Converter Tool",
  description:
    "Convert text to uppercase, lowercase, title case, sentence case, camelCase and snake_case instantly. Free online case converter tool.",
  openGraph: {
    title: "Case Converter - Free Online Text Case Converter Tool",
    description:
      "Convert text to uppercase, lowercase, title case, sentence case, camelCase and snake_case instantly.",
    url: "https://texttoolshub.com/case-converter",
  },
  twitter: {
    title: "Case Converter - Free Online Text Case Converter Tool",
    description:
      "Convert text to uppercase, lowercase, title case, sentence case, camelCase and snake_case instantly.",
  },
  alternates: {
    canonical: "https://texttoolshub.com/case-converter",
  },
};

const faqItems = [
  { qKey: "case.faq.q1", aKey: "case.faq.a1" },
  { qKey: "case.faq.q2", aKey: "case.faq.a2" },
  { qKey: "case.faq.q3", aKey: "case.faq.a3" },
  { qKey: "case.faq.q4", aKey: "case.faq.a4" },
  { qKey: "case.faq.q5", aKey: "case.faq.a5" },
];

export default function CaseConverterPage() {
  return <CaseConverterForm faqItems={faqItems} />;
}
