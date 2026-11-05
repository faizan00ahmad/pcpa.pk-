import { sectionFor, trailFor } from "@/data/menu";
import { PageHeader, type Crumb } from "./PageHeader";
import { Sidebar } from "./Sidebar";

/** Inner-page frame: banner + breadcrumb, then (when the page belongs to a menu section) a left sub-menu. */
export function PageLayout({
  href,
  title,
  eyebrow,
  trail,
  children,
}: {
  href?: string;
  title: string;
  eyebrow?: string;
  trail?: Crumb[];
  children: React.ReactNode;
}) {
  const section = href ? sectionFor(href) : null;
  const crumbs: Crumb[] =
    trail ??
    (href ? (trailFor(href) ?? []).map((i) => ({ label: i.label, href: i.href })) : []);

  return (
    <>
      <PageHeader title={title} eyebrow={eyebrow} trail={crumbs} />
      <div className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 ${section ? "lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-10" : ""}`}>
        {section && <Sidebar section={section} />}
        <div className="min-w-0">{children}</div>
      </div>
    </>
  );
}
