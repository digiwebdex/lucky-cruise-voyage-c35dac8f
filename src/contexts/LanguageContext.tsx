import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import bnTranslations from "@/locales/bn.json";
import enTranslations from "@/locales/en.json";

export type Language = "bn" | "en";

type TranslationData = typeof bnTranslations;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationData;
}

const translations: Record<Language, TranslationData> = {
  bn: bnTranslations,
  en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem("lucky-lang");
    return (stored === "en" || stored === "bn") ? stored : "bn";
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lucky-lang", newLang);
  }, []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
