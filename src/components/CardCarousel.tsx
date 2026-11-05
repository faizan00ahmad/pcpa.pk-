"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";

/**
 * Horizontal card scroller: CSS scroll-snap, touch/trackpad swipe, mouse drag,
 * arrow buttons (only when there is overflow) and keyboard arrows. RTL-aware.
 * Pass `gridFrom` (e.g. "lg") to lay cards out as a normal grid from that breakpoint up.
 */
export function CardCarousel({
  children,
  itemClass = "w-[78%] sm:w-[44%] lg:w-[23%]",
  label,
}: {
  children: React.ReactNode[];
  itemClass?: string;
  label: string;
}) {
  const { lang, t } = useLang();
  const rtl = lang === "ur";
  const track = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const pos = Math.abs(el.scrollLeft);
    setCanPrev(pos > 4);
    setCanNext(pos < max - 4);
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, children]);

  function scrollByCards(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const w = (card?.getBoundingClientRect().width ?? 280) + 20;
    el.scrollBy({ left: dir * w * (rtl ? -1 : 1), behavior: "smooth" });
  }

  const arrow =
    "absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-forest-800 shadow-lg ring-1 ring-line transition hover:bg-forest-800 hover:text-white md:grid";

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <ul
        ref={track}
        tabIndex={0}
        onScroll={measure}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") scrollByCards(rtl ? -1 : 1);
          if (e.key === "ArrowLeft") scrollByCards(rtl ? 1 : -1);
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { x: e.clientX, left: track.current!.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !track.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) d.moved = true;
          track.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => (drag.current = null)}
        onPointerLeave={() => (drag.current = null)}
        onClickCapture={(e) => {
          if (drag.current?.moved) e.preventDefault();
        }}
        className="-mx-4 flex scroll-px-4 cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] active:cursor-grabbing sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {children.map((c, i) => (
          <li key={i} className={`shrink-0 snap-start ${itemClass}`}>
            {c}
          </li>
        ))}
      </ul>
      {canPrev && (
        <button type="button" aria-label={t("Previous slide")} onClick={() => scrollByCards(-1)} className={`${arrow} start-0 -translate-x-1/2 rtl:translate-x-1/2`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rtl:rotate-180" aria-hidden>
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
      )}
      {canNext && (
        <button type="button" aria-label={t("Next slide")} onClick={() => scrollByCards(1)} className={`${arrow} end-0 translate-x-1/2 rtl:-translate-x-1/2`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rtl:rotate-180" aria-hidden>
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
