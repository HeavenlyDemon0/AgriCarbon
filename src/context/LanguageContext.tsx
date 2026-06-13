import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { type Language, t as translate, languageNames } from '../i18n/translations';

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  languageNames: Record<Language, string>;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem('agri_lang') as Language) || 'en';
  });

  const setLang = useCallback((l: Language) => {
    localStorage.setItem('agri_lang', l);
    setLangState(l);
  }, []);

  const t = useCallback((key: string) => translate(key, lang), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languageNames }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be inside LanguageProvider');
  return ctx;
}
