import Image from "next/image";
import Link from "next/link";
import { CardCarousel } from "@/components/CardCarousel";
import { CountUp } from "@/components/CountUp";
import { Hero } from "@/components/Hero";
import { Archive, Arrow, Clock, FileIcon, Phone, Sprout, Users, Vote } from "@/components/Icons";
import { IntroSplash } from "@/components/IntroSplash";
import { LeaderSlider } from "@/components/LeaderSlider";
import { NoticeBar } from "@/components/NoticeBar";
import { Reveal } from "@/components/Reveal";
import { T } from "@/components/T";
import { committee } from "@/data/committee";
import { introduction, leaders, news, notices, slides } from "@/data/site";

const stats = [
  { value: String(leaders.length), label: "Office bearers" },
  { value: String(committee.length), label: "Executive committee seats" },
  { value: "2", label: "Offices: Multan & Lahore" },
  { value: "2026–28", label: "Current election cycle" },
];

const highlights = [
  { value: "2", label: "Member classes" },
  { value: String(committee.length), label: "Committee seats" },
  { value: "2", label: "Offices" },
];

const tree = [
  { title: "About Us", href: "/about", icon: Sprout },
  { title: "Membership", href: "/members-directory", icon: Users },
  { title: "Election 2026-2028", href: "/election-2026-2028", icon: Vote },
  { title: "Office Bearers", href: "/office-bearers", icon: FileIcon },
  { title: "Document Archive", href: "/document-archive", icon: Archive },
  { title: "Contact Us", href: "/contact", icon: Phone },
];

type Chip = { label: string; href: string; file?: boolean };
const cards: { eyebrow: string; title: string; text: string; href: string; image: string; chips: Chip[] }[] = [
  {
    eyebrow: "Members Directory",
    title: "Membership",
    text: "Membership forms, member directories and the annual subscription schedule. PCPA members join in two classes: Corporate and Associate.",
    href: "/members-directory",
    image: "/images/slider/slide-07.jpg",
    chips: [
      { label: "Membership Form", href: "/docs/MEMBERSHIP-APPLICATION-2026-2027.docx", file: true },
      { label: "Corporate Members", href: "/docs/CORPORATE-MEMBERS-PCPA.pdf", file: true },
      { label: "Associate Members", href: "/docs/ASSOCIATE-MEMBERS-PCPA.pdf", file: true },
    ],
  },
  {
    eyebrow: "Election 2026-2028",
    title: "Election 2026-2028",
    text: "Announcements and final eligible voter lists for the 2026-2028 Executive Committee election.",
    href: "/election-2026-2028",
    image: "/images/slider/slide-10.jpg",
    chips: [
      { label: "Election Schedule", href: "/docs/ANNOUNCEMENT-OF-ELECTION-SCHEDULE-PCPA-2026-2028.pdf", file: true },
      { label: "Election Commission", href: "/docs/ANNOUNCEMENT-OF-ELECTION-COMMISSION-2026-2028.pdf", file: true },
      { label: "Voters Lists", href: "/election-2026-2028" },
    ],
  },
  {
    eyebrow: "Leadership",
    title: "Governance",
    text: "Led by an elected Executive Committee — Chairman, Sr. Vice Chairman, Vice Chairman and Secretaries — supported by an Executive Director and a Secretary General.",
    href: "/office-bearers",
    image: "/images/slider/slide-14.jpg",
    chips: [
      { label: "Office Bearers", href: "/office-bearers" },
      { label: "Central Executive Committee", href: "/central-executive-committee" },
      { label: "Memorandum", href: "/memorandum-and-articles-of-association" },
    ],
  },
  {
    eyebrow: "Resource Centre",
    title: "Document Archive",
    text: "Past lists, forms, schedules and reference laws.",
    href: "/document-archive",
    image: "/images/slider/slide-16.jpg",
    chips: [
      { label: "Election 2019", href: "/document-archive#election-2019" },
      { label: "Member Lists", href: "/document-archive#member-lists" },
      { label: "Laws, Rules & Guidelines", href: "/document-archive#laws" },
    ],
  },
];

function Head({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <Reveal>
      <div className="section-head">
        <p className="eyebrow">
          <T>{eyebrow}</T>
        </p>
        <h2>
          <T>{title}</T>
        </h2>
        {text && (
          <p>
            <T>{text}</T>
          </p>
        )}
      </div>
    </Reveal>
  );
}

const arrow = (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export default function Home() {
  return (
    <>
      <IntroSplash />
      <Hero slides={slides} />
      <NoticeBar />

      {/* Stats bar */}
      <div className="stats-bar">
        <dl className="stats-grid-home">
          {stats.map((s) => (
            <Reveal key={s.label}>
              <div className="stat-block-home">
                <dd>
                  <CountUp value={s.value} className="stat-value-home" />
                </dd>
                <dt className="stat-label-home">
                  <T>{s.label}</T>
                </dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div className="intro-grid">
            <Reveal>
              <div>
                <p className="eyebrow">
                  <T>Who we are</T>
                </p>
                <h2 className="section-title">
                  <T>{introduction.title}</T>
                </h2>
                <p className="intro-lead">
                  <T>{introduction.body}</T>
                </p>
                <div className="intro-highlights">
                  {highlights.map((h) => (
                    <div className="intro-highlight" key={h.label}>
                      <span className="intro-highlight-num">{h.value}</span>
                      <span className="intro-highlight-label">
                        <T>{h.label}</T>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="group-tree">
                <div className="tree-root">
                  <Image src="/images/brand/favicon.png" alt="PCPA" width={84} height={84} />
                  <span className="tree-root-label">
                    <T>Pakistan Crop Protection Association</T>
                  </span>
                  <span className="tree-root-since">
                    <T>Multan · Lahore</T>
                  </span>
                </div>
                <div className="tree-line" />
                <div className="tree-branches">
                  {tree.map((n) => (
                    <Link href={n.href} className="tree-node" key={n.href}>
                      <span className="tree-node-icon">
                        <n.icon />
                      </span>
                      <span className="tree-node-name">
                        <T>{n.title}</T>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sticky stacking cards */}
      <section className="cc-stack" aria-label="Explore PCPA">
        {cards.map((c, i) => (
          <div key={c.title} className="company-card" style={{ zIndex: i + 1 }}>
            <div className={`cc-inner${i % 2 === 1 ? " reverse" : ""}`}>
              <div className="cc-text">
                <Reveal>
                  <p className="cc-eyebrow">
                    <T>{c.eyebrow}</T>
                  </p>
                  <h3>
                    <T>{c.title}</T>
                  </h3>
                  <p className="cc-body">
                    <T>{c.text}</T>
                  </p>
                  <Link href={c.href} className="cc-cta">
                    <T>Explore</T> <T>{c.title}</T>
                    {arrow}
                  </Link>
                  <div className="cc-chips">
                    {c.chips.map((ch) =>
                      ch.file ? (
                        <a key={ch.label} className="cc-chip" href={ch.href} target="_blank" rel="noopener noreferrer">
                          <FileIcon className="h-4 w-4" style={{ color: "var(--accent)" }} />
                          <T>{ch.label}</T>
                        </a>
                      ) : (
                        <Link key={ch.label} className="cc-chip" href={ch.href}>
                          <T>{ch.label}</T>
                        </Link>
                      ),
                    )}
                  </div>
                </Reveal>
              </div>
              <div className="cc-img-side">
                <Image src={c.image} alt="" fill sizes="(min-width:980px) 600px, 100vw" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <Head eyebrow="Leadership" title="Our Office Bearers" />
          <LeaderSlider leaders={leaders} />
        </div>
      </section>

      {/* Notices */}
      <section className="section section-alt">
        <div className="container">
          <Head eyebrow="Latest" title="Notices & Announcements" />
          <CardCarousel label="Notices" itemClass="w-[82%] sm:w-[46%] lg:w-[31.5%]">
            {notices.map((n) => (
              <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className="tile" style={{ flexDirection: "column", justifyContent: "space-between", minHeight: 190 }}>
                <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--fg-dim)" }}>
                  <Clock className="h-4 w-4" /> {n.date}
                </span>
                <span style={{ fontWeight: 600, lineHeight: 1.4, flex: 1, marginTop: 12 }}>
                  <T>{n.label}</T>
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--accent)" }}>
                  <T>Open</T> <Arrow className="h-4 w-4 rtl:rotate-180" />
                </span>
              </a>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* News */}
      <section className="section">
        <div className="container">
          <Head eyebrow="Latest" title="NEWS" />
          <ul className="grid gap-6 md:grid-cols-2">
            {news.map((n, idx) => (
              <li key={n.slug}>
                <Reveal delay={idx * 100}>
                  <Link
                    href={n.path}
                    className="group block overflow-hidden transition hover:-translate-y-1"
                    style={{ borderRadius: "var(--radius)", border: "1px solid var(--line)", background: "var(--bg-card)" }}
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image src={n.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div style={{ padding: 28 }}>
                      <p className="flex items-center gap-2 text-sm" style={{ color: "var(--fg-dim)" }}>
                        <Clock className="h-4 w-4" />
                        <span>{n.author}</span>·<time>{n.published}</time>
                      </p>
                      <h3 className="mt-3 text-xl leading-snug">
                        <T>{n.title}</T>
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section section-alt" style={{ textAlign: "center" }}>
        <div className="container">
          <Reveal>
            <p className="eyebrow">
              <T>Membership</T>
            </p>
            <h2 className="section-title" style={{ maxWidth: 760, margin: "0 auto 14px" }}>
              <T>Join the Pakistan Crop Protection Association</T>
            </h2>
            <p style={{ fontSize: 16, color: "var(--fg-dim)", maxWidth: 520, margin: "0 auto 26px", lineHeight: 1.6 }}>
              <T>Download the 2026-2027 membership form or get in touch with the secretariat.</T>
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/docs/MEMBERSHIP-APPLICATION-2026-2027.docx" className="btn btn-primary">
                <T>Membership Form</T>
              </a>
              <Link href="/contact" className="btn btn-secondary">
                <T>Contact Us</T>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
