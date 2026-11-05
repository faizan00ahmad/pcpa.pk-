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

export function Footer() {
  const multan = contact.offices[0].people[0] as { address: string; phone: string; email: string };
  const lahore = contact.offices[1].people[0] as { address: string };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="PCPA home">
              <Image src="/images/brand/favicon.png" alt="PCPA" width={44} height={44} />
              <span>
                <T>Pakistan Crop Protection Association</T>
              </span>
            </Link>
            <p>
              <T>A member association supporting the growth of Pakistan's agriculture sector, headquartered in Multan.</T>
            </p>
            <ul className="social">
              {site.socials.map((s) => {
                const Icon = socialIcons[s];
                return (
                  <li key={s} style={{ margin: 0 }}>
                    <a href="#" title={s} aria-label={s}>
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Quick links">
            <h4>
              <T>Quick links</T>
            </h4>
            <ul>
              {quick.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <T>{l.label}</T>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="About">
            <h4>
              <T>About Us</T>
            </h4>
            <ul>
              {about.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>
                    <T>{l.label}</T>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4>
              <T>Our offices</T>
            </h4>
            <ul style={{ fontSize: 14 }}>
              <li style={{ color: "var(--fg)", fontWeight: 600 }}>
                <T>Multan Office</T>
              </li>
              <li className="flex gap-2.5" style={{ color: "var(--fg-dim)" }}>
                <Pin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                <span>
                  <T>{multan.address}</T>
                </span>
              </li>
              <li className="flex gap-2.5" style={{ color: "var(--fg-dim)" }}>
                <Phone className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                <span dir="ltr">{multan.phone}</span>
              </li>
              <li className="flex gap-2.5" style={{ color: "var(--fg-dim)" }}>
                <Mail className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                <a href={`mailto:${multan.email}`}>{multan.email}</a>
              </li>
              <li style={{ color: "var(--fg)", fontWeight: 600, marginTop: 18 }}>
                <T>Lahore Office</T>
              </li>
              <li className="flex gap-2.5" style={{ color: "var(--fg-dim)" }}>
                <Pin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--accent)" }} />
                <span>
                  <T>{lahore.address}</T>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            <T>{site.copyright}</T>
          </span>
          <span>
            <T>Pakistan Crop Protection Association</T> · Multan
          </span>
        </div>
      </div>
    </footer>
  );
}
