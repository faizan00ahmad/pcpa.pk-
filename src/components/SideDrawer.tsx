"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { menu } from "@/data/menu";
import { Chevron, Close } from "./Icons";
import { NavLink } from "./NavLink";

function Node({
  item,
  depth,
  pathname,
  close,
}: {
  item: MenuItem;
  depth: number;
  pathname: string;
  close: () => void;
}) {
  const hasKids = !!item.children?.length;
  const active = !!item.href && item.href === pathname;
  const containsActive = (i: MenuItem): boolean =>
    i.href === pathname || !!i.children?.some(containsActive);
  const [open, setOpen] = useState(() => hasKids && containsActive(item));

  const row =
    "flex items-start gap-2 rounded-lg px-3 py-2.5 text-[15px] leading-snug transition-colors " +
    (active
      ? "bg-forest-800 font-semibold text-white"
      : "text-ink/85 hover:bg-forest-50 hover:text-forest-800");

  return (
    <li>
      <div className="flex items-stretch gap-1" style={{ paddingLeft: depth * 14 }}>
        <div className="min-w-0 flex-1">
          <NavLink item={item} className={row} onNavigate={close} />
        </div>
        {hasKids && (
          <button
            type="button"
            aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid w-10 shrink-0 place-items-center rounded-lg text-forest-700 hover:bg-forest-50"
          >
            <Chevron className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>
      {hasKids && open && (
        <ul className="mt-0.5 space-y-0.5 border-l border-line ml-5">
          {item.children!.map((c) => (
            <Node key={c.label} item={c} depth={depth > 0 ? 1 : 0} pathname={pathname} close={close} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function SideDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

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
    <div className={`fixed inset-0 z-[70] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-forest-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Site menu"
        className={`absolute right-0 top-0 flex h-full w-[min(92vw,400px)] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <Image src="/images/brand/favicon.png" alt="PCPA" width={44} height={44} className="h-11 w-11 object-contain" />
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold text-forest-900">PCPA</p>
              <p className="text-[11px] uppercase tracking-widest text-muted">Primary Menu</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-full bg-forest-50 text-forest-800 hover:bg-forest-100"
          >
            <Close />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Primary menu">
          <ul className="space-y-0.5">
            {menu.map((item) => (
              <Node key={item.label} item={item} depth={0} pathname={pathname} close={onClose} />
            ))}
          </ul>
        </nav>
        <div className="border-t border-line bg-forest-50 px-5 py-4 text-xs text-muted">
          Pakistan Crop Protection Association · Multan
        </div>
      </aside>
    </div>
  );
}
