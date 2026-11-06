import { sectionFor, trailFor } from "@/data/menu";
import { LocalNav } from "./LocalNav";
import { PageHeader, type Crumb } from "./PageHeader";

/** Inner-page frame: optional sticky local nav, big title block, then the content (narrow or wide). */
export function PageLayout({
  href,
  title,
  eyebrow,
  trail,
  wide = false,
  children,
}: {
  href?: string;
  title: string;
  eyebrow?: string;
  trail?: Crumb[];
  wide?: boolean;
  children: React.ReactNode;
}) {
  const section = href ? sectionFor(href) : null;
  const crumbs: Crumb[] =
    trail ?? (href ? (trailFor(href) ?? []).map((i) => ({ label: i.label, href: i.href })) : []);

  return (
    <>
      {section && <LocalNav section={section} />}
      <PageHeader title={title} eyebrow={eyebrow} trail={crumbs} />
      <div className={`${wide ? "wrap" : "narrow"} page-body`}>{children}</div>
    </>
  );
}
