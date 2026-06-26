import type { Metadata } from "next";
import ToolPageContent from "@/components/ToolPageContent";

export const metadata: Metadata = {
  title: "Character Counter - Free Online Character Counter Tool",
  description:
    "Free online character counter tool. Count characters with and without spaces. Ideal for tweets, bios, meta descriptions, SMS, and character-limited content.",
  openGraph: {
    title: "Character Counter - Free Online Character Counter Tool",
    description:
      "Free online character counter tool. Count characters with and without spaces.",
    url: "https://texttoolshub.com/character-counter",
  },
  twitter: {
    title: "Character Counter - Free Online Character Counter Tool",
    description:
      "Free online character counter tool. Count characters with and without spaces.",
  },
  alternates: {
    canonical: "https://texttoolshub.com/character-counter",
  },
};

const faqItems = [
  { qKey: "cc.faq.q1", aKey: "cc.faq.a1" },
  { qKey: "cc.faq.q2", aKey: "cc.faq.a2" },
  { qKey: "cc.faq.q3", aKey: "cc.faq.a3" },
  { qKey: "cc.faq.q4", aKey: "cc.faq.a4" },
];

export default function CharacterCounterPage() {
  return (
    <ToolPageContent
      h1Key="cc.h1"
      descriptionKey="cc.desc"
      seoDescriptionKey="cc.seo"
      slug="character-counter"
      faqItems={faqItems}
      showAdditionalStats={true}
    />
  );
}
