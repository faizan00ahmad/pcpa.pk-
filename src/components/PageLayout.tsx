import { sectionFor, trailFor } from "@/data/menu";
import { PageHeader, type Crumb } from "./PageHeader";
import { Sidebar } from "./Sidebar";

/** Inner-page frame: hero banner + breadcrumb, then (when the page belongs to a menu section) a sticky sub-menu card. */
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
    trail ?? (href ? (trailFor(href) ?? []).map((i) => ({ label: i.label, href: i.href })) : []);

  return (
    <>
      <PageHeader title={title} eyebrow={eyebrow} trail={crumbs} />
      <div className="container page-shell">
        {section ? (
          <div className="page-grid">
            <Sidebar section={section} />
            <div className="min-w-0">{children}</div>
          </div>
        ) : (
          <div className="min-w-0">{children}</div>
        )}
      </div>
    </>
  );
}
