import Image from "next/image";
import Link from "next/link";
import { contact, site } from "@/data/site";
import { Mail, Phone, Pin, socialIcons } from "./Icons";
import { T } from "./T";

const quick = [
  { label: "Office Bearers", href: "/office-bearers" },
  { label: "Central Executive Committee", href: "/central-executive-committee" },
  { label: "Members Directory", href: "/members-directory" },
  { label: "Election 2026-2028", href: "/election-2026-2028" },
  { label: "Document Archive", href: "/document-archive" },
  { label: "Contact Us", href: "/contact" },
];

const about = [
  { label: "About Us", href: "/about" },
  { label: "Mission", href: "/mission" },
  { label: "Vision", href: "/vision" },
  { label: "Memorandum and Articles of Association", href: "/memorandum-and-articles-of-association" },
  { label: "Press Releases", href: "/press-releases" },
  { label: "Photo Gallery", href: "/photo-gallery" },
];

const head = "mb-4 border-b border-white/15 pb-3 text-sm font-bold uppercase tracking-wider text-wheat-400";
const link = "text-sm text-white/75 transition hover:text-white hover:underline";

export function Footer() {
  const multan = contact.offices[0].people[0] as { address: string; phone: string; email: string };
  const lahore = contact.offices[1].people[0] as { address: string };
  return (
    <footer className="grain relative mt-32 bg-forest-900 text-white/80">
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="-translate-y-1/2 rounded-lg bg-wheat-500 px-7 py-8 text-forest-950 shadow-xl shadow-forest-950/25 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:px-10">
          <div>
            <p className="text-2xl font-extrabold leading-tight sm:text-3xl">
              <T>Join the Pakistan Crop Protection Association</T>
            </p>
            <p className="mt-1.5 text-forest-950/75">
              <T>Download the 2026-2027 membership form or get in touch with the secretariat.</T>
            </p>
          </div>
          <div className="mt-5 flex shrink-0 flex-wrap gap-3 sm:mt-0">
            <a
              href="/docs/MEMBERSHIP-APPLICATION-2026-2027.docx"
              className="inline-flex items-center rounded bg-forest-900 px-6 py-3 font-semibold text-white transition hover:bg-forest-800"
            >
              <T>Membership Form</T>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded border border-forest-950/30 px-6 py-3 font-semibold transition hover:bg-forest-950/10"
            >
              <T>Contact Us</T>
            </Link>
          </div>
        </div>

        <div className="-mt-6 grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-4" aria-label="PCPA home">
              <span className="rounded bg-white p-2">
                <Image src="/images/brand/favicon.png" alt="PCPA" width={56} height={56} className="h-14 w-14 object-contain" />
              </span>
              <span className="leading-tight">
                <span className="block text-lg font-extrabold text-white">
                  <T>Pakistan Crop Protection Association</T>
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-wheat-400">
                  <T>Multan · Lahore</T>
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              <T>A member association supporting the growth of Pakistan's agriculture sector, headquartered in Multan.</T>
            </p>
            <ul className="mt-5 flex items-center gap-2">
              {site.socials.map((s) => {
                const Icon = socialIcons[s];
                return (
                  <li key={s}>
                    <a
                      href="#"
                      title={s}
                      aria-label={s}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-wheat-400 hover:bg-wheat-500 hover:text-forest-950"
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Quick links">
            <h3 className={head}>
              <T>Quick links</T>
            </h3>
            <ul className="space-y-2.5">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    <T>{l.label}</T>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="About">
            <h3 className={head}>
              <T>About Us</T>
            </h3>
            <ul className="space-y-2.5">
              {about.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    <T>{l.label}</T>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className={head}>
              <T>Our offices</T>
            </h3>
            <div className="space-y-5 text-sm text-white/75">
              <div>
                <p className="font-semibold text-white">
                  <T>Multan Office</T>
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex gap-2.5">
                    <Pin className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />
                    <span>
                      <T>{multan.address}</T>
                    </span>
                  </li>
                  <li className="flex gap-2.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />
                    <span dir="ltr">{multan.phone}</span>
                  </li>
                  <li className="flex gap-2.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />
                    <a href={`mailto:${multan.email}`} className="hover:text-white hover:underline">
                      {multan.email}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-white">
                  <T>Lahore Office</T>
                </p>
                <ul className="mt-2 space-y-2">
                  <li className="flex gap-2.5">
                    <Pin className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />
                    <span>
                      <T>{lahore.address}</T>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <p className="border-t border-white/10 pt-6 text-sm text-white/60">
          <T>{site.copyright}</T>
        </p>
      </div>
    </footer>
  );
}
