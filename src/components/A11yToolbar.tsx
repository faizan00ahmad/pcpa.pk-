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

/** Text size and high-contrast controls (shown inside the header's tools popover). */
export function TextTools() {
  const { t } = useLang();
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

  return (
    <div className="space-y-4">
      <div>
        <p className="pop-label">{t("Text size")}</p>
        <div className="flex gap-2" role="group" aria-label={t("Text size")}>
          <button type="button" className="icon-btn" onClick={() => step(-1)} disabled={size === "sm"} aria-label={t("Decrease text size")}>
            A−
          </button>
          <button type="button" className="icon-btn" onClick={() => apply("md")} aria-label={t("Reset text size")}>
            A
          </button>
          <button type="button" className="icon-btn" onClick={() => step(1)} disabled={size === "xl"} aria-label={t("Increase text size")}>
            A+
          </button>
        </div>
      </div>
      <div>
        <p className="pop-label">{t("High contrast")}</p>
        <button type="button" className="icon-btn" onClick={toggleContrast} aria-pressed={high}>
          {high ? "On" : "Off"}
        </button>
      </div>
    </div>
  );
}
