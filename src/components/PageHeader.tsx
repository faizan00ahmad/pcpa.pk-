import Link from "next/link";
import { ChevronRight } from "./Icons";
import { T } from "./T";

export type Crumb = { label: string; href?: string };

/** Flat green banner with breadcrumb trail, title and a gold rule. */
export function PageHeader({ title, eyebrow, trail = [] }: { title: string; eyebrow?: string; trail?: Crumb[] }) {
  return (
    <section className="grain relative overflow-hidden bg-forest-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest-950/70 via-transparent to-forest-700/30" />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-wheat-400">
                <T>Home</T>
              </Link>
            </li>
            {trail.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden />
                {c.href ? (
                  <Link href={c.href} className="hover:text-wheat-400">
                    <T>{c.label}</T>
                  </Link>
                ) : (
                  <span>
                    <T>{c.label}</T>
                  </span>
                )}
              </li>
            ))}
            <li aria-hidden className="flex items-center">
              <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </li>
            <li aria-current="page" className="truncate text-white">
              <T>{title}</T>
            </li>
          </ol>
        </nav>
        {eyebrow && (
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-wheat-400">
            <T>{eyebrow}</T>
          </p>
        )}
        <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
          <T>{title}</T>
        </h1>
        <div className="mt-6 flex items-center gap-1" aria-hidden>
          <span className="h-1 w-16 bg-wheat-500" />
          <span className="h-1 w-3 bg-white/40" />
        </div>
      </div>
    </section>
  );
}
