import type { Metadata } from "next";
import ReadabilityScoreForm from "./ReadabilityScoreForm";

export const metadata: Metadata = {
  title: "Readability Score - Free Online Text Readability Checker",
  description:
    "Free online readability score calculator. Measure how readable your text is using Flesch Reading Ease, Flesch-Kincaid Grade Level, and more.",
  openGraph: {
    title: "Readability Score - Free Online Text Readability Checker",
    description:
      "Measure text readability with Flesch Reading Ease, Flesch-Kincaid Grade Level, and more.",
  },
};

export default function ReadabilityScorePage() {
  return <ReadabilityScoreForm />;
}
