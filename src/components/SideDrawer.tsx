"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu, type MenuItem } from "@/data/menu";
import { useLang } from "./LanguageProvider";
import { T } from "./T";

const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function SubTree({ items, pathname, close }: { items: MenuItem[]; pathname: string; close: () => void }) {
  return (
    <ul className="mm-sub">
      {items.map((c) => (
        <li key={c.label}>
          {c.file ? (
            <a href={c.file.src} target="_blank" rel="noopener noreferrer" onClick={close}>
              <T>{c.label}</T>
              <small style={{ marginInlineStart: "auto", fontSize: 11, fontWeight: 600, color: "var(--fg-dim)", textTransform: "uppercase" }}>{c.file.kind}</small>
            </a>
          ) : c.href ? (
            <Link href={c.href} onClick={close} aria-current={c.href === pathname ? "page" : undefined}>
              <T>{c.label}</T>
            </Link>
          ) : (
            <span style={{ cursor: "default" }}>
              <T>{c.label}</T>
            </span>
          )}
          {c.children && <SubTree items={c.children} pathname={pathname} close={close} />}
        </li>
      ))}
    </ul>
  );
}

function Item({ item, pathname, close }: { item: MenuItem; pathname: string; close: () => void }) {
  const has = (i: MenuItem): boolean => i.href === pathname || !!i.children?.some(has);
  const [open, setOpen] = useState(has(item) && !!item.children);
  return (
    <li className="mm-item">
      <div className="mm-row">
        {item.href ? (
          <Link href={item.href} className="mm-link" onClick={close}>
            <T>{item.label}</T>
          </Link>
        ) : (
          <span className="mm-link">
            <T>{item.label}</T>
          </span>
        )}
        {item.children && (
          <button type="button" className="mm-toggle" aria-expanded={open} aria-label={item.label} onClick={() => setOpen((o) => !o)}>
            <Chevron />
          </button>
        )}
      </div>
      {item.children && open && <SubTree items={item.children} pathname={pathname} close={close} />}
    </li>
  );
}

/** Full-screen mobile menu (large type, expandable sections). */
export function SideDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div className="mobile-menu" data-open={open} role="dialog" aria-modal="true" aria-label={t("Menu")} aria-hidden={!open} inert={!open}>
      <div className="mobile-menu-bar">
        <span style={{ fontSize: 14, fontWeight: 700 }}>
          <T>Primary Menu</T>
        </span>
        <button type="button" className="tool-btn" onClick={onClose} aria-label={t("Close")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <nav aria-label="Primary menu">
        <ul>
          {menu.map((item) => (
            <Item key={item.label} item={item} pathname={pathname} close={onClose} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
