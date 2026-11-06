"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuItem } from "@/data/menu";
import { T } from "./T";

/** Sticky sub-navigation for a menu section (title on the left, section pages on the right). */
export function LocalNav({ section }: { section: MenuItem }) {
  const pathname = usePathname();
  const has = (i: MenuItem): boolean => i.href === pathname || !!i.children?.some(has);
  const nav = useRef<HTMLElement>(null);
  const links = section.children!.filter((c) => c.href);

  // keep the current page visible in the horizontally scrolling list
  useEffect(() => {
    const el = nav.current;
    const cur = el?.querySelector<HTMLElement>('[aria-current="page"]');
    if (el && cur) el.scrollLeft = cur.offsetLeft - el.clientWidth / 2 + cur.clientWidth / 2;
  }, [pathname]);

  return (
    <div className="local">
      <div className="local-inner">
        <p className="local-title">
          {section.href ? (
            <Link href={section.href}>
              <T>{section.label}</T>
            </Link>
          ) : (
            <T>{section.label}</T>
          )}
        </p>
        {links.length > 0 && (
          <nav className="local-links" aria-label="In this section" ref={nav}>
            {links.map((c) => (
              <Link key={c.label} href={c.href!} aria-current={has(c) ? "page" : undefined}>
                <T>{c.label}</T>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}
