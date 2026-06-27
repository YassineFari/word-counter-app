import Link from "next/link";

const allTools = [
  { title: "Word Counter", href: "/word-counter" },
  { title: "Character Counter", href: "/character-counter" },
  { title: "Sentence Counter", href: "/sentence-counter" },
  { title: "Paragraph Counter", href: "/paragraph-counter" },
  { title: "Reading Time Calculator", href: "/reading-time-calculator" },
  { title: "Case Converter", href: "/case-converter" },
  { title: "Word Frequency Counter", href: "/word-frequency-counter" },
  { title: "Remove Duplicate Lines", href: "/remove-duplicate-lines" },
  { title: "Text to Slug Generator", href: "/text-to-slug" },
  { title: "Password Strength Checker", href: "/password-strength-checker" },
];

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-center">
      <div className="text-8xl font-black text-primary/20 mb-4">404</div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-text mb-3">
        Page Not Found
      </h1>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        The page you&apos;re looking for doesn&apos;t exist. Try one of our free tools below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        {allTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="p-4 rounded-xl border border-border bg-bg hover:border-primary hover:bg-primary/5 transition-all"
          >
            <span className="font-medium text-text hover:text-primary transition-colors">
              {tool.title}
            </span>
            <span className="block text-xs text-text-muted mt-0.5">
              {tool.href.replace("/", "")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
