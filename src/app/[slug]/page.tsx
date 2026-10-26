import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CommitteeTable } from "@/components/CommitteeTable";
import { ContactView } from "@/components/ContactView";
import { DocumentArchive } from "@/components/DocumentArchive";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { PdfViewer } from "@/components/PdfViewer";
import { committee, committeeSubtitle, committeeTitle } from "@/data/committee";
import { childrenOf, flattenPages } from "@/data/menu";

const pages = flattenPages();
const find = (slug: string) => pages.find((p) => p.href === `/${slug}`);

export const dynamicParams = false;

export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.href.slice(1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = find((await params).slug);
  return { title: page ? `${page.label} – PCPA` : "PCPA" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = find(slug);
  if (!page) notFound();

  let body: React.ReactNode;
  switch (slug) {
    case "office-bearers":
      body = <PdfViewer src="/docs/OFFICE-BEARERS-2020-21.pdf" title="OFFICE BEARERS 2020-21" />;
      break;
    case "central-executive-committee":
      body = (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-forest-900 sm:text-3xl">{committeeTitle}</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-wheat-500">{committeeSubtitle}</p>
          </div>
          <CommitteeTable rows={committee} />
        </>
      );
      break;
    case "contact":
      body = <ContactView />;
      break;
    case "document-archive":
      body = <DocumentArchive />;
      break;
    default:
      body = <EmptyState title={page.label}>{childrenOf(page.href)}</EmptyState>;
  }

  return (
    <>
      <PageHeader title={page.label} />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">{body}</section>
    </>
  );
}
