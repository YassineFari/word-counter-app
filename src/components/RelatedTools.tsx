import ToolCard from "./ToolCard";

const allTools = [
  {
    title: "Word Counter",
    description: "Count the number of words in your text instantly.",
    href: "/word-counter",
    icon: (
      <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Character Counter",
    description: "Count characters with and without spaces.",
    href: "/character-counter",
    icon: (
      <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
  },
  {
    title: "Sentence Counter",
    description: "Count the number of sentences in your text.",
    href: "/sentence-counter",
    icon: (
      <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    title: "Paragraph Counter",
    description: "Count paragraphs in your text easily.",
    href: "/paragraph-counter",
    icon: (
      <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
];

export default function RelatedTools({ current }: { current?: string }) {
  const filtered = allTools.filter((t) => t.href !== current);

  return (
    <section className="py-10 border-t border-border">
      <h2 className="text-2xl font-bold text-text mb-6">Explore More Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((tool) => (
          <ToolCard key={tool.href} {...tool} />
        ))}
      </div>
    </section>
  );
}
