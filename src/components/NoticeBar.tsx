import { notices } from "@/data/site";
import { T } from "./T";

/** Scrolling announcement strip; every item links to a document already on the site. */
export function NoticeBar() {
  const items = [...notices, ...notices];
  return (
    <section id="notices" aria-label="Notices" className="notice-bar ticker" style={{ scrollMarginTop: 60 }}>
      <div className="notice-bar-inner">
        <span className="notice-label" style={{ margin: "10px 0" }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "#fff" }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#fff" }} />
          </span>
          <T>Notices</T>
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center gap-10 whitespace-nowrap py-3">
            {items.map((n, i) => (
              <a key={i} href={n.href} target="_blank" rel="noopener noreferrer" className="notice-item">
                <span className="notice-date">{n.date}</span>
                <T>{n.label}</T>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
