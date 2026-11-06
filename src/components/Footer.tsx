import Link from "next/link";
import { contact, site } from "@/data/site";
import { socialIcons } from "./Icons";
import { T } from "./T";

const cols: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "About Us",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Mission", href: "/mission" },
      { label: "Vision", href: "/vision" },
      { label: "The Association", href: "/the-association" },
      { label: "Memorandum and Articles of Association", href: "/memorandum-and-articles-of-association" },
    ],
  },
  {
    title: "Leadership",
    links: [
      { label: "Office Bearers", href: "/office-bearers" },
      { label: "Central Executive Committee", href: "/central-executive-committee" },
      { label: "Committee and working Groups", href: "/committee-and-working-groups" },
      { label: "Minutes of the Meetings", href: "/minutes-of-the-meetings" },
    ],
  },
  {
    title: "Members",
    links: [
      { label: "Members Directory", href: "/members-directory" },
      { label: "Election 2026-2028", href: "/election-2026-2028" },
      { label: "Document Archive", href: "/document-archive" },
      { label: "Visa Recommendation Letter Request Form", href: "/visa-recommendation-letter-request-form" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resource Centre", href: "/resource-centre" },
      { label: "Press Releases", href: "/press-releases" },
      { label: "Notifications", href: "/notifications" },
      { label: "Multimedia", href: "/multimedia" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function Footer() {
  const multan = contact.offices[0].people[0] as { address: string; phone: string; email: string };
  const lahore = contact.offices[1].people[0] as { address: string };
  return (
    <footer className="footer">
      <div className="wrap">
        <p className="footer-note">
          <b style={{ color: "var(--fg)" }}>
            <T>Multan Office</T>:
          </b>{" "}
          <T>{multan.address}</T> · <span dir="ltr">{multan.phone}</span> · <a href={`mailto:${multan.email}`}>{multan.email}</a>
          <br />
          <b style={{ color: "var(--fg)" }}>
            <T>Lahore Office</T>:
          </b>{" "}
          <T>{lahore.address}</T>
        </p>
        <nav className="footer-cols" aria-label="Footer">
          {cols.map((c) => (
            <div key={c.title}>
              <h2>
                <T>{c.title}</T>
              </h2>
              <ul>
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      <T>{l.label}</T>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="footer-legal">
          <span>
            <T>{site.copyright}</T>
          </span>
          <ul className="social" style={{ margin: 0 }}>
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
      </div>
    </footer>
  );
}
