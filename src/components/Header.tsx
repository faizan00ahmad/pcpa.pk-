"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu, type MenuItem } from "@/data/menu";
import { TextTools } from "./A11yToolbar";
import { Search } from "./Icons";
import { useLang } from "./LanguageProvider";
import { SearchDialogOpen } from "./SearchDialog";
import { SideDrawer } from "./SideDrawer";
import { T } from "./T";

/** One link inside a mega panel: page, document (with type badge) or inert label. */
function MegaLink({ item, strong, compact }: { item: MenuItem; strong?: boolean; compact?: boolean }) {
  const cls = "mega-link";
  const style = compact ? { fontSize: 17, fontWeight: 600 } : undefined;
  const label = <T>{item.label}</T>;
  if (item.file) {
    return (
      <a href={item.file.src} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
        {label}
        <small>{item.file.kind}</small>
      </a>
    );
  }
  if (item.href) {
    return (
      <Link href={item.href} className={cls} style={strong ? { ...style, fontWeight: 600 } : style}>
        {label}
      </Link>
    );
  }
  return (
    <span className={cls} style={{ ...style, cursor: "default" }}>
      {label}
    </span>
  );
}

function MegaTree({ items, depth = 0, compact = false }: { items: MenuItem[]; depth?: number; compact?: boolean }) {
  return (
    <ul className={depth ? "mega-sub" : undefined}>
      {items.map((c) => (
        <li key={c.label}>
          <MegaLink item={c} strong={depth === 0} compact={compact && depth === 0} />
          {c.children && <MegaTree items={c.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

/** Same items as the menu tree, grouped by theme for the About Us panel. */
const aboutColumns: { title: string; labels: string[] }[] = [
  { title: "The Association", labels: ["Mission", "Vision", "The Association", "Memorandum and Articles of Association"] },
  { title: "Leadership & Committees", labels: ["Office Bearers", "Central Executive Committee", "Committee and working Groups"] },
  { title: "Meetings", labels: ["Minutes of the Meetings"] },
];

function Mega({ item }: { item: MenuItem }) {
  const kids = item.children!;
  if (item.label === "About Us") {
    return (
      <div className="mega">
        <div className="mega-inner">
          {aboutColumns.map((col) => (
            <div key={col.title}>
              <p className="mega-title">
                <T>{col.title}</T>
              </p>
              <MegaTree items={kids.filter((k) => col.labels.includes(k.label))} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  const hasLong = kids.some((k) => k.label.length > 44);
  return (
    <div className="mega">
      <div className="mega-inner cols-1">
        <div>
          <p className="mega-title">
            <T>{item.label}</T>
          </p>
          <MegaTree items={kids} compact={hasLong} />
        </div>
        {item.href && (
          <div style={{ alignSelf: "end" }}>
            <Link href={item.href} className="link-more">
              <T>View all</T> <T>{item.label}</T>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [tools, setTools] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t, lang, setLang } = useLang();
  const close = useCallback(() => setOpen(false), []);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
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

  const isActive = (i: MenuItem): boolean => i.href === pathname || !!i.children?.some(isActive);

  return (
    <>
      <header className="gnav" data-scrolled={scrolled}>
        <div className="gnav-bar">
          <div className="gnav-inner">
            <Link href="/" className="gnav-logo" aria-label="PCPA home">
              <Image src="/images/brand/favicon.png" alt="" width={26} height={26} priority />
              <span>PCPA</span>
            </Link>

            <nav className="nav-list" aria-label="Main">
              {menu.map((item) => {
                const cls = `nav-link${isActive(item) ? " active" : ""}`;
                return (
                  <div key={item.label} className="nav-item">
                    {item.href ? (
                      <Link href={item.href} className={cls}>
                        <T>{item.label}</T>
                      </Link>
                    ) : (
                      <span className={cls} tabIndex={0} role="button" aria-haspopup="true">
                        <T>{item.label}</T>
                      </span>
                    )}
                    {item.children && <Mega item={item} />}
                  </div>
                );
              })}
            </nav>

            <div className="gnav-tools">
              <SearchDialogOpen label={t("Search")}>
                <Search className="h-[15px] w-[15px]" />
              </SearchDialogOpen>

              <div className="pop" ref={popRef}>
                <button type="button" className="tool-btn" onClick={() => setTools((v) => !v)} aria-expanded={tools} aria-label={t("Text size")} title={t("Text size")}>
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
                className="tool-btn"
                onClick={() => setLang(lang === "ur" ? "en" : "ur")}
                aria-label={t("Language")}
                title={t("Language")}
                lang={lang === "ur" ? "en" : "ur"}
              >
                {lang === "ur" ? "EN" : "اردو"}
              </button>

              <button type="button" className="tool-btn menu-btn" onClick={() => setOpen(true)} aria-label={t("Menu")} aria-expanded={open}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M4 8h16M4 16h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="scrim" aria-hidden />
      </header>
      <SideDrawer open={open} onClose={close} />
    </>
  );
}
