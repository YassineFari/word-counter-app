import type { Metadata } from "next";
import ToolPageContent from "@/components/ToolPageContent";

export const metadata: Metadata = {
  title: "Word Counter - Count Words Online | TextToolsHub",
  description:
    "Free online word counter tool. Count the number of words in your text instantly. Perfect for essays, articles, social media posts, and more. Fast, accurate, and private.",
  openGraph: {
    title: "Word Counter - Count Words Online | TextToolsHub",
    description:
      "Free online word counter tool. Count words instantly in any text.",
    url: "https://texttoolshub.com/word-counter",
  },
  twitter: {
    title: "Word Counter - Count Words Online | TextToolsHub",
    description:
      "Free online word counter tool. Count words instantly in any text.",
  },
  alternates: {
    canonical: "https://texttoolshub.com/word-counter",
  },
};

const faqItems = [
  { qKey: "wc.faq.q1", aKey: "wc.faq.a1" },
  { qKey: "wc.faq.q2", aKey: "wc.faq.a2" },
  { qKey: "wc.faq.q3", aKey: "wc.faq.a3" },
  { qKey: "wc.faq.q4", aKey: "wc.faq.a4" },
];

export default function WordCounterPage() {
  return (
    <ToolPageContent
      h1Key="wc.h1"
      descriptionKey="wc.desc"
      seoDescriptionKey="wc.seo"
      slug="word-counter"
      faqItems={faqItems}
      showAdditionalStats={true}
    />
  );
}
