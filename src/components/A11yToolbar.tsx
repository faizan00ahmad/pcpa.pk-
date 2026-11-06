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

/** Text size, contrast and appearance controls (shown inside the nav's "Aa" popover). */
export function TextTools() {
  const { t } = useLang();
  const [size, setSize] = useState<Size>("md");
  const [high, setHigh] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const d = document.documentElement;
    setSize((sizes as readonly string[]).includes(d.dataset.fs ?? "") ? (d.dataset.fs as Size) : "md");
    setHigh(d.dataset.contrast === "high");
    setTheme(d.dataset.theme === "dark" ? "dark" : "light");
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
  const step = (dir: 1 | -1) => {
    const i = sizes.indexOf(size) + dir;
    if (i >= 0 && i < sizes.length) apply(sizes[i]);
  };

  function setContrast(on: boolean) {
    const d = document.documentElement;
    setHigh(on);
    if (on) d.dataset.contrast = "high";
    else delete d.dataset.contrast;
    store("pcpa-contrast", on ? "1" : null);
  }

  function applyTheme(next: "light" | "dark") {
    document.documentElement.dataset.theme = next;
    store("pcpa-theme", next);
    setTheme(next);
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="pop-label">{t("Text size")}</p>
        <div className="seg" role="group" aria-label={t("Text size")}>
          <button type="button" onClick={() => step(-1)} disabled={size === "sm"} aria-label={t("Decrease text size")}>
            A−
          </button>
          <button type="button" onClick={() => apply("md")} aria-label={t("Reset text size")} aria-pressed={size === "md"}>
            A
          </button>
          <button type="button" onClick={() => step(1)} disabled={size === "xl"} aria-label={t("Increase text size")}>
            A+
          </button>
        </div>
      </div>
      <div>
        <p className="pop-label">{t("Appearance")}</p>
        <div className="seg" role="group" aria-label={t("Appearance")}>
          <button type="button" aria-pressed={theme === "light"} onClick={() => applyTheme("light")}>
            {t("Light")}
          </button>
          <button type="button" aria-pressed={theme === "dark"} onClick={() => applyTheme("dark")}>
            {t("Dark")}
          </button>
        </div>
      </div>
      <div>
        <p className="pop-label">{t("High contrast")}</p>
        <div className="seg" role="group" aria-label={t("High contrast")}>
          <button type="button" aria-pressed={!high} onClick={() => setContrast(false)}>
            {t("Off")}
          </button>
          <button type="button" aria-pressed={high} onClick={() => setContrast(true)}>
            {t("On")}
          </button>
        </div>
      </div>
    </div>
  );
}
