export type FileKind = "pdf" | "docx";

export type MenuItem = {
  label: string;
  /** internal route (page exists on the site) */
  href?: string;
  /** downloadable document in /public/docs */
  file?: { src: string; kind: FileKind };
  children?: MenuItem[];
};

const pdf = (src: string) => ({ src: `/docs/${src}`, kind: "pdf" as const });

/** Exact menu structure of pcpa.pk (same items, same nesting, same order). */
export const menu: MenuItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Mission", href: "/mission" },
      { label: "Vision", href: "/vision" },
      { label: "The Association", href: "/the-association" },
      { label: "Office Bearers", href: "/office-bearers" },
      { label: "Central Executive Committee", href: "/central-executive-committee" },
      { label: "Committee and working Groups", href: "/committee-and-working-groups" },
      {
        label: "Memorandum and Articles of Association",
        href: "/memorandum-and-articles-of-association",
      },
      {
        label: "Minutes of the Meetings",
        href: "/minutes-of-the-meetings",
        children: [
          {
            label: "Minutes of EC Meetings",
            href: "/minutes-of-ec-meetings",
            children: [
              { label: "EC Meeting 01-10", href: "/ec-meeting-01-10" },
              { label: "EC Meeting 11-20", href: "/ec-meeting-11-20" },
              { label: "EC Meeting 21-30", href: "/ec-meeting-21-30" },
              { label: "EC Meeting 31-40", href: "/ec-meeting-31-40" },
              { label: "EC Meeting 41-48", href: "/ec-meeting-41-48" },
            ],
          },
          {
            label: "Minutes of AGMs",
            href: "/minutes-of-agms",
            children: [{ label: "AGM Minutes 2011 to 2017", href: "/agm-minutes-2011-to-2017" }],
          },
          { label: "Minutes of EGMs", href: "/minutes-of-egms" },
        ],
      },
    ],
  },
  {
    label: "Members Directory",
    children: [
      {
        label: "Membership Form 2026-2027",
        file: { src: "/docs/MEMBERSHIP-APPLICATION-2026-2027.docx", kind: "docx" },
      },
      { label: "Corporate Members PCPA", file: pdf("CORPORATE-MEMBERS-PCPA.pdf") },
      { label: "Associate Members PCPA", file: pdf("ASSOCIATE-MEMBERS-PCPA.pdf") },
      {
        label: "ANNUAL SUBSCRIPTION OF PCPA 2026-2027",
        file: pdf("ANNUAL-SUBSCRIPTION-OF-PCPA-2026-27.pdf"),
      },
    ],
  },
  {
    label: "Election 2026-2028",
    children: [
      {
        label: "Announcement Of Election Schedule 2026-2028",
        file: pdf("ANNOUNCEMENT-OF-ELECTION-SCHEDULE-PCPA-2026-2028.pdf"),
      },
      {
        label: "Announcement of Election Commision 2026-2028",
        file: pdf("ANNOUNCEMENT-OF-ELECTION-COMMISSION-2026-2028.pdf"),
      },
      {
        label: "FINAL ELIGIBLE VOTERS LIST OF PCPA CORPORATE CLASS MEMBERS FOR THE YEAR 2026-2028",
        file: pdf("FINAL-ELIGIBLE-VOTERS-LIST-CORPORATE-2026-2028.pdf"),
      },
      {
        label: "FINAL ELIGIBLE VOTERS LIST OF PCPA ASSOCIATE CLASS MEMBERS FOR THE YEAR 2026-28",
        file: pdf("FINAL-ELIGIBLE-VOTERS-LIST-ASSOCIATE-2026-2028.pdf"),
      },
    ],
  },
  {
    label: "Resource Centre",
    children: [
      {
        label: "Press Releases",
        href: "/press-releases",
        children: [{ label: "Notifications", href: "/notifications" }],
      },
      { label: "Visa Recommendation Letter Request Form", href: "/visa-recommendation-letter-request-form" },
      { label: "Document Archive", href: "/document-archive" },
    ],
  },
  {
    label: "Multimedia",
    children: [
      { label: "Photo Gallery", href: "/photo-gallery" },
      { label: "Video Gallery", href: "/video-gallery" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

/** Flatten every item that owns an internal page → used for static routes. */
export function flattenPages(items: MenuItem[] = menu): { label: string; href: string }[] {
  return items.flatMap((i) => [
    ...(i.href && i.href !== "/" ? [{ label: i.label, href: i.href }] : []),
    ...flattenPages(i.children ?? []),
  ]);
}

/** Direct children of the menu entry that owns `href`. */
export function childrenOf(href: string, items: MenuItem[] = menu): MenuItem[] {
  for (const i of items) {
    if (i.href === href) return i.children ?? [];
    const found = childrenOf(href, i.children ?? []);
    if (found.length) return found;
  }
  return [];
}

export const docSections = menu.filter((m) =>
  m.children?.some((c) => c.file),
) as (MenuItem & { children: MenuItem[] })[];
