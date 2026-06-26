import type { Metadata } from "next";
import ToolPageContent from "@/components/ToolPageContent";

export const metadata: Metadata = {
  title: "Paragraph Counter - Free Online Paragraph Counter Tool",
  description:
    "Free online paragraph counter tool. Count paragraphs in your text instantly. Organize your content, maintain proper structure, and improve readability.",
  openGraph: {
    title: "Paragraph Counter - Free Online Paragraph Counter Tool",
    description:
      "Free online paragraph counter tool. Count paragraphs in any text instantly.",
    url: "https://texttoolshub.com/paragraph-counter",
  },
  twitter: {
    title: "Paragraph Counter - Free Online Paragraph Counter Tool",
    description:
      "Free online paragraph counter tool. Count paragraphs in any text instantly.",
  },
  alternates: {
    canonical: "https://texttoolshub.com/paragraph-counter",
  },
};

const faqItems = [
  { qKey: "pc.faq.q1", aKey: "pc.faq.a1" },
  { qKey: "pc.faq.q2", aKey: "pc.faq.a2" },
  { qKey: "pc.faq.q3", aKey: "pc.faq.a3" },
  { qKey: "pc.faq.q4", aKey: "pc.faq.a4" },
];

export default function ParagraphCounterPage() {
  return (
    <ToolPageContent
      h1Key="pc.h1"
      descriptionKey="pc.desc"
      seoDescriptionKey="pc.seo"
      slug="paragraph-counter"
      faqItems={faqItems}
      showAdditionalStats={true}
    />
  );
}
