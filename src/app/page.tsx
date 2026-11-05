import Image from "next/image";
import Link from "next/link";
import { CardCarousel } from "@/components/CardCarousel";
import { CountUp } from "@/components/CountUp";
import { Hero } from "@/components/Hero";
import { Archive, Arrow, Clock, FileIcon, Phone, Users, Vote } from "@/components/Icons";
import { IntroSplash } from "@/components/IntroSplash";
import { NoticeBar } from "@/components/NoticeBar";
import { Reveal } from "@/components/Reveal";
import { T } from "@/components/T";
import { committee } from "@/data/committee";
import { introduction, leaders, news, notices, slides } from "@/data/site";

const facts = [
  { value: String(leaders.length), label: "Office bearers" },
  { value: String(committee.length), label: "Executive committee seats" },
  { value: "2", label: "Offices: Multan & Lahore" },
  { value: "2026–28", label: "Current election cycle" },
];

const services = [
  { title: "Membership", text: "Forms, member directories and the annual subscription.", href: "/members-directory", icon: Users },
  { title: "Election 2026-2028", text: "Schedule, commission and final voter lists.", href: "/election-2026-2028", icon: Vote },
  { title: "Office Bearers", text: "The current leadership and executive committee.", href: "/office-bearers", icon: FileIcon },
  { title: "Document Archive", text: "Past lists, forms, schedules and reference laws.", href: "/document-archive", icon: Archive },
  {
    title: "Visa Recommendation Letter Request Form",
    text: "Apply for a visa recommendation letter.",
    href: "/visa-recommendation-letter-request-form",
    icon: FileIcon,
  },
  { title: "Contact Us", text: "Secretariat and office details for Multan and Lahore.", href: "/contact", icon: Phone },
];

const about = [
  { label: "About Us", href: "/about", n: "01" },
  { label: "Vision", href: "/vision", n: "02" },
  { label: "Mission", href: "/mission", n: "03" },
];

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-700">
        <T>{eyebrow}</T>
      </p>
      <h2 className="mt-3 text-3xl text-forest-900 sm:text-4xl">
        <T>{title}</T>
      </h2>
      <div className="mt-4 flex items-center gap-1" aria-hidden>
        <span className="h-1 w-14 bg-wheat-500" />
        <span className="h-1 w-3 bg-forest-900/30" />
      </div>
    </Reveal>
  );
}

export default function Home() {
  return (
    <>
      <IntroSplash />
      <Hero slides={slides} />
      <NoticeBar />

      {/* Facts */}
      <section className="border-b border-line bg-white">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line px-4 rtl:divide-x-reverse sm:px-6 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="px-4 py-8 text-center sm:px-6">
              <dd>
                <CountUp value={f.value} className="font-display text-4xl font-extrabold text-forest-800 sm:text-5xl" />
              </dd>
              <dt className="mt-1.5 text-xs font-bold uppercase tracking-wider text-muted">
                <T>{f.label}</T>
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Quick services */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <SectionHead eyebrow="Services" title="Quick services" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((q, i) => (
            <li key={q.href}>
              <Reveal delay={(i % 3) * 70} className="h-full">
                <Link
                  href={q.href}
                  className="group flex h-full items-start gap-4 rounded-lg border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-forest-600 hover:shadow-xl hover:shadow-forest-950/10"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded bg-forest-900 text-white transition group-hover:bg-wheat-500 group-hover:text-forest-950">
                    <q.icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold leading-snug text-forest-900">
                      <T>{q.title}</T>
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">
                      <T>{q.text}</T>
                    </span>
                  </span>
                  <Arrow className="mt-1 h-5 w-5 shrink-0 text-forest-600 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal className="grid items-start gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-700">
              <T>Pakistan Crop Protection Association</T>
            </p>
            <h2 className="mt-4 text-4xl text-forest-900 sm:text-5xl">
              <T>{introduction.title}</T>
            </h2>
            <div className="mt-6 flex items-center gap-1" aria-hidden>
              <span className="h-1 w-14 bg-wheat-500" />
              <span className="h-1 w-3 bg-forest-900/30" />
            </div>
          </div>
          <p className="border-wheat-400 text-xl leading-relaxed text-ink/80 sm:text-2xl ltr:border-l-4 ltr:pl-6 rtl:border-r-4 rtl:pr-6">
            <T>{introduction.body}</T>
          </p>
        </Reveal>
      </section>

      {/* Leadership */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="Leadership" title="Our Office Bearers" />
          <div className="mt-10">
            <CardCarousel label="Office bearers" itemClass="w-[72%] sm:w-[40%] md:w-[30%] lg:w-[23.5%]">
              {leaders.map((l) => (
                <article key={l.name} className="group flex h-full flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-forest-50 ring-1 ring-line">
                    <Image
                      src={l.image}
                      alt={`${l.name}, ${l.title}`}
                      fill
                      sizes="(min-width:1024px) 24vw, (min-width:640px) 40vw, 72vw"
                      draggable={false}
                      className="object-cover object-top transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-wheat-500" />
                  </div>
                  <div className="flex-1 border-x border-b border-line bg-white p-4 text-center">
                    <h3 className="text-lg leading-snug text-forest-900">{l.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-gold-700">
                      <T>{l.title}</T>
                    </p>
                  </div>
                </article>
              ))}
            </CardCarousel>
          </div>
        </div>
      </section>

      {/* Notices */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Latest" title="Notices & Announcements" />
        <div className="mt-10">
          <CardCarousel label="Notices" itemClass="w-[82%] sm:w-[46%] lg:w-[31.5%]">
            {notices.map((n) => (
              <a
                key={n.href}
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full min-h-44 flex-col justify-between rounded-lg border border-line border-t-4 border-t-forest-800 bg-white p-6 transition hover:-translate-y-1 hover:border-t-wheat-500 hover:shadow-xl hover:shadow-forest-950/10"
              >
                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                  <Clock className="h-4 w-4" /> {n.date}
                </span>
                <span className="mt-3 flex-1 font-bold leading-snug text-forest-900">
                  <T>{n.label}</T>
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-700">
                  <T>Open</T> <Arrow className="h-4 w-4 transition group-hover:translate-x-1 rtl:rotate-180" />
                </span>
              </a>
            ))}
          </CardCarousel>
        </div>
      </section>

      {/* About Us / Vision / Mission */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <ul className="grid gap-5 md:grid-cols-3">
          {about.map((a, idx) => (
            <li key={a.label}>
              <Reveal delay={idx * 90} className="h-full">
                <Link
                  href={a.href}
                  className="grain group relative flex h-full min-h-48 flex-col justify-between overflow-hidden rounded-lg bg-forest-900 p-8 text-white transition hover:-translate-y-1 hover:bg-forest-800 hover:shadow-xl hover:shadow-forest-950/20"
                >
                  <span aria-hidden="true" className="font-display text-6xl font-extrabold text-white/10 transition group-hover:text-wheat-400/30">{a.n}</span>
                  <span className="mt-10 flex items-end justify-between gap-4">
                    <span className="font-display text-3xl font-bold">
                      <T>{a.label}</T>
                    </span>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition group-hover:bg-wheat-500 group-hover:text-forest-950">
                      <Arrow className="rtl:rotate-180" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* News */}
      <section className="bg-forest-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="Latest" title="NEWS" />
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {news.map((n, idx) => (
              <li key={n.slug}>
                <Reveal delay={idx * 100} className="h-full">
                  <Link
                    href={n.path}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-950/10 sm:flex-row"
                  >
                    <div className="relative aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-2/5">
                      <Image src={n.image} alt="" fill sizes="(min-width:768px) 20vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-6">
                      <h3 className="text-xl leading-snug text-forest-900 group-hover:text-forest-600">
                        <T>{n.title}</T>
                      </h3>
                      <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                        <Clock className="h-4 w-4" />
                        <span>{n.author}</span>·<time>{n.published}</time>
                      </p>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
