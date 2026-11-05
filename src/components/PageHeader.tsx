import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "./Icons";
import { T } from "./T";

export type Crumb = { label: string; href?: string };

const heroes = ["06", "08", "11", "13", "15", "09"].map((n) => `/images/slider/slide-${n}.jpg`);

/** Stable pick so each page keeps the same banner photo. */
function heroFor(title: string) {
  let h = 0;
  for (const ch of title) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return heroes[h % heroes.length];
}

/** Inner-page hero: dimmed event photo, breadcrumb trail and centred title (Commander-style). */
export function PageHeader({ title, eyebrow, trail = [] }: { title: string; eyebrow?: string; trail?: Crumb[] }) {
  return (
    <section className="inner-hero">
      <div className="inner-hero-bg">
        <Image src={heroFor(title)} alt="" fill priority sizes="100vw" />
      </div>
      <div className="inner-hero-overlay" />
      <div className="inner-hero-content">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li>
              <Link href="/">
                <T>Home</T>
              </Link>
            </li>
            {trail.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight aria-hidden />
                {c.href ? (
                  <Link href={c.href}>
                    <T>{c.label}</T>
                  </Link>
                ) : (
                  <span>
                    <T>{c.label}</T>
                  </span>
                )}
              </li>
            ))}
            <li className="flex items-center gap-1.5" aria-current="page" style={{ color: "#fff" }}>
              <ChevronRight aria-hidden />
              <T>{title}</T>
            </li>
          </ol>
        </nav>
        {eyebrow && (
          <p className="inner-eyebrow">
            <T>{eyebrow}</T>
          </p>
        )}
        <h1>
          <T>{title}</T>
        </h1>
      </div>
    </section>
  );
}
