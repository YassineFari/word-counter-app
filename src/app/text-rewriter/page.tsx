import type { Metadata } from "next";
import TextRewriterForm from "./TextRewriterForm";

export const metadata: Metadata = {
  title: "Text Rewriter - Free Online Paraphrasing Tool",
  description:
    "Free online text rewriter and paraphrasing tool. Rewrite sentences, improve clarity, and make your content unique with one click.",
  openGraph: {
    title: "Text Rewriter - Free Online Paraphrasing Tool",
    description:
      "Rewrite and paraphrase your text with one click. Improve clarity and make your content unique.",
  },
};

export default function TextRewriterPage() {
  return <TextRewriterForm />;
}
