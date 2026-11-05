"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ur } from "@/i18n/ur";

export type Lang = "en" | "ur";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (en: string) => string };

const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (s) => s });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Pick up the language the inline <head> script already applied (avoids a flash).
  useEffect(() => {
    try {
      if (localStorage.getItem("pcpa-lang") === "ur") setLangState("ur");
    } catch {}
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    const d = document.documentElement;
    d.lang = l;
    d.dir = l === "ur" ? "rtl" : "ltr";
    try {
      localStorage.setItem("pcpa-lang", l);
    } catch {}
  }, []);

  useEffect(() => {
    const d = document.documentElement;
    d.lang = lang;
    d.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);

  const t = useCallback((en: string) => (lang === "ur" ? (ur[en] ?? en) : en), [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
