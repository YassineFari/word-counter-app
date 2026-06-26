import ToolLayout from "./ToolLayout";
import ToolInterface from "./ToolInterface";
import FAQSection from "./FAQSection";
import RelatedTools from "./RelatedTools";
import { faqSchema, breadcrumbSchema } from "@/lib/schema";
import { ToolMeta } from "@/lib/seo";

interface FAQItem {
  q: string;
  a: string;
}

export default function ToolPageTemplate({
  meta,
  faqItems,
  description,
  showAdditionalStats = true,
}: {
  meta: ToolMeta;
  faqItems: FAQItem[];
  description: string;
  showAdditionalStats?: boolean;
}) {
  const faqSchemaData = faqSchema(faqItems);
  const breadcrumbSchemaData = breadcrumbSchema([
    { name: meta.title.split(" - ")[0], url: `https://texttoolshub.com${meta.slug}` },
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
      <ToolLayout
        breadcrumbs={[{ name: meta.title.split(" - ")[0], url: `/${meta.slug}` }]}
      >
        <article>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-4">
            {meta.h1}
          </h1>
          <p className="text-text-secondary mb-8 leading-relaxed">
            {description}
          </p>
          <ToolInterface showAdditional={showAdditionalStats} />
          <div className="mt-10 prose prose-gray max-w-none text-sm sm:text-base text-text-secondary leading-relaxed space-y-4">
            <p>
              {meta.description}
            </p>
          </div>
          <FAQSection items={faqItems} />
          <RelatedTools current={`/${meta.slug}`} />
        </article>
      </ToolLayout>
    </>
  );
}
