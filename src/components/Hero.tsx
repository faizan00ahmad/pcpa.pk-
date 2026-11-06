"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import { T } from "./T";

/**
 * Apple-style hero: huge headline, subline and links on white, then a large rounded photo tile that
 * scales up as you scroll into it. The tile is a slow-zoom slideshow with a pill control.
 */
export function Hero({ slides }: { slides: string[] }) {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    if (!playing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timer = setInterval(() => go(1), 6000);
    return () => clearInterval(timer);
  }, [playing, go]);

  // Scale the tile up as it scrolls into view
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero">
      <div className="narrow">
        <p className="eyebrow fade-up">
          <T>Pakistan Crop Protection Association</T>
        </p>
        <h1 className="display long fade-up" style={{ animationDelay: ".08s" }}>
          <T>Representing Pakistan's crop protection industry</T>
        </h1>
        <p className="sub fade-up" style={{ animationDelay: ".16s" }}>
          <T>A member association supporting the growth of Pakistan's agriculture sector, headquartered in Multan.</T>
        </p>
        <div className="actions fade-up" style={{ animationDelay: ".24s" }}>
          <a href="/docs/MEMBERSHIP-APPLICATION-2026-2027.docx" className="btn btn-primary">
            <T>Become a Member</T>
          </a>
          <Link href="/about" className="link-more">
            <T>About Us</T>
          </Link>
        </div>
      </div>

      <div className="hero-stage" ref={stage}>
        <div
          className="hero-tile"
          role="group"
          aria-roledescription="carousel"
          aria-label="PCPA events"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current == null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {slides.map((src, idx) => {
            // Mount only the current, next and previous slide so the page doesn't fetch every photo up front.
            const near = idx === i || idx === (i + 1) % n || idx === (i - 1 + n) % n;
            if (!near) return null;
            const active = idx === i;
            return (
              <div key={src} className={`hero-slide${active ? " active" : ""}`} aria-hidden={!active}>
                <div className="hero-zoom">
                  <Image src={src} alt={active ? `PCPA event photo ${idx + 1}` : ""} fill sizes="(min-width:1300px) 1260px, 100vw" priority={idx === 0} className="object-cover" />
                </div>
              </div>
            );
          })}
          <div className="hero-shade" />
          <p className="hero-caption">
            <T>Multan</T> · {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <div className="hero-controls">
            <div className="hero-dots">
              {slides.map((_, idx) => (
                <button key={idx} type="button" className={`hero-dot${idx === i ? " active" : ""}`} aria-label={`${t("Next slide")} ${idx + 1}`} aria-current={idx === i} onClick={() => setI(idx)} />
              ))}
            </div>
            <button type="button" className="hero-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>
              {playing ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <rect x="1.5" y="1" width="3" height="10" rx="1" />
                  <rect x="7.5" y="1" width="3" height="10" rx="1" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                  <path d="M2.5 1.2v9.6L10.5 6z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
