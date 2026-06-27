import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

export default function ToolCard({ title, description, href, icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block p-5 rounded-xl border border-border bg-bg hover:border-primary hover:shadow-sm transition-all"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
          {icon || (
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
