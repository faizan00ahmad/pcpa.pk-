"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu, type MenuItem } from "@/data/menu";
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
    <ul className={depth ? "ms-3 border-s border-line ps-1.5" : "space-y-0.5"}>
      {items.map((c) => (
        <li key={c.label}>
          <NavLink
            item={c}
            className={`flex items-start gap-2 rounded px-3 py-2 leading-snug hover:bg-forest-50 hover:text-forest-800 ${
              depth ? "text-[13px] text-ink/70" : "text-sm text-ink/85"
            } ${c.children ? "font-semibold" : ""}`}
          />
          {c.children && <Tree items={c.children} depth={depth + 1} />}
        </li>
      ))}
    </ul>
  );
}

const show =
  "invisible absolute top-full z-50 translate-y-2 opacity-0 transition duration-200 group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100";

function ViewAll({ item }: { item: MenuItem }) {
  return (
    <Link
      href={item.href!}
      className="mt-1 flex items-center justify-between rounded bg-forest-50 px-3 py-2.5 text-sm font-semibold text-forest-800 transition hover:bg-forest-100"
    >
      <span>
        <T>View all</T> <T>{item.label}</T>
      </span>
      <Arrow className="h-4 w-4 rtl:rotate-180" />
    </Link>
  );
}

function Flyout({ item, alignEnd }: { item: MenuItem; alignEnd: boolean }) {
  return (
    <div className={`${show} w-[23rem] max-w-[90vw] ${alignEnd ? "end-0" : "start-0"}`}>
      <div className="max-h-[75vh] overflow-y-auto rounded-b-lg border border-line border-t-[3px] border-t-wheat-500 bg-white p-2 shadow-xl shadow-forest-950/15">
        <Tree items={item.children!} />
        {item.href && <ViewAll item={item} />}
      </div>
    </div>
  );
}

/** Wide, grouped panel for the About Us menu. Same items as the menu tree, grouped by theme. */
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
    <div className={`${show} start-0 w-[min(54rem,92vw)]`}>
      <div className="max-h-[78vh] overflow-y-auto rounded-b-lg border border-line border-t-[3px] border-t-wheat-500 bg-white p-5 shadow-xl shadow-forest-950/15">
        <div className="grid gap-6 md:grid-cols-3">
          {aboutColumns.map((col) => (
            <div key={col.title}>
              <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">
                <T>{col.title}</T>
              </p>
              <Tree items={kids.filter((k) => col.labels.includes(k.label))} />
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between rounded bg-forest-900 px-5 py-3.5 text-white">
          <span className="text-sm text-white/80">
            <T>Pakistan Crop Protection Association</T>
          </span>
          <Link href={item.href!} className="inline-flex items-center gap-2 text-sm font-semibold text-wheat-400 hover:text-white">
            <T>About PCPA</T> <Arrow className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t, lang } = useLang();
  const close = useCallback(() => setOpen(false), []);

  const isActive = (i: MenuItem): boolean => i.href === pathname || !!i.children?.some(isActive);
  const openSearch = () => window.dispatchEvent(new Event(OPEN_SEARCH_EVENT));

  return (
    <>
      {/* Emblem band */}
      <div className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-4" aria-label="PCPA home">
            <Image
              src="/images/brand/favicon.png"
              alt="PCPA"
              width={72}
              height={72}
              priority
              className="h-14 w-14 shrink-0 object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
            />
            <span className="min-w-0 leading-tight">
              <span className="block text-lg font-extrabold uppercase tracking-wide text-forest-900 sm:text-2xl">
                <T>Pakistan Crop Protection Association</T>
              </span>
              {lang === "en" && (
                <span className="mt-0.5 hidden text-sm font-medium text-muted sm:block" lang="ur" dir="rtl">
                  پاکستان کراپ پروٹیکشن ایسوسی ایشن
                </span>
              )}
              <span className="mt-1 hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-700 sm:block">
                <T>PCPA · Multan</T>
              </span>
            </span>
          </Link>

          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-11 w-60 items-center gap-2.5 rounded border border-line bg-cream px-3.5 text-sm text-muted transition hover:border-forest-600"
              aria-label={t("Search")}
            >
              <Search className="h-4 w-4 text-forest-700" />
              <span className="flex-1 text-start">{t("Search")}…</span>
              <kbd className="rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-muted ring-1 ring-line">Ctrl K</kbd>
            </button>
            <a
              href="/docs/MEMBERSHIP-APPLICATION-2026-2027.docx"
              className="inline-flex h-11 items-center rounded bg-wheat-500 px-5 text-sm font-bold text-forest-950 transition hover:bg-wheat-400"
            >
              <T>Membership Form</T>
            </a>
          </div>
        </div>
        {/* tricolour-style stripe */}
        <div className="flex h-1" aria-hidden>
          <span className="flex-1 bg-forest-900" />
          <span className="w-1/4 bg-white" />
          <span className="w-24 bg-wheat-500" />
        </div>
      </div>

      {/* Main navigation (sticky) */}
      <header className="sticky top-0 z-50 bg-forest-900 text-white shadow-md shadow-forest-950/20">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <nav className="hidden xl:block" aria-label="Main">
            <ul className="flex items-center">
              {menu.map((item, idx) => (
                <li key={item.label} className="group/item relative">
                  <NavLink
                    item={item}
                    className={`flex items-center gap-1 whitespace-nowrap border-b-[3px] px-4 py-4 text-sm font-semibold transition-colors ${
                      isActive(item)
                        ? "border-wheat-400 bg-forest-800 text-white"
                        : "border-transparent text-white/85 hover:bg-forest-800 hover:text-white"
                    }`}
                  >
                    <T>{item.label}</T>
                    {item.children && <Chevron className="h-3.5 w-3.5 opacity-70" />}
                  </NavLink>
                  {item.children &&
                    (item.label === "About Us" ? (
                      <MegaMenu item={item} />
                    ) : (
                      <Flyout item={item} alignEnd={idx >= 4} />
                    ))}
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("Menu")}
            aria-expanded={open}
            className="flex items-center gap-2 py-3 text-sm font-semibold xl:hidden"
          >
            <Menu /> <T>Menu</T>
          </button>

          <div className="flex items-center gap-2 py-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label={t("Search")}
              className="grid h-10 w-10 place-items-center rounded text-white/90 transition hover:bg-forest-800 md:hidden"
            >
              <Search />
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("Menu")}
              className="hidden h-10 w-10 place-items-center rounded text-white/90 transition hover:bg-forest-800 md:grid xl:grid"
            >
              <Menu />
            </button>
          </div>
          <ScrollProgress />
        </div>
      </header>
      <SideDrawer open={open} onClose={close} />
    </>
  );
}
