import type { Metadata } from "next";
import GrammarCheckerForm from "./GrammarCheckerForm";

export const metadata: Metadata = {
  title: "Grammar Checker - Free Online Grammar Check Tool",
  description:
    "Free online grammar checker. Check your text for grammar, spelling, and punctuation errors instantly. Improve your writing with AI-powered suggestions.",
  openGraph: {
    title: "Grammar Checker - Free Online Grammar Check Tool",
    description:
      "Check your text for grammar, spelling, and punctuation errors instantly.",
  },
};

export default function GrammarCheckerPage() {
  return <GrammarCheckerForm />;
}
