"use client";

import { usePathname } from "next/navigation";
import type { MenuItem } from "@/data/menu";
import { NavLink } from "./NavLink";
import { T } from "./T";

function Node({ item, depth, pathname }: { item: MenuItem; depth: number; pathname: string }) {
  const active = !!item.href && item.href === pathname;
  return (
    <li>
      <NavLink
        item={item}
        style={{ paddingInlineStart: `${12 + depth * 14}px` }}
        className={`side-link${active ? " active" : ""}${item.children ? " parent" : ""}`}
      />
      {item.children && (
        <ul style={{ padding: 0 }}>
          {item.children.map((c) => (
            <Node key={c.label} item={c} depth={depth + 1} pathname={pathname} />
          ))}
        </ul>
      )}
    </li>
  );
}

/** Sub-menu for inner pages: the current section's full tree with the active page marked. */
export function Sidebar({ section }: { section: MenuItem }) {
  const pathname = usePathname();

  const tree = (
    <ul>
      {section.children!.map((c) => (
        <Node key={c.label} item={c} depth={0} pathname={pathname} />
      ))}
    </ul>
  );

  return (
    <>
      {/* Mobile: collapsible */}
      <details className="side-details lg:hidden" style={{ display: undefined }}>
        <summary>
          <T>In this section</T>: <T>{section.label}</T>
        </summary>
        <div style={{ padding: "0 10px 12px" }}>{tree}</div>
      </details>

      {/* Desktop */}
      <aside className="hidden lg:block" aria-label="In this section">
        <div className="side-card">
          <h2>
            <T>{section.label}</T>
          </h2>
          {tree}
        </div>
      </aside>
    </>
  );
}
