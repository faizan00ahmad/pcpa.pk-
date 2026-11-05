"use client";

import { usePathname } from "next/navigation";
import { useLang } from "./LanguageProvider";
import type { MenuItem } from "@/data/menu";
import { NavLink } from "./NavLink";
import { T } from "./T";

function Node({ item, depth, pathname }: { item: MenuItem; depth: number; pathname: string }) {
  const active = !!item.href && item.href === pathname;
  return (
    <li>
      <NavLink
        item={item}
        style={{ paddingInlineStart: `${0.9 + depth * 1}rem` }}
        className={`flex items-start gap-2 border-s-[3px] py-2.5 pe-3 text-sm leading-snug transition-colors ${
          active
            ? "border-wheat-500 bg-forest-50 font-bold text-forest-900"
            : "border-transparent text-ink/80 hover:border-forest-600 hover:bg-forest-50 hover:text-forest-800"
        } ${item.children && !active ? "font-semibold" : ""}`}
      />
      {item.children && (
        <ul>
          {item.children.map((c) => (
            <Node key={c.label} item={c} depth={depth + 1} pathname={pathname} />
          ))}
        </ul>
      )}
    </li>
  );
}

/** Left sub-menu for inner pages: the current section's full tree with the active page marked. */
export function Sidebar({ section }: { section: MenuItem }) {
  const pathname = usePathname();
  const { t } = useLang();

  const tree = (
    <ul className="divide-y divide-line">
      {section.children!.map((c) => (
        <Node key={c.label} item={c} depth={0} pathname={pathname} />
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile: collapsible */}
      <details className="mb-8 overflow-hidden rounded border border-line bg-white lg:hidden">
        <summary className="cursor-pointer bg-forest-900 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white">
          <T>In this section</T>: <T>{section.label}</T>
        </summary>
        {tree}
      </details>

      {/* Desktop */}
      <aside className="hidden lg:block" aria-label={t("In this section")}>
        <div className="sticky top-20 overflow-hidden rounded border border-line bg-white shadow-sm">
          <h2 className="bg-forest-900 px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-white">
            <T>{section.label}</T>
          </h2>
          {tree}
        </div>
      </aside>
    </>
  );
}
