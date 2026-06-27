"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useLanguage } from "./LanguageProvider";
import { languages } from "@/lib/i18n";
import MegaMenu from "./MegaMenu";
import { categories } from "@/lib/navigation";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [expandedMobileCat, setExpandedMobileCat] = useState<string | null>(null);

  const closeMobile = () => {
    setMobileNavOpen(false);
    setExpandedMobileCat(null);
  };

  return (
    <header className="border-b border-border bg-bg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="shrink-0 -ml-3"
        >
          <img
            src="/logo.png"
            alt="TextToolsHub"
            className="h-12 w-auto"
          />
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <MegaMenu categories={categories} />
          <Link href="/#faq" className="font-semibold text-text-secondary hover:text-primary transition-colors">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors"
            >
              <span className={`fi fi-${languages.find(l => l.code === lang)?.flag}`} />
              <span className="hidden sm:inline">{lang.toUpperCase()}</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 mt-1 w-28 rounded-lg border border-border bg-bg shadow-lg z-20 py-1">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors ${
                        lang === l.code
                          ? "text-primary font-medium"
                          : "text-text-secondary hover:bg-bg-tertiary"
                      }`}
                    >
                      <span className={`fi fi-${l.flag}`} />
                      {l.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="flex sm:hidden p-2 rounded-lg text-text-secondary hover:bg-bg-tertiary transition-colors"
            aria-label="Toggle navigation"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div className="sm:hidden fixed left-0 right-0 top-14 bottom-0 bg-bg z-30 overflow-y-auto border-t border-border">
          <div className="p-4 space-y-1">
            {categories.map((cat) => {
              const isExpanded = expandedMobileCat === cat.id;
              return (
                <div key={cat.id}>
                  <button
                    onClick={() => setExpandedMobileCat(isExpanded ? null : cat.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-text hover:bg-bg-tertiary transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      {t(cat.titleKey)}
                    </span>
                    <svg
                      className={`w-3 h-3 text-text-muted transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-out ${
                      isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="ml-4 pl-3 border-l-2 border-border pb-2 space-y-1">
                      {cat.tools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.href}
                          onClick={closeMobile}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-primary hover:bg-bg-tertiary transition-colors"
                        >
                          <div className="w-6 h-6 rounded-md bg-bg-secondary flex items-center justify-center shrink-0 text-xs">
                            {tool.icon}
                          </div>
                          <div>
                            <div className="font-medium">{t(tool.nameKey)}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="border-t border-border pt-2 mt-2">
              <Link
                href="/#faq"
                onClick={closeMobile}
                className="block px-4 py-3 rounded-lg font-semibold text-text-secondary hover:bg-bg-tertiary hover:text-primary transition-colors"
              >
                FAQ
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
