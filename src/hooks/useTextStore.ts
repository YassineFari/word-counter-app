"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "texttoolshub_saved_text";

export function useTextStore() {
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setText(saved);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const updateText = useCallback((newText: string) => {
    setText(newText);
    try {
      localStorage.setItem(STORAGE_KEY, newText);
    } catch {
      // localStorage not available
    }
  }, []);

  const clearText = useCallback(() => {
    setText("");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage not available
    }
  }, []);

  const copyText = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, [text]);

  return { text, updateText, clearText, copyText, mounted };
}
