import type { Metadata } from "next";
import ToolPageContent from "@/components/ToolPageContent";

export const metadata: Metadata = {
  title: "Reading Time Calculator - Calculate Reading Time | TextToolsHub",
  description:
    "Free online reading time calculator. Estimate how long it takes to read any text. Perfect for bloggers, writers, editors, and content creators.",
  openGraph: {
    title: "Reading Time Calculator - Calculate Reading Time | TextToolsHub",
    description:
      "Free online reading time calculator. Estimate reading time for any text.",
    url: "https://texttoolshub.com/reading-time-calculator",
  },
  twitter: {
    title: "Reading Time Calculator - Calculate Reading Time | TextToolsHub",
    description:
      "Free online reading time calculator. Estimate reading time for any text.",
  },
  alternates: {
    canonical: "https://texttoolshub.com/reading-time-calculator",
  },
};

const faqItems = [
  { qKey: "rt.faq.q1", aKey: "rt.faq.a1" },
  { qKey: "rt.faq.q2", aKey: "rt.faq.a2" },
  { qKey: "rt.faq.q3", aKey: "rt.faq.a3" },
  { qKey: "rt.faq.q4", aKey: "rt.faq.a4" },
  { qKey: "rt.faq.q5", aKey: "rt.faq.a5" },
];

export default function ReadingTimeCalculatorPage() {
  return (
    <ToolPageContent
      h1Key="rt.h1"
      descriptionKey="rt.desc"
      seoDescriptionKey="rt.seo"
      slug="reading-time-calculator"
      faqItems={faqItems}
      showAdditionalStats={true}
    />
  );
}
