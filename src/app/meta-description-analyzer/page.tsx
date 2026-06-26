import type { Metadata } from "next";
import MetaDescriptionForm from "./MetaDescriptionForm";

export const metadata: Metadata = {
  title: "Meta Description Analyzer - Free SEO Meta Tag Tool",
  description:
    "Free online meta description analyzer. Write, preview, and optimize your meta descriptions for better SEO and higher click-through rates.",
  openGraph: {
    title: "Meta Description Analyzer - Free SEO Meta Tag Tool",
    description:
      "Write and analyze meta descriptions for optimal search engine results.",
  },
};

export default function MetaDescriptionPage() {
  return <MetaDescriptionForm />;
}
