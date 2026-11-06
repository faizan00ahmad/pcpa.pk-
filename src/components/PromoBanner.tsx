"use client";

import { useEffect, useState } from "react";
import { notices } from "@/data/site";
import { useLang } from "./LanguageProvider";

/** Slim rotating notice above the nav (like Apple's promo banner). Every notice links to a document on the site. */
export function PromoBanner() {
  const { t, lang } = useLang();
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => {
      setOut(true);
      setTimeout(() => {
        setI((p) => (p + 1) % notices.length);
        setOut(false);
      }, 400);
    }, 5500);
    return () => clearInterval(id);
  }, [paused]);

  const n = notices[i];
  return (
    <aside className="promo" aria-label={t("Notices")} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="promo-inner">
        <span className="promo-dot" aria-hidden />
        <span className={`promo-text${out ? " out" : ""}`} aria-live="polite">
          <bdi>
            <b>{n.date}</b>
          </bdi>{" "}
          · <bdi>{t(n.label)}</bdi>
        </span>
        <a href={n.href} target="_blank" rel="noopener noreferrer">
          {t("Open")} {lang === "ur" ? "‹" : "›"}
        </a>
      </div>
    </aside>
  );
}
