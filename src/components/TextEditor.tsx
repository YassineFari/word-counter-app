"use client";

import { useLanguage } from "./LanguageProvider";

interface TextEditorProps {
  text: string;
  onChange: (text: string) => void;
  onClear: () => void;
  onCopy: () => void;
}

export default function TextEditor({
  text,
  onChange,
  onClear,
  onCopy,
}: TextEditorProps) {
  const { t } = useLanguage();

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
        placeholder={t("editor.placeholder")}
        className="w-full h-64 sm:h-80 p-4 rounded-xl border border-border bg-bg text-text placeholder:text-text-muted resize-y focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm leading-relaxed"
      />
    </div>
  );
}
