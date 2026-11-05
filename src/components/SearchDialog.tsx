"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchSite, type SearchEntry } from "@/data/searchIndex";
import { useLang } from "./LanguageProvider";
import { Close, FileIcon, Search } from "./Icons";

export const OPEN_SEARCH_EVENT = "pcpa:search";

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
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label={t("Search")}>
      <div className="absolute inset-0 bg-forest-950/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="fade-up relative w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl ring-1 ring-line">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="h-5 w-5 shrink-0 text-forest-700" />
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
            className="h-14 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted/70"
          />
          <button type="button" onClick={() => setOpen(false)} aria-label={t("Close")} className="grid h-8 w-8 place-items-center rounded text-muted hover:bg-forest-50">
            <Close className="h-4 w-4" />
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto">
          {!q.trim() && <p className="px-5 py-8 text-center text-sm text-muted">{t("Type to search")} — Election, Seed Act, Membership…</p>}
          {q.trim() && results.length === 0 && <p className="px-5 py-8 text-center text-sm text-muted">{t("No results found")}</p>}
          <ul>
            {results.map((r, i) => (
              <li key={`${r.kind}-${r.href}-${r.title}`}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                  className={`flex w-full items-start gap-3 px-5 py-3 text-start transition ${i === active ? "bg-forest-50" : ""}`}
                >
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded bg-forest-800 text-white">
                    {r.kind === "Document" ? <FileIcon className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-snug text-forest-900">{t(r.title)}</span>
                    {r.hint && <span className="mt-0.5 block truncate text-xs text-muted">{r.hint}</span>}
                  </span>
                  <span className="mt-0.5 shrink-0 rounded bg-wheat-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-700">
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
