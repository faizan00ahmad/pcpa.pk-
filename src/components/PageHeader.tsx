import Link from "next/link";
import { T } from "./T";

export type Crumb = { label: string; href?: string };

/** Apple-style page title block: small breadcrumb trail, then a very large centred headline. */
export function PageHeader({ title, eyebrow, trail = [] }: { title: string; eyebrow?: string; trail?: Crumb[] }) {
  return (
    <header className="page-head wrap">
      <nav aria-label="Breadcrumb">
        <ol className="crumbs">
          <li>
            <Link href="/">
              <T>Home</T>
            </Link>
          </li>
          {trail.map((c) => (
            <li key={c.label}>
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
        </ol>
      </nav>
      {eyebrow && (
        <p className="eyebrow">
          <T>{eyebrow}</T>
        </p>
      )}
      <h1 className="fade-up">
        <T>{title}</T>
      </h1>
    </header>
  );
}
