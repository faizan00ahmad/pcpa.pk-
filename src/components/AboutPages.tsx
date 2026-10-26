import Link from "next/link";
import { Arrow, Leaf, Mail, Phone, Pin, Sprout } from "./Icons";
import { Reveal } from "./Reveal";

/*
 * Copy for About Us / Mission / Vision.
 * pcpa.pk publishes no text for these pages, so this is written from public facts only:
 * the site's own data (member classes, elected committee, offices, AGM/elections) and
 * public posts by FPCCI and PCPA members on Facebook. Mission/Vision wording is a draft
 * for PCPA to review and approve.
 */

const pillars = [
  {
    title: "Representation",
    text: "A united voice for crop protection companies before chambers of commerce, government departments and industry bodies.",
  },
  {
    title: "Responsibility",
    text: "Encouraging fair, professional and responsible business practice across manufacturing, distribution and related crop services.",
  },
  {
    title: "Innovation",
    text: "Supporting the adoption of modern technology and innovation to build a more productive, sustainable agriculture sector.",
  },
  {
    title: "Collaboration",
    text: "Working with members, farmers' and industry organisations and the authorities on matters of mutual interest.",
  },
];

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-4 border-wheat-400 pl-6 font-display text-xl leading-relaxed text-ink/85 sm:text-2xl">
      {children}
    </p>
  );
}

function Pillars() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {pillars.map((p, i) => (
        <li key={p.title}>
          <Reveal delay={i * 80}>
            <div className="h-full rounded-3xl bg-white p-7 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-lg hover:shadow-forest-950/10">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-forest-50 text-forest-700">
                <Leaf />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-forest-900">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

function Statement({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grain relative overflow-hidden rounded-3xl bg-forest-800 p-8 text-white sm:p-12">
      <Sprout className="absolute -right-6 -top-6 h-40 w-40 text-white/5" />
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wheat-400">{label}</p>
      <p className="relative mt-5 font-display text-2xl leading-snug sm:text-4xl sm:leading-tight">{children}</p>
    </div>
  );
}

function PillarsSection() {
  return (
    <section className="mt-14">
      <h2 className="mb-6 text-2xl font-semibold text-forest-900 sm:text-3xl">What guides us</h2>
      <Pillars />
    </section>
  );
}

export function MissionContent() {
  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <Statement label="Our Mission">
          To represent and support Pakistan&apos;s crop protection industry — promoting fair, responsible and
          professional practice among our members, giving the sector a united voice, and contributing to the growth
          of Pakistan&apos;s agriculture.
        </Statement>
      </Reveal>
      <PillarsSection />
    </div>
  );
}

export function VisionContent() {
  return (
    <div className="mx-auto max-w-5xl">
      <Reveal>
        <Statement label="Our Vision">
          A strong, well-regulated and technology-driven crop protection sector that helps Pakistan&apos;s farmers
          protect their crops and builds a more productive, sustainable agricultural future.
        </Statement>
      </Reveal>
      <PillarsSection />
    </div>
  );
}

const does = [
  "Represents the interests of its members in the crop protection sector of Pakistan.",
  "Engages with chambers of commerce, government departments and industry bodies on matters of mutual interest, such as the efficiency of regulatory processes and trade policy affecting agricultural products.",
  "Holds regular meetings of the Executive Committee and an Annual General Meeting of members at Multan.",
  "Conducts elections for its Executive Committee under its Memorandum and Articles of Association.",
  "Maintains the directory of Corporate and Associate members and administers membership and annual subscription.",
];

const links = [
  { label: "Office Bearers", href: "/office-bearers" },
  { label: "Central Executive Committee", href: "/central-executive-committee" },
  { label: "Memorandum and Articles of Association", href: "/memorandum-and-articles-of-association" },
  { label: "Mission", href: "/mission" },
  { label: "Vision", href: "/vision" },
];

export function AboutContent() {
  return (
    <div className="mx-auto max-w-5xl space-y-14">
      <Reveal>
        <Lead>
          The Pakistan Crop Protection Association (PCPA) brings together companies engaged in manufacturing,
          distribution and related services in Pakistan&apos;s crop protection sector, and works for the growth of the
          country&apos;s agriculture.
        </Lead>
      </Reveal>

      <section className="grid gap-5 md:grid-cols-3">
        {[
          {
            t: "Who we are",
            d: "A member-based association of crop protection companies, with its secretariat at Industrial Estate Phase-I, Multan, and an office in Lahore.",
          },
          {
            t: "Membership",
            d: "Members join in two classes — Corporate and Associate — and are listed in the PCPA member directories.",
          },
          {
            t: "Governance",
            d: "Led by an elected Executive Committee — Chairman, Sr. Vice Chairman, Vice Chairman and Secretaries — supported by an Executive Director and a Secretary General.",
          },
        ].map((c, i) => (
          <Reveal key={c.t} delay={i * 90}>
            <div className="h-full rounded-3xl bg-white p-7 ring-1 ring-line">
              <h2 className="text-xl font-semibold text-forest-900">{c.t}</h2>
              <p className="mt-3 leading-relaxed text-muted">{c.d}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-forest-900 sm:text-3xl">What the Association does</h2>
        <ul className="space-y-3">
          {does.map((t) => (
            <li key={t} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-line">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-800 text-white">
                <Sprout className="h-4 w-4" />
              </span>
              <span className="leading-relaxed text-ink/85">{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-forest-900 sm:text-3xl">Learn more</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-line transition hover:bg-forest-50"
              >
                <span className="font-medium text-forest-900">{l.label}</span>
                <Arrow className="h-4 w-4 text-forest-600 transition group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-3xl bg-forest-900 p-8 text-white sm:p-10">
        <h2 className="text-2xl font-semibold">Get in touch</h2>
        <ul className="mt-5 grid gap-4 text-sm text-white/85 sm:grid-cols-3">
          <li className="flex gap-3"><Pin className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />PCPA Secretariat, Plot 7 &amp; 8 Commercial Area Phase-I, Industrial Estate Multan</li>
          <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />061-6514174</li>
          <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />multanpcpa@gmail.com</li>
        </ul>
        <Link
          href="/contact"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-wheat-500 px-6 py-3 font-semibold text-forest-950 transition hover:bg-wheat-400"
        >
          Contact us <Arrow className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
