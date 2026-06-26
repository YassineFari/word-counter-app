import type { Metadata } from "next";
import ToolPageContent from "@/components/ToolPageContent";

export const metadata: Metadata = {
  title: "Sentence Counter - Free Online Sentence Counter Tool",
  description:
    "Free online sentence counter tool. Instantly count the number of sentences in your text. Improve your writing structure, readability, and flow.",
  openGraph: {
    title: "Sentence Counter - Free Online Sentence Counter Tool",
    description:
      "Free online sentence counter tool. Instantly count sentences in any text.",
    url: "https://texttoolshub.com/sentence-counter",
  },
  twitter: {
    title: "Sentence Counter - Free Online Sentence Counter Tool",
    description:
      "Free online sentence counter tool. Instantly count sentences in any text.",
  },
  alternates: {
    canonical: "https://texttoolshub.com/sentence-counter",
  },
};

const faqItems = [
  { qKey: "sc.faq.q1", aKey: "sc.faq.a1" },
  { qKey: "sc.faq.q2", aKey: "sc.faq.a2" },
  { qKey: "sc.faq.q3", aKey: "sc.faq.a3" },
  { qKey: "sc.faq.q4", aKey: "sc.faq.a4" },
];

export default function SentenceCounterPage() {
  return (
    <ToolPageContent
      h1Key="sc.h1"
      descriptionKey="sc.desc"
      seoDescriptionKey="sc.seo"
      slug="sentence-counter"
      faqItems={faqItems}
      showAdditionalStats={true}
    />
  );
}
