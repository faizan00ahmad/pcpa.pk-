"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageProvider";

const sizes = ["sm", "md", "lg", "xl"] as const;
type Size = (typeof sizes)[number];

function store(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {}
}

/** Text size controls, high-contrast toggle and language switch for the utility bar. */
export function A11yToolbar() {
  const { lang, setLang, t } = useLang();
  const [size, setSize] = useState<Size>("md");
  const [high, setHigh] = useState(false);

  useEffect(() => {
    const d = document.documentElement;
    setSize((sizes as readonly string[]).includes(d.dataset.fs ?? "") ? (d.dataset.fs as Size) : "md");
    setHigh(d.dataset.contrast === "high");
  }, []);

  function apply(next: Size) {
    setSize(next);
    const d = document.documentElement;
    if (next === "md") {
      delete d.dataset.fs;
      store("pcpa-fs", null);
    } else {
      d.dataset.fs = next;
      store("pcpa-fs", next);
    }
  }

  function step(dir: 1 | -1) {
    const i = sizes.indexOf(size) + dir;
    if (i >= 0 && i < sizes.length) apply(sizes[i]);
  }

  function toggleContrast() {
    const d = document.documentElement;
    const next = !high;
    setHigh(next);
    if (next) d.dataset.contrast = "high";
    else delete d.dataset.contrast;
    store("pcpa-contrast", next ? "1" : null);
  }

  const btn =
    "grid h-7 min-w-7 place-items-center rounded px-1.5 text-xs font-bold text-white/85 ring-1 ring-white/20 transition hover:bg-white/10 hover:text-white disabled:opacity-40";

  return (
    <div className="flex items-center gap-2" role="group" aria-label={t("Text size")}>
      <button type="button" className={btn} onClick={() => step(-1)} disabled={size === "sm"} aria-label={t("Decrease text size")}>
        A−
      </button>
      <button type="button" className={btn} onClick={() => apply("md")} aria-label={t("Reset text size")}>
        A
      </button>
      <button type="button" className={btn} onClick={() => step(1)} disabled={size === "xl"} aria-label={t("Increase text size")}>
        A+
      </button>
      <button
        type="button"
        className={`${btn} ${high ? "bg-wheat-400 text-forest-950 ring-wheat-400 hover:bg-wheat-400 hover:text-forest-950" : ""}`}
        onClick={toggleContrast}
        aria-pressed={high}
        aria-label={t("High contrast")}
        title={t("High contrast")}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18" fill="currentColor" />
          <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" />
        </svg>
      </button>
      <span className="mx-1 h-4 w-px bg-white/20" aria-hidden />
      <div className="flex overflow-hidden rounded ring-1 ring-white/20" role="group" aria-label={t("Language")}>
        <button
          type="button"
          onClick={() => setLang("en")}
          aria-pressed={lang === "en"}
          className={`px-2.5 py-1 text-xs font-bold transition ${lang === "en" ? "bg-white text-forest-900" : "text-white/80 hover:bg-white/10"}`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLang("ur")}
          aria-pressed={lang === "ur"}
          lang="ur"
          className={`px-2.5 py-1 text-xs font-bold transition ${lang === "ur" ? "bg-white text-forest-900" : "text-white/80 hover:bg-white/10"}`}
        >
          اردو
        </button>
      </div>
    </div>
  );
}
