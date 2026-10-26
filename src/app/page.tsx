import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Arrow, Clock } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { committee } from "@/data/committee";
import { introduction, leaders, news, slides } from "@/data/site";

const facts = [
  { value: String(leaders.length), label: "Office bearers" },
  { value: String(committee.length), label: "Executive committee seats" },
  { value: "2", label: "Offices: Multan & Lahore" },
  { value: "2026–28", label: "Current election cycle" },
];

const about = [
  { label: "About Us", href: "/about", n: "01" },
  { label: "Vision", href: "/vision", n: "02" },
  { label: "Mission", href: "/mission", n: "03" },
];

export default function Home() {
  return (
    <>
      {/* Hero: statement + photo slider */}
      <section className="grid bg-forest-900 lg:grid-cols-[5fr_7fr]">
        <div className="grain relative flex flex-col justify-center px-6 py-12 text-white sm:px-10 lg:py-16 lg:pl-[max(2rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wheat-400">Pakistan Crop Protection Association</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] sm:text-5xl">
            Representing Pakistan&apos;s crop protection industry
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/75">
            A member association supporting the growth of Pakistan&apos;s agriculture sector, headquartered in Multan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/docs/MEMBERSHIP-APPLICATION-2026-2027.docx"
              className="inline-flex items-center gap-2 rounded-md bg-wheat-500 px-6 py-3 font-semibold text-forest-950 transition hover:bg-wheat-400"
            >
              Become a Member <Arrow className="h-4 w-4" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <Hero slides={slides} fill />
      </section>

      {/* Facts strip (all figures come from the site's own data) */}
      <section className="border-b border-line bg-white">
        <dl className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-line px-4 sm:px-6 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="px-4 py-7 text-center sm:px-6">
              <dd className="font-display text-3xl font-extrabold text-forest-800 sm:text-4xl">{f.value}</dd>
              <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">{f.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal className="grid items-start gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wheat-500">Pakistan Crop Protection Association</p>
            <h2 className="mt-4 text-4xl text-forest-900 sm:text-5xl">{introduction.title}</h2>
            <div className="mt-6 h-1 w-16 bg-wheat-500" />
          </div>
          <p className="border-l-4 border-wheat-400 pl-6 text-xl leading-relaxed text-ink/80 sm:text-2xl">
            {introduction.body}
          </p>
        </Reveal>
      </section>

      {/* Leadership */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wheat-500">Leadership</p>
            <h2 className="mt-3 text-3xl font-semibold text-forest-900 sm:text-4xl">Our Office Bearers</h2>
          </Reveal>
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((l, idx) => (
              <li key={l.name}>
                <Reveal delay={(idx % 4) * 80}>
                  <article className="group">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-forest-50 ring-1 ring-line">
                      <Image
                        src={l.image}
                        alt={`${l.name}, ${l.title}`}
                        fill
                        sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                        className="object-cover object-top transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-950/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                    </div>
                    <div className="relative mx-3 -mt-8 rounded-2xl bg-white p-4 text-center shadow-lg shadow-forest-950/10 ring-1 ring-line">
                      <h3 className="text-lg font-semibold leading-snug text-forest-900">{l.name}</h3>
                      <p className="mt-1 text-sm font-medium text-wheat-500">{l.title}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About Us / Vision / Mission */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <ul className="grid gap-5 md:grid-cols-3">
          {about.map((a, idx) => (
            <li key={a.label}>
              <Reveal delay={idx * 90}>
                <Link
                  href={a.href}
                  className="group relative flex h-full min-h-48 flex-col justify-between overflow-hidden rounded-3xl bg-forest-800 p-8 text-white transition hover:-translate-y-1 hover:bg-forest-700 hover:shadow-xl hover:shadow-forest-950/20"
                >
                  <span className="font-display text-6xl font-semibold text-white/10 transition group-hover:text-wheat-400/30">
                    {a.n}
                  </span>
                  <span className="mt-10 flex items-end justify-between gap-4">
                    <span className="font-display text-3xl font-semibold">{a.label}</span>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition group-hover:bg-wheat-500 group-hover:text-forest-950">
                      <Arrow />
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
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-wheat-500">Latest</p>
            <h2 className="mt-3 text-3xl font-semibold text-forest-900 sm:text-4xl">NEWS</h2>
          </Reveal>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {news.map((n, idx) => (
              <li key={n.slug}>
                <Reveal delay={idx * 100}>
                  <Link
                    href={n.path}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-line transition hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-950/10 sm:flex-row"
                  >
                    <div className="relative aspect-[16/10] shrink-0 overflow-hidden sm:aspect-auto sm:w-2/5">
                      <Image src={n.image} alt="" fill sizes="(min-width:768px) 20vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-6">
                      <h3 className="text-xl font-semibold leading-snug text-forest-900 group-hover:text-forest-600">{n.title}</h3>
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
