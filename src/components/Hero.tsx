"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow, ChevronRight } from "./Icons";
import { useLang } from "./LanguageProvider";
import { T } from "./T";

/** Full-width cinematic slider with a caption bar (headline, actions, slide controls). */
export function Hero({ slides }: { slides: string[] }) {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [paused, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="PCPA events"
      className="relative isolate overflow-hidden bg-forest-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="relative h-[72vh] min-h-[440px] w-full max-h-[760px] sm:h-[74vh]">
        {slides.map((src, idx) => {
          // Mount only the current, next and previous slide so the page doesn't fetch all photos up front.
          const near = idx === i || idx === (i + 1) % n || idx === (i - 1 + n) % n;
          if (!near) return null;
          const active = idx === i;
          return (
            <div
              key={src}
              aria-hidden={!active}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ${active ? "opacity-100" : "opacity-0"}`}
            >
              <Image
                src={src}
                alt={active ? `PCPA event photo ${idx + 1}` : ""}
                fill
                sizes="100vw"
                priority={idx === 0}
                className={`object-cover [object-position:center_30%] transition-transform duration-[7000ms] ease-out ${active ? "scale-[1.06]" : "scale-100"}`}
              />
            </div>
          );
        })}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-forest-950/25" />

        {/* Caption bar */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950 via-forest-950/85 to-transparent pt-24 sm:pt-32">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 pb-14 sm:gap-5 sm:px-6 sm:pb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-14">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-wheat-400 sm:text-xs sm:tracking-[0.25em]">
                <T>Pakistan Crop Protection Association</T>
              </p>
              <h1 className="fade-up mt-2 text-2xl font-extrabold leading-tight text-white drop-shadow sm:mt-3 sm:text-5xl">
                <T>Representing Pakistan's crop protection industry</T>
              </h1>
              <p className="mt-3 hidden max-w-xl text-base leading-relaxed text-white/80 sm:block sm:text-lg">
                <T>A member association supporting the growth of Pakistan's agriculture sector, headquartered in Multan.</T>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/docs/MEMBERSHIP-APPLICATION-2026-2027.docx"
                className="inline-flex items-center gap-2 rounded bg-wheat-500 px-4 py-2.5 text-sm font-bold text-forest-950 transition hover:bg-wheat-400 sm:px-6 sm:py-3 sm:text-base"
              >
                <T>Become a Member</T> <Arrow className="h-4 w-4 rtl:rotate-180" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded border border-white/40 bg-white/5 px-4 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/15 sm:px-6 sm:py-3 sm:text-base"
              >
                <T>Contact Us</T>
              </Link>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          type="button"
          aria-label={t("Previous slide")}
          onClick={() => go(-1)}
          className="absolute start-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-wheat-500 hover:text-forest-950 md:grid lg:start-6"
        >
          <ChevronRight className="rotate-180 rtl:rotate-0" />
        </button>
        <button
          type="button"
          aria-label={t("Next slide")}
          onClick={() => go(1)}
          className="absolute end-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-wheat-500 hover:text-forest-950 md:grid lg:end-6"
        >
          <ChevronRight className="rtl:rotate-180" />
        </button>
        <div className="absolute inset-x-0 bottom-5 flex flex-wrap items-center justify-center gap-1.5 px-6">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === i}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-wheat-400" : "w-2 bg-white/50 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
