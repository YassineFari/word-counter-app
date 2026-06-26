import type { Metadata } from "next";
import KeywordDensityForm from "./KeywordDensityForm";

export const metadata: Metadata = {
  title: "Keyword Density Analyzer - Free Online SEO Keyword Tool",
  description:
    "Free online keyword density analyzer. Analyze keyword frequency and density in your text to optimize your content for better search engine rankings.",
  openGraph: {
    title: "Keyword Density Analyzer - Free Online SEO Keyword Tool",
    description:
      "Analyze keyword frequency and density in your text for better SEO.",
  },
};

export default function KeywordDensityPage() {
  return <KeywordDensityForm />;
}
