"use client";

import { useLang } from "./LanguageProvider";

/** Renders `children` (English) or its Urdu translation. Works inside server components. */
export function T({ children, ur }: { children: string; ur?: string }) {
  const { lang, t } = useLang();
  return <>{lang === "ur" ? (ur ?? t(children)) : children}</>;
}
