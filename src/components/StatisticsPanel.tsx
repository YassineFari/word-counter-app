"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useLanguage } from "./LanguageProvider";
import {
  countWords, countCharacters, countCharactersNoSpaces, countSpaces,
  countSentences, countParagraphs, countLines, countNonEmptyLines,
  countPages, calculateReadingTime,
} from "@/lib/utils";

interface StatisticsPanelProps {
  text: string;
  showAdditional?: boolean;
}

function AnimatedNumber({ value, duration = 600 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const prevRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = prevRef.current;
    const diff = value - start;
    if (diff === 0) return;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        prevRef.current = value;
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value, duration]);

  return <>{display}</>;
}

function StatItem({ label, value, color, onCopy }: {
  label: string;
  value: string | number;
  color: string;
  onCopy: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [onCopy]);

  return (
    <div className="p-4 rounded-xl border border-border bg-bg group relative">
      <div className="text-2xl font-bold tabular-nums flex items-center gap-2">
        <span className={color}>
          {typeof value === "number" ? <AnimatedNumber value={value} /> : <>{value}</>}
        </span>
      </div>
      <div className="text-xs sm:text-sm text-text-secondary mt-1">{label}</div>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md text-text-muted opacity-0 group-hover:opacity-100 hover:bg-bg-tertiary hover:text-text-secondary transition-all"
        aria-label={`Copy ${label}`}
      >
        {copied ? (
          <svg className="w-3.5 h-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default function StatisticsPanel({ text, showAdditional = true }: StatisticsPanelProps) {
  const { t } = useLanguage();
  const words = countWords(text);
  const chars = countCharacters(text);
  const charsNoSpace = countCharactersNoSpaces(text);
  const spaces = countSpaces(text);
  const sentences = countSentences(text);
  const paragraphs = countParagraphs(text);
  const lines = countLines(text);
  const nonEmptyLines = countNonEmptyLines(text);
  const pages = countPages(text);
  const readingTime = calculateReadingTime(text);

  const copyToClipboard = useCallback(async (val: string) => {
    try {
      await navigator.clipboard.writeText(val);
    } catch {
      const el = document.createElement("textarea");
      el.value = val;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  }, []);

  const readingTimeStr = readingTime.minutes > 0 ? `${readingTime.minutes}m ${readingTime.seconds}s` : `${readingTime.seconds}s`;

  const stats: { label: string; value: number | string; color: string; copyVal: string }[] = [
    { label: t("stats.words"), value: words, color: "text-primary", copyVal: String(words) },
    { label: t("stats.characters"), value: chars, color: "text-secondary", copyVal: String(chars) },
    { label: t("stats.charNoSpace"), value: charsNoSpace, color: "text-amber-600", copyVal: String(charsNoSpace) },
  ];

  if (showAdditional) {
    stats.push(
      { label: t("stats.sentences"), value: sentences, color: "text-purple-600", copyVal: String(sentences) },
      { label: t("stats.paragraphs"), value: paragraphs, color: "text-rose-600", copyVal: String(paragraphs) },
      { label: t("stats.spaces"), value: spaces, color: "text-blue-500", copyVal: String(spaces) },
      { label: t("stats.lines"), value: lines, color: "text-orange-500", copyVal: String(lines) },
      { label: t("stats.nonEmptyLines"), value: nonEmptyLines, color: "text-emerald-500", copyVal: String(nonEmptyLines) },
      { label: t("stats.pages"), value: pages, color: "text-pink-500", copyVal: String(pages) },
      { label: t("stats.readingTime"), value: readingTimeStr, color: "text-teal-600", copyVal: readingTimeStr },
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-text">{t("stats.heading")}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((s) => (
          <StatItem
            key={s.label}
            label={s.label}
            value={s.value}
            color={s.color}
            onCopy={() => copyToClipboard(s.copyVal)}
          />
        ))}
      </div>
    </div>
  );
}
