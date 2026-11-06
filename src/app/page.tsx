import Image from "next/image";
import Link from "next/link";
import { CardCarousel } from "@/components/CardCarousel";
import { CountUp } from "@/components/CountUp";
import { Hero } from "@/components/Hero";
import { IntroSplash } from "@/components/IntroSplash";
import { Reveal } from "@/components/Reveal";
import { ScrollText } from "@/components/ScrollText";
import { T } from "@/components/T";
import { committee } from "@/data/committee";
import { introduction, leaders, news, notices, slides } from "@/data/site";

const numbers = [
  { value: String(leaders.length), label: "Office bearers" },
  { value: String(committee.length), label: "Executive committee seats" },
  { value: "2", label: "Offices: Multan & Lahore" },
  { value: "2026–28", label: "Current election cycle" },
];

type TileLink = { label: string; href: string; file?: boolean };
const tiles: { dark: boolean; eyebrow: string; title: string; text: string; image: string; links: TileLink[] }[] = [
  {
    dark: false,
    eyebrow: "Members Directory",
    title: "Membership",
    text: "Membership forms, member directories and the annual subscription schedule. PCPA members join in two classes: Corporate and Associate.",
    image: "/images/slider/slide-07.jpg",
    links: [
      { label: "Membership Form", href: "/docs/MEMBERSHIP-APPLICATION-2026-2027.docx", file: true },
      { label: "Members Directory", href: "/members-directory" },
    ],
  },
  {
    dark: true,
    eyebrow: "Election 2026-2028",
    title: "Election 2026-2028",
    text: "Announcements and final eligible voter lists for the 2026-2028 Executive Committee election.",
    image: "/images/slider/slide-11.jpg",
    links: [
      { label: "Election Schedule", href: "/docs/ANNOUNCEMENT-OF-ELECTION-SCHEDULE-PCPA-2026-2028.pdf", file: true },
      { label: "Voters Lists", href: "/election-2026-2028" },
    ],
  },
  {
    dark: true,
    eyebrow: "Leadership",
    title: "Governance",
    text: "Led by an elected Executive Committee — Chairman, Sr. Vice Chairman, Vice Chairman and Secretaries — supported by an Executive Director and a Secretary General.",
    image: "/images/slider/slide-14.jpg",
    links: [
      { label: "Office Bearers", href: "/office-bearers" },
      { label: "Central Executive Committee", href: "/central-executive-committee" },
    ],
  },
  {
    dark: false,
    eyebrow: "Resource Centre",
    title: "Document Archive",
    text: "Past lists, forms, schedules and reference laws.",
    image: "/images/slider/slide-16.jpg",
    links: [
      { label: "Document Archive", href: "/document-archive" },
      { label: "Laws, Rules & Guidelines", href: "/document-archive#laws" },
    ],
  },
];

export default function Home() {
  return (
    <>
      <IntroSplash />
      <Hero slides={slides} />

      {/* Statement */}
      <section className="sec">
        <div className="narrow">
          <Reveal>
            <p className="eyebrow center">
              <T>{introduction.title}</T>
            </p>
          </Reveal>
          <ScrollText text={introduction.body} />
        </div>
      </section>

      {/* Numbers */}
      <section className="sec sec-dark">
        <div className="wrap">
          <Reveal>
            <h2 className="h-xl" style={{ maxWidth: 900 }}>
              <T>Pakistan Crop Protection Association</T>
            </h2>
            <p className="sub" style={{ marginTop: 14 }}>
              <T>Multan · Lahore</T>
            </p>
          </Reveal>
          <ul className="numbers-grid">
            {numbers.map((s, i) => (
              <li key={s.label}>
                <Reveal delay={i * 80}>
                  <div className="number">
                    <CountUp value={s.value} className="number-value" />
                    <span className="number-label">
                      <T>{s.label}</T>
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Bento tiles */}
      <section className="sec sec-gray">
        <div className="wrap">
          <Reveal>
            <div className="center" style={{ marginBottom: 56 }}>
              <h2 className="h-xl">
                <T>Quick services</T>
              </h2>
            </div>
          </Reveal>
          <div className="bento">
            {tiles.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 90}>
                <article className={`tile${c.dark ? " tile-dark" : ""}`} style={{ height: "100%" }}>
                  <div className="tile-text">
                    <p className="eyebrow">
                      <T>{c.eyebrow}</T>
                    </p>
                    <h3>
                      <T>{c.title}</T>
                    </h3>
                    <p>
                      <T>{c.text}</T>
                    </p>
                    <div className="actions">
                      {c.links.map((l, k) =>
                        l.file ? (
                          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={k === 0 ? "btn btn-primary btn-sm" : "link-more link-sm"}>
                            <T>{l.label}</T>
                          </a>
                        ) : (
                          <Link key={l.label} href={l.href} className={k === 0 && !c.links.some((x) => x.file) ? "btn btn-primary btn-sm" : "link-more link-sm"}>
                            <T>{l.label}</T>
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                  <div className="tile-media">
                    <Image src={c.image} alt="" fill sizes="(min-width:980px) 630px, 100vw" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* People */}
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <p className="eyebrow">
                <T>Leadership</T>
              </p>
              <h2 className="h-xl">
                <T>Our Office Bearers</T>
              </h2>
            </div>
          </Reveal>
          <CardCarousel label="Office bearers" itemClass="w-[72%] sm:w-[40%] md:w-[30%] lg:w-[23.5%]">
            {leaders.map((l) => (
              <Link href="/office-bearers" key={l.name} className="person">
                <Image src={l.image} alt={`${l.name}, ${l.title}`} fill sizes="(min-width:1024px) 24vw, (min-width:640px) 40vw, 72vw" draggable={false} />
                <div className="person-meta">
                  <h3>{l.name}</h3>
                  <p>
                    <T>{l.title}</T>
                  </p>
                </div>
              </Link>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* Notices */}
      <section className="sec sec-gray">
        <div className="narrow">
          <Reveal>
            <div style={{ marginBottom: 40 }}>
              <p className="eyebrow">
                <T>Latest</T>
              </p>
              <h2 className="h-xl">
                <T>Notices & Announcements</T>
              </h2>
            </div>
          </Reveal>
          <div className="rows">
            {notices.map((n) => (
              <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className="row">
                <span className="row-date">{n.date}</span>
                <span className="row-title">
                  <T>{n.label}</T>
                </span>
                <span className="link-more">
                  <T>Open</T>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <div style={{ marginBottom: 48 }}>
              <p className="eyebrow">
                <T>Latest</T>
              </p>
              <h2 className="h-xl">
                <T>NEWS</T>
              </h2>
            </div>
          </Reveal>
          <ul className="grid gap-5 md:grid-cols-2">
            {news.map((n, idx) => (
              <li key={n.slug}>
                <Reveal delay={idx * 100}>
                  <Link href={n.path} className="news-card">
                    <div className="ph">
                      <Image src={n.image} alt="" fill sizes="(min-width:768px) 630px, 100vw" />
                    </div>
                    <div className="meta">
                      <small>
                        {n.author} · {n.published}
                      </small>
                      <h3>
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
      <section className="sec sec-dark center">
        <div className="narrow">
          <Reveal>
            <h2 className="display" style={{ fontSize: "clamp(40px,6.5vw,80px)", maxWidth: "15ch", margin: "0 auto" }}>
              <T>Join the Pakistan Crop Protection Association</T>
            </h2>
            <p className="sub" style={{ margin: "22px auto 0", maxWidth: 600 }}>
              <T>Download the 2026-2027 membership form or get in touch with the secretariat.</T>
            </p>
            <div className="actions" style={{ marginTop: 32 }}>
              <a href="/docs/MEMBERSHIP-APPLICATION-2026-2027.docx" className="btn btn-primary">
                <T>Membership Form</T>
              </a>
              <Link href="/contact" className="link-more">
                <T>Contact Us</T>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
