"use client";

import { useCallback } from "react";
import { useLanguage } from "./LanguageProvider";

interface TextEditorProps {
  text: string;
  onChange: (text: string) => void;
  onClear: () => void;
  onCopy: () => void;
  onUndo?: () => void;
  showUndo?: boolean;
}

export default function TextEditor({
  text,
  onChange,
  onClear,
  onCopy,
  onUndo,
  showUndo,
}: TextEditorProps) {
  const { t } = useLanguage();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "l") {
        e.preventDefault();
        if (text) onClear();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (text) onCopy();
      }
    },
    [text, onClear, onCopy]
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          htmlFor="text-editor"
          className="text-sm font-medium text-text"
        >
          {t("editor.label")}
        </label>
        <div className="flex gap-2">
          {showUndo && onUndo && (
            <button
              onClick={onUndo}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary transition-colors"
              title="Undo clear (Ctrl+Z)"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
          )}
          <button
            onClick={onCopy}
            disabled={!text}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {t("editor.copy")}
          </button>
          <button
            onClick={onClear}
            disabled={!text}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-secondary hover:bg-bg-tertiary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {t("editor.clear")}
          </button>
        </div>
      </div>
      <textarea
        id="text-editor"
        value={text}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t("editor.placeholder")}
        className="w-full h-64 sm:h-80 p-4 rounded-xl border border-border bg-bg text-text placeholder:text-text-muted resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm leading-relaxed"
      />
      <div className="flex items-center justify-between text-[11px] text-text-muted">
        <span>{text.length} characters</span>
        <span>Ctrl+L Clear &middot; Ctrl+Enter Copy</span>
      </div>
    </div>
  );
}
