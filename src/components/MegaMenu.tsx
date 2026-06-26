"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import type { NavCategory } from "@/lib/navigation";

interface MegaMenuProps {
  categories: NavCategory[];
}

export default function MegaMenu({ categories }: MegaMenuProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const clearTimer = () => {
    if (closeTimer.current !== undefined) {
      clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  };

  const openMenu = () => {
    clearTimer();
    setIsOpen(true);
  };

  const closeMenu = () => {
    clearTimer();
    closeTimer.current = setTimeout(() => setIsOpen(false), 150);
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      {/* Desktop trigger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        onFocus={openMenu}
        className="hidden sm:flex items-center gap-1 text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
      >
        Products
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="flex sm:hidden items-center gap-1 text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
      >
        Products
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Desktop mega menu */}
      <div
        className={`hidden sm:block absolute left-0 mt-2 w-[640px] rounded-xl border border-border bg-bg shadow-lg z-20 transition-all duration-200 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-1 invisible pointer-events-none"
        }`}
      >
        <div className="p-6">
          <div className="grid grid-cols-1 gap-8" style={{ gridTemplateColumns: `repeat(${Math.min(categories.length, 3)}, 1fr)` }}>
            {categories.map((cat) => (
              <div key={cat.id}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">{cat.emoji}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {t(cat.titleKey)}
                  </span>
                </div>
                <div className="space-y-3">
                  {cat.tools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-bg-tertiary transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        {tool.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-text group-hover:text-primary transition-colors">
                          {t(tool.nameKey)}
                        </div>
                        <div className="text-xs text-text-secondary mt-0.5 leading-relaxed line-clamp-2">
                          {t(tool.descKey)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile accordion */}
      {mobileOpen && (
        <div className="sm:hidden fixed left-0 right-0 top-14 bottom-0 bg-bg z-20 overflow-y-auto">
          <div className="border-t border-border">
            {categories.map((cat) => {
              const isExpanded = expandedCategory === cat.id;
              return (
                <div key={cat.id} className="border-b border-border">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-text hover:bg-bg-tertiary transition-colors"
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
                    <div className="px-4 pb-3 space-y-1">
                      {cat.tools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.href}
                          onClick={() => { setMobileOpen(false); setExpandedCategory(null); }}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-primary hover:bg-bg-tertiary transition-colors"
                        >
                          <div className="w-7 h-7 rounded-md bg-bg-secondary flex items-center justify-center shrink-0">
                            {tool.icon}
                          </div>
                          <div>
                            <div className="font-medium">{t(tool.nameKey)}</div>
                            <div className="text-xs text-text-muted mt-0.5 line-clamp-1">{t(tool.descKey)}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
