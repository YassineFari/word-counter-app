import type { Metadata } from "next";
import RemoveDuplicateLinesForm from "./RemoveDuplicateLinesForm";

export const metadata: Metadata = {
  title: "Remove Duplicate Lines - Free Online Duplicate Line Remover",
  description:
    "Remove duplicate lines from text instantly. Free online tool to delete repeated lines, sort and clean your text data.",
  openGraph: {
    title: "Remove Duplicate Lines - Free Online Duplicate Line Remover",
    description:
      "Remove duplicate lines from text instantly. Delete repeated lines, sort and clean your text data.",
    url: "https://texttoolshub.com/remove-duplicate-lines",
  },
  twitter: {
    title: "Remove Duplicate Lines - Free Online Duplicate Line Remover",
    description:
      "Remove duplicate lines from text instantly. Delete repeated lines, sort and clean your text data.",
  },
  alternates: {
    canonical: "https://texttoolshub.com/remove-duplicate-lines",
  },
};

const faqItems = [
  { qKey: "rd.faq.q1", aKey: "rd.faq.a1" },
  { qKey: "rd.faq.q2", aKey: "rd.faq.a2" },
  { qKey: "rd.faq.q3", aKey: "rd.faq.a3" },
  { qKey: "rd.faq.q4", aKey: "rd.faq.a4" },
  { qKey: "rd.faq.q5", aKey: "rd.faq.a5" },
];

export default function RemoveDuplicateLinesPage() {
  return <RemoveDuplicateLinesForm faqItems={faqItems} />;
}
