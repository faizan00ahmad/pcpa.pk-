import Link from "next/link";
import type { MenuItem } from "@/data/menu";
import { Arrow, Sprout } from "./Icons";

/** Shown for pages that carry no content on the live pcpa.pk site. */
export function EmptyState({ title, children }: { title: string; children?: MenuItem[] }) {
  const links = (children ?? []).filter((c) => c.href);
  return (
    <div className="mx-auto max-w-3xl rounded-3xl border border-dashed border-forest-600/30 bg-white px-6 py-14 text-center shadow-sm sm:px-12">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-forest-50 text-forest-700">
        <Sprout className="h-8 w-8" />
      </span>
      <h2 className="mt-6 text-2xl font-semibold text-forest-900">Content coming soon</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">
        The <strong className="font-semibold text-ink">{title}</strong> page is being prepared and will be published here shortly.
      </p>
      {links.length > 0 && (
        <div className="mt-10 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wheat-500">In this section</p>
          <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href!}
                  className="group flex items-center justify-between gap-3 bg-white px-4 py-3.5 text-ink transition hover:bg-forest-50"
                >
                  <span>{l.label}</span>
                  <Arrow className="h-4 w-4 text-forest-600 transition group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
