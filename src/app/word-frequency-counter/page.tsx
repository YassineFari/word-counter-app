import type { Metadata } from "next";
import WordFrequencyForm from "./WordFrequencyForm";

export const metadata: Metadata = {
  title: "Word Frequency Counter - Analyze Word Usage in Text",
  description:
    "Count how many times each word appears in your text. Free word frequency analyzer tool for writers, SEO specialists, and researchers.",
  openGraph: {
    title: "Word Frequency Counter - Analyze Word Usage in Text",
    description:
      "Count how many times each word appears in your text. Free word frequency analyzer tool.",
    url: "https://texttoolshub.com/word-frequency-counter",
  },
  twitter: {
    title: "Word Frequency Counter - Analyze Word Usage in Text",
    description:
      "Count how many times each word appears in your text. Free word frequency analyzer tool.",
  },
  alternates: {
    canonical: "https://texttoolshub.com/word-frequency-counter",
  },
};

const faqItems = [
  { qKey: "wf.faq.q1", aKey: "wf.faq.a1" },
  { qKey: "wf.faq.q2", aKey: "wf.faq.a2" },
  { qKey: "wf.faq.q3", aKey: "wf.faq.a3" },
  { qKey: "wf.faq.q4", aKey: "wf.faq.a4" },
  { qKey: "wf.faq.q5", aKey: "wf.faq.a5" },
];

export default function WordFrequencyPage() {
  return <WordFrequencyForm faqItems={faqItems} />;
}
