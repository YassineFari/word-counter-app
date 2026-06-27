"use client";

import TextEditor from "./TextEditor";
import StatisticsPanel from "./StatisticsPanel";
import { useTextStore } from "@/hooks/useTextStore";
import { countWords, countCharacters } from "@/lib/utils";

interface ToolInterfaceProps {
  showAdditional?: boolean;
}

export default function ToolInterface({
  showAdditional = true,
}: ToolInterfaceProps) {
  const { text, updateText, clearText, undoClear, copyText, mounted, showUndo } = useTextStore();

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-64 bg-bg-tertiary rounded-xl" />
        <div className="h-24 bg-bg-tertiary rounded-xl" />
      </div>
    );
  }

  const wordCount = countWords(text);
  const charCount = countCharacters(text);

  return (
    <>
      <div className="space-y-6 pb-16 sm:pb-0">
        <TextEditor
          text={text}
          onChange={updateText}
          onClear={clearText}
          onCopy={copyText}
          onUndo={undoClear}
          showUndo={showUndo}
        />
        <StatisticsPanel text={text} showAdditional={showAdditional} />
      </div>

      {/* Floating mobile stats bar */}
      {text.trim() && (
        <div className="fixed bottom-0 left-0 right-0 sm:hidden bg-bg border-t border-border px-4 py-2 z-40 flex items-center justify-between text-xs text-text-secondary">
          <span>
            <strong className="text-text">{wordCount}</strong> words
          </span>
          <span>
            <strong className="text-text">{charCount}</strong> chars
          </span>
          <button
            onClick={clearText}
            className="px-3 py-1 rounded-lg bg-primary/10 text-primary font-medium text-xs"
          >
            Clear
          </button>
        </div>
      )}
    </>
  );
}
