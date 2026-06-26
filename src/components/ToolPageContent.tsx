"use client";

import { useLanguage } from "./LanguageProvider";
import ToolLayout from "./ToolLayout";
import ToolInterface from "./ToolInterface";
import FAQSection from "./FAQSection";
import RelatedTools from "./RelatedTools";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";

interface FAQData {
  qKey: string;
  aKey: string;
}

export default function ToolPageContent({
  h1Key,
  descriptionKey,
  seoDescriptionKey,
  slug,
  faqItems,
  showAdditionalStats = true,
}: {
  h1Key: string;
  descriptionKey: string;
  seoDescriptionKey: string;
  slug: string;
  faqItems: FAQData[];
  showAdditionalStats?: boolean;
}) {
  const { t } = useLanguage();

  const resolvedFaq = faqItems.map((item) => ({
    q: t(item.qKey),
    a: t(item.aKey),
  }));

  const faqSchemaData = faqSchema(resolvedFaq);
  const breadcrumbSchemaData = breadcrumbSchema([
    { name: t(h1Key), url: `https://texttoolshub.com/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }}
      />
      <ToolLayout breadcrumbs={[{ name: t(h1Key), url: `/${slug}` }]}>
        <article>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">
            {t(h1Key)}
          </h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            {t(descriptionKey)}
          </p>
          <ToolInterface showAdditional={showAdditionalStats} />
          <div className="mt-10 prose prose-gray max-w-none text-sm sm:text-base text-text-secondary leading-relaxed space-y-4">
            <p>{t(seoDescriptionKey)}</p>
          </div>
          <FAQSection items={resolvedFaq} />
          <RelatedTools current={`/${slug}`} />
        </article>
      </ToolLayout>
    </>
  );
}
