import type { Metadata } from "next";
import PlagiarismCheckerForm from "./PlagiarismCheckerForm";

export const metadata: Metadata = {
  title: "Plagiarism Checker - Free Online Plagiarism Check Tool",
  description:
    "Free online plagiarism checker. Check your text for potential plagiarism against billions of web sources. Ensure content originality.",
  openGraph: {
    title: "Plagiarism Checker - Free Online Plagiarism Check Tool",
    description:
      "Check your text for potential plagiarism against billions of web sources.",
  },
};

export default function PlagiarismCheckerPage() {
  return <PlagiarismCheckerForm />;
}
