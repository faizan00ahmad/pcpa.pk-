import Image from "next/image";
import Link from "next/link";
import { menu } from "@/data/menu";
import { site } from "@/data/site";
import { NavLink } from "./NavLink";
import { socialIcons } from "./Icons";

export function Footer() {
  return (
    <footer className="grain relative mt-32 bg-forest-900 text-white/80">
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="-translate-y-1/2 rounded-2xl bg-wheat-500 px-7 py-8 text-forest-950 shadow-xl shadow-forest-950/20 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-10">
          <div>
            <p className="text-2xl font-extrabold leading-tight sm:text-3xl">Join the Pakistan Crop Protection Association</p>
            <p className="mt-1.5 text-forest-950/75">Download the 2026-2027 membership form or get in touch with the secretariat.</p>
          </div>
          <div className="mt-5 flex shrink-0 flex-wrap gap-3 sm:mt-0">
            <a
              href="/docs/MEMBERSHIP-APPLICATION-2026-2027.docx"
              className="inline-flex items-center gap-2 rounded-md bg-forest-900 px-6 py-3 font-semibold text-white transition hover:bg-forest-800"
            >
              Membership Form
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-forest-950/30 px-6 py-3 font-semibold transition hover:bg-forest-950/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="-mt-8 flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
          <Link href="/" className="inline-flex items-center gap-4" aria-label="PCPA home">
            <span className="rounded-2xl bg-white p-2.5">
              <Image src="/images/brand/favicon.png" alt="PCPA" width={56} height={56} className="h-14 w-14 object-contain" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-semibold text-white">{site.fullName}</span>
              <span className="text-xs uppercase tracking-[0.22em] text-wheat-400">Multan · Lahore</span>
            </span>
          </Link>
          <ul className="flex items-center gap-2">
            {site.socials.map((s) => {
              const Icon = socialIcons[s];
              return (
                <li key={s}>
                  <a
                    href="#"
                    title={s}
                    aria-label={s}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-wheat-400 hover:bg-wheat-500 hover:text-forest-950"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid gap-x-8 gap-y-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {menu
            .filter((m) => m.label !== "Home")
            .map((group) => (
              <div key={group.label}>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-wheat-400">
                  {group.href ? (
                    <Link href={group.href} className="hover:text-white">{group.label}</Link>
                  ) : (
                    group.label
                  )}
                </h3>
                {group.children && (
                  <ul className="space-y-2 text-sm">
                    {group.children.map((c) => (
                      <li key={c.label}>
                        <NavLink item={c} className="flex items-start gap-2 hover:text-white">
                          {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </nav>

        <p className="border-t border-white/10 pt-6 text-sm text-white/60">{site.copyright}</p>
      </div>
    </footer>
  );
}
