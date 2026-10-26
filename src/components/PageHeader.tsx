import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "./Icons";

export function PageHeader({ title, eyebrow }: { title: string; eyebrow?: string }) {
  return (
    <section className="grain relative isolate overflow-hidden bg-forest-900 text-white">
      <Image
        src="/images/slider/slide-08.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-[0.14] mix-blend-luminosity"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-900/90 to-forest-900/60" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-wheat-500/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-wheat-400">Home</Link>
            </li>
            <li aria-hidden><ChevronRight className="h-3.5 w-3.5" /></li>
            <li aria-current="page" className="truncate text-white">{title}</li>
          </ol>
        </nav>
        {eyebrow && (
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-wheat-400">{eyebrow}</p>
        )}
        <h1 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        <div className="mt-6 h-1 w-16 rounded-full bg-wheat-500" />
      </div>
    </section>
  );
}
