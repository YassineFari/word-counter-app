import AdBanner from "./AdBanner";
import Breadcrumbs from "./Breadcrumbs";

interface ToolLayoutProps {
  children: React.ReactNode;
  breadcrumbs: { name: string; url: string }[];
}

export default function ToolLayout({ children, breadcrumbs }: ToolLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />
      {children}
      <div className="mt-10">
        <AdBanner />
      </div>
    </div>
  );
}
