import en from "./en";
import fr from "./fr";
import es from "./es";
import pt from "./pt";
import de from "./de";
import it from "./it";

export type LangCode = "en" | "fr" | "es" | "pt" | "de" | "it";

export interface LangOption {
  code: LangCode;
  label: string;
  flag: string;
}

export const languages: LangOption[] = [
  { code: "en", label: "EN", flag: "gb" },
  { code: "fr", label: "FR", flag: "fr" },
  { code: "es", label: "ES", flag: "es" },
  { code: "pt", label: "PT", flag: "pt" },
  { code: "de", label: "DE", flag: "de" },
  { code: "it", label: "IT", flag: "it" },
];

const translations: Record<LangCode, Record<string, string>> = { en, fr, es, pt, de, it };

export function t(key: string, lang: LangCode = "en"): string {
  return translations[lang]?.[key] ?? translations["en"]?.[key] ?? key;
}
