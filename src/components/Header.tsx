"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu, type MenuItem } from "@/data/menu";
import { Arrow, Chevron, Menu } from "./Icons";
import { NavLink } from "./NavLink";
import { SideDrawer } from "./SideDrawer";

/** Nested levels render inline (indented) so panels never extend past the viewport. */
function Tree({ items, depth = 0 }: { items: MenuItem[]; depth?: number }) {
  return (
    <ul className={depth ? "ml-3 border-l border-line pl-1.5" : "space-y-0.5"}>
      {items.map((c) => (
        <li key={c.label}>
          <NavLink
            item={c}
            className={`flex items-start gap-2 rounded-lg px-3 py-2 leading-snug hover:bg-forest-50 hover:text-forest-800 ${
              depth ? "text-[13px] text-ink/70" : "text-sm text-ink/85"
            } ${c.children ? "font-semibold" : ""}`}
          >
            {c.label}
          </NavLink>
          {c.children && <Tree items={c.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

const show =
  "invisible absolute top-full z-50 pt-2 opacity-0 transition duration-150 group-hover/item:visible group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:opacity-100";

function ViewAll({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mt-1 flex items-center justify-between rounded-md bg-forest-50 px-3 py-2.5 text-sm font-semibold text-forest-800 transition hover:bg-forest-100"
    >
      View all {label} <Arrow className="h-4 w-4" />
    </Link>
  );
}

function Flyout({ item, alignRight }: { item: MenuItem; alignRight: boolean }) {
  return (
    <div className={`${show} w-[23rem] max-w-[90vw] ${alignRight ? "right-0" : "left-0"}`}>
      <div className="max-h-[75vh] overflow-y-auto rounded-xl border border-line border-t-2 border-t-wheat-500 bg-white p-2 shadow-xl shadow-forest-950/10">
        <Tree items={item.children!} />
        {item.href && <ViewAll href={item.href} label={item.label} />}
      </div>
    </div>
  );
}

/** Wide, grouped panel for the About Us menu. Same items as the menu tree, just grouped by theme. */
const aboutColumns: { title: string; labels: string[] }[] = [
  {
    title: "The Association",
    labels: ["Mission", "Vision", "The Association", "Memorandum and Articles of Association"],
  },
  {
    title: "Leadership & Committees",
    labels: ["Office Bearers", "Central Executive Committee", "Committee and working Groups"],
  },
  { title: "Meetings", labels: ["Minutes of the Meetings"] },
];

function MegaMenu({ item }: { item: MenuItem }) {
  const kids = item.children!;
  return (
    <div className={`${show} left-0 w-[min(54rem,92vw)]`}>
      <div className="max-h-[78vh] overflow-y-auto rounded-xl border border-line border-t-2 border-t-wheat-500 bg-white p-5 shadow-xl shadow-forest-950/10">
        <div className="grid gap-6 md:grid-cols-3">
          {aboutColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-wheat-500">{col.title}</p>
              <Tree items={kids.filter((k) => col.labels.includes(k.label))} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded-lg bg-forest-900 px-5 py-3.5 text-white">
          <span className="text-sm text-white/80">Pakistan Crop Protection Association</span>
          <Link href={item.href!} className="inline-flex items-center gap-2 text-sm font-semibold text-wheat-400 hover:text-white">
            About PCPA <Arrow className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const isActive = (i: MenuItem): boolean =>
    i.href === pathname || !!i.children?.some(isActive);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b bg-white/90 backdrop-blur-md transition-shadow ${
          scrolled ? "border-line shadow-md shadow-forest-950/5" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="PCPA home">
            <Image
              src="/images/brand/favicon.png"
              alt="PCPA"
              width={56}
              height={56}
              priority
              className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
            />
            <span className="min-w-0 leading-tight">
              <span className="block max-w-[15rem] font-display text-base font-semibold leading-tight text-forest-900 sm:max-w-[17rem] sm:text-lg xl:max-w-[14rem]">
                Pakistan Crop Protection Association
              </span>
              <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] text-wheat-500 sm:block">
                PCPA · Multan
              </span>
            </span>
          </Link>

          <nav className="hidden flex-1 justify-end xl:block" aria-label="Main">
            <ul className="flex items-center gap-0.5">
              {menu.map((item, idx) => (
                <li key={item.label} className="group/item relative">
                  <NavLink
                    item={item}
                    className={`flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                      isActive(item)
                        ? "bg-forest-800 text-white"
                        : "text-ink/80 hover:bg-forest-50 hover:text-forest-800"
                    }`}
                  >
                    {item.label}
                    {item.children && <Chevron className="h-3.5 w-3.5 opacity-60" />}
                  </NavLink>
                  {item.children &&
                    (item.label === "About Us" ? (
                      <MegaMenu item={item} />
                    ) : (
                      <Flyout item={item} alignRight={idx >= 3} />
                    ))}
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-forest-800 text-white shadow-sm transition hover:bg-forest-700"
          >
            <Menu />
          </button>
        </div>
      </header>
      <SideDrawer open={open} onClose={close} />
    </>
  );
}
