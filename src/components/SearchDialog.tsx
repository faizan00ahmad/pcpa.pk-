"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchSite, type SearchEntry } from "@/data/searchIndex";
import { useLang } from "./LanguageProvider";
import { Search } from "./Icons";

export const OPEN_SEARCH_EVENT = "pcpa:search";

/** Nav icon that opens the search overlay. */
export function SearchDialogOpen({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <button type="button" className="tool-btn" aria-label={label} title={`${label} (Ctrl K)`} onClick={() => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))}>
      {children}
    </button>
  );
}

export function SearchDialog() {
  const { t } = useLang();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchSite(q), [q]);

  useEffect(() => {
    const show = () => setOpen(true);
    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener(OPEN_SEARCH_EVENT, show);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener(OPEN_SEARCH_EVENT, show);
      window.removeEventListener("keydown", key);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => input.current?.focus(), 30);
      return () => {
        document.body.style.overflow = "";
      };
    }
    setQ("");
    setActive(0);
  }, [open]);

  useEffect(() => setActive(0), [q]);

  function go(e: SearchEntry) {
    setOpen(false);
    if (e.external) window.open(e.href, "_blank", "noopener,noreferrer");
    else router.push(e.href);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-start justify-center px-4 pt-[9vh]" role="dialog" aria-modal="true" aria-label={t("Search")}>
      <div className="absolute inset-0" style={{ background: "var(--scrim)", backdropFilter: "blur(14px)" }} onClick={() => setOpen(false)} />
      <div
        className="fade-up relative w-full overflow-hidden"
        style={{ maxWidth: 740, background: "var(--bg)", borderRadius: 28, boxShadow: "0 40px 100px rgba(0,0,0,.35)", border: "1px solid var(--line)" }}
      >
        <div className="flex items-center gap-4 px-6" style={{ borderBottom: "1px solid var(--line)" }}>
          <Search className="h-6 w-6 shrink-0" style={{ color: "var(--fg-dim)" }} />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter" && results[active]) {
                go(results[active]);
              }
            }}
            placeholder={t("Search pages and documents…")}
            aria-label={t("Search")}
            className="h-[72px] flex-1 bg-transparent outline-none"
            style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em", color: "var(--fg)" }}
          />
          <button type="button" onClick={() => setOpen(false)} className="tool-btn" aria-label={t("Close")}>
            Esc
          </button>
        </div>
        <div className="max-h-[56vh] overflow-y-auto">
          {!q.trim() && (
            <p className="px-6 py-10 text-center" style={{ color: "var(--fg-dim)" }}>
              {t("Type to search")} — Election, Seed Act, Membership…
            </p>
          )}
          {q.trim() && results.length === 0 && (
            <p className="px-6 py-10 text-center" style={{ color: "var(--fg-dim)" }}>
              {t("No results found")}
            </p>
          )}
          <ul className="p-2">
            {results.map((r, i) => (
              <li key={`${r.kind}-${r.href}-${r.title}`}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                  className="flex w-full items-center gap-4 px-4 py-3 text-start"
                  style={{ borderRadius: 16, background: i === active ? "var(--bg-alt)" : "transparent" }}
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate" style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.015em" }}>
                      {t(r.title)}
                    </span>
                    {r.hint && (
                      <span className="mt-0.5 block truncate" style={{ fontSize: 13, color: "var(--fg-dim)" }}>
                        {r.hint}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0" style={{ fontSize: 12, fontWeight: 600, color: "var(--fg-dim)", background: "var(--line)", padding: "3px 10px", borderRadius: 99 }}>
                    {t(r.kind)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
