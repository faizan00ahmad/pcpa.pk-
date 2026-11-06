import Link from "next/link";
import { CardCarousel } from "./CardCarousel";
import { Arrow, Leaf, Mail, Phone, Pin, Sprout } from "./Icons";
import { Reveal } from "./Reveal";
import { T } from "./T";

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

function Lead({ children }: { children: string }) {
  return (
    <p className="text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-[32px]">
      <T>{children}</T>
    </p>
  );
}

function Pillars() {
  return (
    <CardCarousel label="What guides us" itemClass="w-[82%] sm:w-[46%] lg:w-[31%] xl:w-[23.5%]">
      {pillars.map((p) => (
        <div key={p.title} className="h-full rounded-[24px] border border-transparent bg-white p-7 transition hover:-translate-y-1 hover:border-t-wheat-500 hover:shadow-lg hover:shadow-forest-950/10">
          <span className="grid h-11 w-11 place-items-center rounded bg-forest-50 text-forest-700">
            <Leaf />
          </span>
          <h3 className="mt-4 text-xl text-forest-900">
            <T>{p.title}</T>
          </h3>
          <p className="mt-2 leading-relaxed text-muted">
            <T>{p.text}</T>
          </p>
        </div>
      ))}
    </CardCarousel>
  );
}

function Statement({ label, children }: { label: string; children: string }) {
  return (
    <div className="grain relative overflow-hidden rounded-[28px] bg-forest-900 p-8 text-white sm:p-12">
      <Sprout className="absolute -top-6 h-40 w-40 text-white/5 ltr:-right-6 rtl:-left-6" />
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-wheat-400">
        <T>{label}</T>
      </p>
      <p className="relative mt-5 text-2xl font-bold leading-snug sm:text-4xl sm:leading-tight">
        <T>{children}</T>
      </p>
      <div className="mt-8 h-1 w-20 bg-wheat-500" aria-hidden />
    </div>
  );
}

function PillarsSection() {
  return (
    <section className="mt-14">
      <h2 className="mb-6 text-2xl text-forest-900 sm:text-3xl">
        <T>What guides us</T>
      </h2>
      <Pillars />
    </section>
  );
}

export function MissionContent() {
  return (
    <div>
      <Reveal>
        <Statement label="Our Mission">
          To represent and support Pakistan's crop protection industry — promoting fair, responsible and professional practice among our members, giving the sector a united voice, and contributing to the growth of Pakistan's agriculture.
        </Statement>
      </Reveal>
      <PillarsSection />
    </div>
  );
}

export function VisionContent() {
  return (
    <div>
      <Reveal>
        <Statement label="Our Vision">
          A strong, well-regulated and technology-driven crop protection sector that helps Pakistan's farmers protect their crops and builds a more productive, sustainable agricultural future.
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

const cards = [
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
];

export function AboutContent() {
  return (
    <div className="space-y-14">
      <Reveal>
        <Lead>
          The Pakistan Crop Protection Association (PCPA) brings together companies engaged in manufacturing, distribution and related services in Pakistan's crop protection sector, and works for the growth of the country's agriculture.
        </Lead>
      </Reveal>

      <section>
        <CardCarousel label="About PCPA" itemClass="w-[84%] sm:w-[48%] lg:w-[32%]">
          {cards.map((c) => (
            <div key={c.t} className="h-full rounded-[24px] border border-transparent bg-white p-7">
              <h2 className="text-xl text-forest-900">
                <T>{c.t}</T>
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                <T>{c.d}</T>
              </p>
            </div>
          ))}
        </CardCarousel>
      </section>

      <section>
        <h2 className="mb-6 text-2xl text-forest-900 sm:text-3xl">
          <T>What the Association does</T>
        </h2>
        <ul className="space-y-3">
          {does.map((t) => (
            <li key={t} className="flex gap-4 rounded-lg border border-line bg-white p-5">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-forest-800 text-white">
                <Sprout className="h-4 w-4" />
              </span>
              <span className="leading-relaxed text-ink/85">
                <T>{t}</T>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-6 text-2xl text-forest-900 sm:text-3xl">
          <T>Learn more</T>
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-5 py-4 transition hover:bg-forest-50"
              >
                <span className="font-semibold text-forest-900">
                  <T>{l.label}</T>
                </span>
                <Arrow className="h-4 w-4 text-forest-600 transition group-hover:translate-x-1 rtl:rotate-180" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[28px] bg-forest-900 p-8 text-white sm:p-10">
        <h2 className="text-2xl">
          <T>Get in touch</T>
        </h2>
        <ul className="mt-5 grid gap-4 text-sm text-white/85 sm:grid-cols-3">
          <li className="flex gap-3">
            <Pin className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />
            <T>PCPA SECTRIATE PLOT 7 & 8 Commercial Area Phase-I Industrial Estate Multan</T>
          </li>
          <li className="flex gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />
            <span dir="ltr">061-6514174</span>
          </li>
          <li className="flex gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-wheat-400" />
            multanpcpa@gmail.com
          </li>
        </ul>
        <Link
          href="/contact"
          className="btn mt-6"
        >
          <T>Contact Us</T> <Arrow className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </section>
    </div>
  );
}
