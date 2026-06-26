"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { type LangCode, languages, t as translate } from "@/lib/i18n";

interface LanguageContextType {
  lang: LangCode;
  setLang: (code: LangCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => translate(key, "en"),
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as LangCode | null;
    if (stored && languages.some((l) => l.code === stored)) {
      setLangState(stored);
    }
  }, []);

  const setLang = useCallback((code: LangCode) => {
    setLangState(code);
    try {
      localStorage.setItem("lang", code);
    } catch {}
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: (key: string) => translate(key, lang) }}>
      {children}
    </LanguageContext.Provider>
  );
}
