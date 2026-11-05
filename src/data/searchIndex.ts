import { archive } from "./archive";
import { committee } from "./committee";
import { menu, type MenuItem } from "./menu";
import { news } from "./site";
import { ur } from "@/i18n/ur";

export type SearchEntry = {
  title: string;
  href: string;
  kind: "Page" | "Document" | "Member" | "News";
  hint?: string;
  external?: boolean;
  text: string;
};

const entries: SearchEntry[] = [];
const seen = new Set<string>();
const add = (e: Omit<SearchEntry, "text"> & { extra?: string }) => {
  const key = `${e.kind}|${e.href}|${e.title}`;
  if (seen.has(key)) return;
  seen.add(key);
  const { extra, ...rest } = e;
  entries.push({ ...rest, text: `${e.title} ${ur[e.title] ?? ""} ${e.hint ?? ""} ${extra ?? ""}`.toLowerCase() });
};

function walk(items: MenuItem[], trail: string[] = []) {
  for (const i of items) {
    if (i.href && i.href !== "/") add({ title: i.label, href: i.href, kind: "Page", hint: trail.join(" › ") || undefined });
    if (i.file) {
      add({
        title: i.label,
        href: i.file.src,
        kind: "Document",
        hint: trail.join(" › "),
        external: true,
        extra: i.file.kind,
      });
    }
    if (i.children) walk(i.children, [...trail, i.label]);
  }
}
walk(menu);

for (const g of archive) {
  for (const d of g.docs) {
    add({ title: d.title, href: d.file, kind: "Document", hint: `Document Archive › ${g.title}`, external: true, extra: d.year });
  }
}

for (const m of committee) {
  add({
    title: m.person,
    href: "/central-executive-committee",
    kind: "Member",
    hint: `${m.company} · ${m.designation} · ${m.area}`,
    extra: `${m.cls} ${m.contact}`,
  });
}

for (const n of news) add({ title: n.title, href: n.path, kind: "News", hint: n.published });

export function searchSite(query: string, limit = 12): SearchEntry[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const scored: { e: SearchEntry; s: number }[] = [];
  for (const e of entries) {
    if (!tokens.every((t) => e.text.includes(t))) continue;
    const title = e.title.toLowerCase();
    let s = 1;
    for (const t of tokens) {
      if (title.startsWith(t)) s += 4;
      else if (title.includes(t)) s += 2;
    }
    if (e.kind === "Page") s += 1;
    scored.push({ e, s });
  }
  return scored.sort((a, b) => b.s - a.s).slice(0, limit).map((x) => x.e);
}
