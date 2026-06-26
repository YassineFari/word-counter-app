"use client";

import { useLanguage } from "./LanguageProvider";
import { countWords, countCharacters, countCharactersNoSpaces, countSpaces, countSentences, countParagraphs, countLines, countNonEmptyLines, countPages, calculateReadingTime } from "@/lib/utils";

interface StatisticsPanelProps {
  text: string;
  showAdditional?: boolean;
}

interface StatItemProps {
  label: string;
  value: string | number;
  color: string;
}

function StatItem({ label, value, color }: StatItemProps) {
  return (
    <div className="p-4 rounded-xl border border-border bg-bg">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs sm:text-sm text-text-secondary mt-1">{label}</div>
    </div>
  );
}

export default function StatisticsPanel({
  text,
  showAdditional = true,
}: StatisticsPanelProps) {
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

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-text">{t("stats.heading")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatItem label={t("stats.words")} value={words} color="text-primary" />
        <StatItem label={t("stats.characters")} value={chars} color="text-secondary" />
        <StatItem
          label={t("stats.charNoSpace")}
          value={charsNoSpace}
          color="text-amber-600"
        />
        {showAdditional && (
          <>
            <StatItem label={t("stats.sentences")} value={sentences} color="text-purple-600" />
            <StatItem label={t("stats.paragraphs")} value={paragraphs} color="text-rose-600" />
            <StatItem label={t("stats.spaces")} value={spaces} color="text-blue-500" />
            <StatItem label={t("stats.lines")} value={lines} color="text-orange-500" />
            <StatItem label={t("stats.nonEmptyLines")} value={nonEmptyLines} color="text-emerald-500" />
            <StatItem label={t("stats.pages")} value={pages} color="text-pink-500" />
            <StatItem
              label={t("stats.readingTime")}
              value={
                readingTime.minutes > 0
                  ? `${readingTime.minutes}m ${readingTime.seconds}s`
                  : `${readingTime.seconds}s`
              }
              color="text-teal-600"
            />
          </>
        )}
      </div>
    </div>
  );
}
