import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { childrenOf, type MenuItem } from "@/data/menu";
import { Arrow, Download, FileIcon } from "./Icons";
import { Reveal } from "./Reveal";

function fileSize(src: string) {
  try {
    const b = fs.statSync(path.join(process.cwd(), "public", src)).size;
    return b > 1_048_576 ? `${(b / 1_048_576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`;
  } catch {
    return "";
  }
}

function DocCard({ item, index }: { item: MenuItem; index: number }) {
  const f = item.file!;
  return (
    <Reveal delay={(index % 2) * 80}>
      <a
        href={f.src}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest-950/10"
      >
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-forest-50 text-wheat-500 transition group-hover:bg-forest-800 group-hover:text-white">
          <FileIcon />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-semibold leading-snug text-forest-900">{item.label}</span>
          <span className="mt-1.5 block text-xs font-medium uppercase tracking-wide text-muted">
            {f.kind}
            {fileSize(f.src) && ` · ${fileSize(f.src)}`}
          </span>
        </span>
        <Download className="mt-1 h-5 w-5 shrink-0 text-forest-600" />
      </a>
    </Reveal>
  );
}

function LinkCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <Reveal delay={(index % 3) * 80}>
      <Link
        href={item.href!}
        className="group flex h-full items-center justify-between gap-4 rounded-2xl bg-white p-6 ring-1 ring-line transition hover:-translate-y-0.5 hover:bg-forest-50 hover:shadow-lg hover:shadow-forest-950/10"
      >
        <span className="text-lg font-semibold text-forest-900">{item.label}</span>
        <Arrow className="h-5 w-5 shrink-0 text-forest-600 transition group-hover:translate-x-1" />
      </Link>
    </Reveal>
  );
}

function Related({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <aside className="mt-14 rounded-2xl bg-forest-900 p-7 text-white sm:p-9">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="mt-5 flex flex-wrap gap-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="inline-flex items-center gap-2 rounded-md border border-white/25 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
            >
              {l.label} <Arrow className="h-4 w-4" />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Intro({ children }: { children: React.ReactNode }) {
  return <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted">{children}</p>;
}

/** Landing page for a menu heading: its documents or sub-pages, plus related links. */
export function HubPage({ href }: { href: string }) {
  const items = childrenOf(href);
  const docs = items.filter((i) => i.file);
  const pages = items.filter((i) => i.href);

  return (
    <div className="mx-auto max-w-5xl">
      {href === "/members-directory" && (
        <Intro>
          Membership forms, member directories and the annual subscription schedule. PCPA members join in two
          classes: Corporate and Associate.
        </Intro>
      )}
      {href === "/election-2026-2028" && (
        <Intro>Announcements and final eligible voter lists for the 2026-2028 Executive Committee election.</Intro>
      )}
      {href === "/resource-centre" && <Intro>Press releases, notifications, forms and the PCPA document library.</Intro>}
      {href === "/multimedia" && <Intro>Photo and video galleries from PCPA events.</Intro>}

      {docs.length > 0 && (
        <ul className="grid gap-4 md:grid-cols-2">
          {docs.map((d, i) => (
            <li key={d.label}>
              <DocCard item={d} index={i} />
            </li>
          ))}
        </ul>
      )}

      {pages.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {pages.map((p, i) => (
            <li key={p.href}>
              <LinkCard item={p} index={i} />
            </li>
          ))}
        </ul>
      )}

      {href === "/members-directory" && (
        <Related
          title="Looking for older lists and forms?"
          links={[
            { label: "Past member lists", href: "/document-archive#member-lists" },
            { label: "Earlier membership forms", href: "/document-archive#membership" },
            { label: "Office Bearers", href: "/office-bearers" },
          ]}
        />
      )}
      {href === "/election-2026-2028" && (
        <Related
          title="Previous elections"
          links={[
            { label: "Provisional lists 2026-28", href: "/document-archive#election-2026" },
            { label: "Election 2020-21", href: "/document-archive#election-2020-21" },
            { label: "Election 2019", href: "/document-archive#election-2019" },
          ]}
        />
      )}
      {href === "/resource-centre" && (
        <Related
          title="More resources"
          links={[
            { label: "Document Archive", href: "/document-archive" },
            { label: "Contact Us", href: "/contact" },
          ]}
        />
      )}
    </div>
  );
}
