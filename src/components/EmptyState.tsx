import Link from "next/link";
import type { MenuItem } from "@/data/menu";
import { Arrow, Sprout } from "./Icons";
import { T } from "./T";

/** Shown for pages that carry no content on the live pcpa.pk site. */
export function EmptyState({ title, children }: { title: string; children?: MenuItem[] }) {
  const links = (children ?? []).filter((c) => c.href);
  return (
    <div className="mx-auto max-w-3xl rounded-lg border border-dashed border-forest-600/30 bg-white px-6 py-14 text-center shadow-sm sm:px-12">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-50 text-forest-700">
        <Sprout className="h-8 w-8" />
      </span>
      <h2 className="mt-6 text-2xl text-forest-900"><T>Content coming soon</T></h2>
      <p className="mx-auto mt-3 max-w-md text-muted">
        <strong className="font-semibold text-ink"><T>{title}</T></strong> <T>page is being prepared and will be published here shortly.</T>
      </p>
      {links.length > 0 && (
        <div className="mt-10 text-start">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-700"><T>In this section</T></p>
          <ul className="mt-3 divide-y divide-line overflow-hidden rounded border border-line">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href!}
                  className="group flex items-center justify-between gap-3 bg-white px-4 py-3.5 text-ink transition hover:bg-forest-50"
                >
                  <span><T>{l.label}</T></span>
                  <Arrow className="h-4 w-4 text-forest-600 transition group-hover:translate-x-1 rtl:rotate-180" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
