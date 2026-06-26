"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

const toolLinks = [
  { href: "/word-counter", key: "nav.wordCounter" as const },
  { href: "/character-counter", key: "nav.characterCounter" as const },
  { href: "/sentence-counter", key: "tools.sentenceCounter.title" as const },
  { href: "/paragraph-counter", key: "tools.paragraphCounter.title" as const },
  { href: "/reading-time-calculator", key: "tools.readingTime.title" as const },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-bg-secondary">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-text mb-3">{t("site.name")}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {t("footer.description")}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-3">{t("footer.tools")}</h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-text mb-3">{t("footer.support")}</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@texttoolshub.com"
                  className="text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {t("footer.contact")}
                </a>
              </li>
              <li>
                <span className="text-sm text-text-secondary">
                  {t("footer.freeTools")}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} {t("site.name")}. {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}
