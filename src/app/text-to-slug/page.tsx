import type { Metadata } from "next";
import TextToSlugForm from "./TextToSlugForm";

export const metadata: Metadata = {
  title: "Text to Slug Generator - Free URL Slug Generator Tool",
  description:
    "Convert any text or title into a clean URL slug instantly. Free slug generator for SEO-friendly URLs, blog posts, and web pages.",
  openGraph: {
    title: "Text to Slug Generator - Free URL Slug Generator Tool",
    description:
      "Convert any text or title into a clean URL slug instantly.",
    url: "https://texttoolshub.com/text-to-slug",
  },
  twitter: {
    title: "Text to Slug Generator - Free URL Slug Generator Tool",
    description:
      "Convert any text or title into a clean URL slug instantly.",
  },
  alternates: {
    canonical: "https://texttoolshub.com/text-to-slug",
  },
};

const faqItems = [
  { qKey: "slug.faq.q1", aKey: "slug.faq.a1" },
  { qKey: "slug.faq.q2", aKey: "slug.faq.a2" },
  { qKey: "slug.faq.q3", aKey: "slug.faq.a3" },
  { qKey: "slug.faq.q4", aKey: "slug.faq.a4" },
  { qKey: "slug.faq.q5", aKey: "slug.faq.a5" },
];

export default function TextToSlugPage() {
  return <TextToSlugForm faqItems={faqItems} />;
}
