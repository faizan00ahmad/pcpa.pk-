import { notices } from "@/data/site";
import { T } from "./T";

/** Scrolling announcement strip; every item links to a document already on the site. */
export function NoticeBar() {
  const items = [...notices, ...notices];
  return (
    <section aria-label="Notices" className="border-b border-forest-950/10 bg-wheat-100">
      <div className="ticker mx-auto flex max-w-7xl items-stretch overflow-hidden px-4 sm:px-6">
        <span className="z-10 flex shrink-0 items-center gap-2 bg-forest-900 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-wheat-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-wheat-400" />
          </span>
          <T>Notices</T>
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center gap-10 whitespace-nowrap py-3 ps-6 text-sm">
            {items.map((n, i) => (
              <a
                key={i}
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-forest-900 hover:text-forest-600 hover:underline"
              >
                <span className="rounded bg-forest-900 px-1.5 py-0.5 text-[10px] font-bold text-white">{n.date}</span>
                <T>{n.label}</T>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
