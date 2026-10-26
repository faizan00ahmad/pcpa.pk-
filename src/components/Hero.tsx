"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronRight } from "./Icons";

export function Hero({ slides, fill = false }: { slides: string[]; fill?: boolean }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 4500);
    return () => clearInterval(t);
  }, [paused, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="PCPA events"
      className={`relative isolate overflow-hidden bg-forest-950 ${fill ? "h-full" : ""}`}
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
      <div
        className={
          fill
            ? "relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[520px]"
            : "relative aspect-[4/3] w-full sm:aspect-[16/9] md:aspect-auto md:h-[68vh] md:max-h-[720px]"
        }
      >
        {slides.map((src, idx) => {
          // Mount only the current, next and previous slide so the page doesn't fetch all 17 photos up front.
          const near = idx === i || idx === (i + 1) % n || idx === (i - 1 + n) % n;
          if (!near) return null;
          return (
            <div
              key={src}
              aria-hidden={idx !== i}
              className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
            >
              {/* blurred backdrop (same URL as the main photo, so one request) fills the frame for odd ratios */}
              <Image src={src} alt="" fill sizes="100vw" className="scale-110 object-cover opacity-60 blur-2xl" priority={idx === 0} />
              <Image
                src={src}
                alt={`PCPA event photo ${idx + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority={idx === 0}
              />
            </div>
          );
        })}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-950/70 to-transparent" />
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 rotate-180 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-wheat-500 hover:text-forest-950 md:left-6"
      >
        <ChevronRight />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-wheat-500 hover:text-forest-950 md:right-6"
      >
        <ChevronRight />
      </button>

      <div className="absolute inset-x-0 bottom-4 flex flex-wrap items-center justify-center gap-1.5 px-6">
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
    </section>
  );
}
