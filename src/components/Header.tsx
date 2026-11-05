"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu, type MenuItem } from "@/data/menu";
import { TextTools } from "./A11yToolbar";
import { Arrow, Chevron, Menu, Search } from "./Icons";
import { useLang } from "./LanguageProvider";
import { NavLink } from "./NavLink";
import { ScrollProgress } from "./ScrollProgress";
import { OPEN_SEARCH_EVENT } from "./SearchDialog";
import { SideDrawer } from "./SideDrawer";
import { T } from "./T";

/** Nested levels render inline (indented) so panels never extend past the viewport. */
function Tree({ items, depth = 0 }: { items: MenuItem[]; depth?: number }) {
  return (
    <ul className={depth ? "dd-sub" : undefined}>
      {items.map((c) => (
        <li key={c.label}>
          <NavLink item={c} className={`dd-link${c.children ? " strong" : ""}`} />
          {c.children && <Tree items={c.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

function ViewAll({ item }: { item: MenuItem }) {
  return (
    <Link href={item.href!} className="dd-all">
      <span>
        <T>View all</T> <T>{item.label}</T>
      </span>
      <Arrow className="h-4 w-4 rtl:rotate-180" />
    </Link>
  );
}

/** Wide, grouped panel for the About Us menu. Same items as the menu tree, grouped by theme. */
const aboutColumns: { title: string; labels: string[] }[] = [
  { title: "The Association", labels: ["Mission", "Vision", "The Association", "Memorandum and Articles of Association"] },
  { title: "Leadership & Committees", labels: ["Office Bearers", "Central Executive Committee", "Committee and working Groups"] },
  { title: "Meetings", labels: ["Minutes of the Meetings"] },
];

function MegaMenu({ item }: { item: MenuItem }) {
  const kids = item.children!;
  return (
    <div className="dd-menu mega">
      <div className="grid gap-6 md:grid-cols-3">
        {aboutColumns.map((col) => (
          <div key={col.title}>
            <p className="dd-title">
              <T>{col.title}</T>
            </p>
            <Tree items={kids.filter((k) => col.labels.includes(k.label))} />
          </div>
        ))}
      </div>
      <ViewAll item={item} />
    </div>
  );
}

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [tools, setTools] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const pathname = usePathname();
  const { t, lang, setLang } = useLang();
  const close = useCallback(() => setOpen(false), []);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (!tools) return;
    const onDown = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) setTools(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setTools(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [tools]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("pcpa-theme", next);
    } catch {}
    setTheme(next);
  }

  const isActive = (i: MenuItem): boolean => i.href === pathname || !!i.children?.some(isActive);
  const openSearch = () => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="header-logo" aria-label="PCPA home">
            <Image src="/images/brand/favicon.png" alt="PCPA" width={32} height={32} priority />
            <span>PCPA</span>
          </Link>

          <nav className="nav" aria-label="Main">
            {menu.map((item, idx) => {
              const cls = `nav-link${isActive(item) ? " active" : ""}`;
              if (!item.children) {
                return <NavLink key={item.label} item={item} className={cls} />;
              }
              return (
                <div key={item.label} className="dd">
                  <NavLink item={item} className={cls}>
                    <T>{item.label}</T>
                    <Chevron className="h-3 w-3 opacity-60" />
                  </NavLink>
                  {item.label === "About Us" ? (
                    <MegaMenu item={item} />
                  ) : (
                    <div className={`dd-menu${idx >= 4 ? " end" : ""}`}>
                      <Tree items={item.children} />
                      {item.href && <ViewAll item={item} />}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="nav-actions">
            <button type="button" className="icon-btn" onClick={openSearch} aria-label={t("Search")} title={`${t("Search")} (Ctrl K)`}>
              <Search className="h-4 w-4" />
            </button>

            <div className="pop" ref={popRef}>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setTools((v) => !v)}
                aria-expanded={tools}
                aria-label={t("Text size")}
                title={t("Text size")}
              >
                Aa
              </button>
              {tools && (
                <div className="pop-panel" role="dialog" aria-label={t("Text size")}>
                  <TextTools />
                </div>
              )}
            </div>

            <button
              type="button"
              className="icon-btn"
              onClick={() => setLang(lang === "ur" ? "en" : "ur")}
              aria-label={t("Language")}
              title={t("Language")}
              lang={lang === "ur" ? "en" : "ur"}
            >
              {lang === "ur" ? "EN" : "اردو"}
            </button>

            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Light" : "Dark"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>

            <button type="button" className="icon-btn menu-btn" onClick={() => setOpen(true)} aria-label={t("Menu")} aria-expanded={open}>
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
        <ScrollProgress />
      </header>
      <SideDrawer open={open} onClose={close} />
    </>
  );
}
