"use client";

import TextEditor from "./TextEditor";
import StatisticsPanel from "./StatisticsPanel";
import { useTextStore } from "@/hooks/useTextStore";

interface ToolInterfaceProps {
  showAdditional?: boolean;
}

export default function ToolInterface({
  showAdditional = true,
}: ToolInterfaceProps) {
  const { text, updateText, clearText, copyText, mounted } = useTextStore();

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-64 bg-bg-tertiary rounded-xl" />
        <div className="h-24 bg-bg-tertiary rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TextEditor
        text={text}
        onChange={updateText}
        onClear={clearText}
        onCopy={copyText}
      />
      <StatisticsPanel text={text} showAdditional={showAdditional} />
    </div>
  );
}
