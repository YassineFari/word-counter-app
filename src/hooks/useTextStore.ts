"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "texttoolshub_saved_text";

export function useTextStore() {
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const undoRef = useRef("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

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
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const updateText = useCallback((newText: string) => {
    setText(newText);
    setShowUndo(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    try {
      localStorage.setItem(STORAGE_KEY, newText);
    } catch {
      // localStorage not available
    }
  }, []);

  const clearText = useCallback(() => {
    undoRef.current = text;
    setText("");
    setShowUndo(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setShowUndo(false), 3000);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // localStorage not available
    }
  }, [text]);

  const undoClear = useCallback(() => {
    if (undoRef.current) {
      setText(undoRef.current);
      setShowUndo(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      try {
        localStorage.setItem(STORAGE_KEY, undoRef.current);
      } catch {
        // localStorage not available
      }
      undoRef.current = "";
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

  return { text, updateText, clearText, undoClear, copyText, mounted, showUndo };
}
