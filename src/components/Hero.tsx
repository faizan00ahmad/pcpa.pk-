"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./Icons";
import { useLang } from "./LanguageProvider";
import { T } from "./T";

/** Full-screen photo slideshow with a slow zoom, dark overlay and centred headline (Commander-style hero). */
export function Hero({ slides }: { slides: string[] }) {
  const { t, lang } = useLang();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [temp, setTemp] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const touchX = useRef<number | null>(null);
  const n = slides.length;

  const go = useCallback((d: number) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => go(1), 6500);
    return () => clearInterval(timer);
  }, [paused, go]);

  useEffect(() => {
    setDate(new Date().toLocaleDateString(lang === "ur" ? "ur-PK" : "en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }));
  }, [lang]);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=30.1575&longitude=71.5249&current=temperature_2m")
      .then((r) => r.json())
      .then((d) => setTemp(Number(d.current.temperature_2m).toFixed(1)))
      .catch(() => setTemp(null));
  }, []);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="PCPA events"
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
      <div className="hero-media">
        {slides.map((src, idx) => {
          // Mount only the current, next and previous slide so the page doesn't fetch every photo up front.
          const near = idx === i || idx === (i + 1) % n || idx === (i - 1 + n) % n;
          if (!near) return null;
          const active = idx === i;
          return (
            <div key={src} className={`hero-slide${active ? " active" : ""}`} aria-hidden={!active}>
              <div className="hero-zoom">
                <Image src={src} alt={active ? `PCPA event photo ${idx + 1}` : ""} fill sizes="100vw" priority={idx === 0} className="object-cover" />
              </div>
            </div>
          );
        })}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <p className="hero-eyebrow">
          <T>Pakistan Crop Protection Association</T> · <T>Multan</T>
        </p>
        <h1 className="fade-up">
          {lang === "ur" ? (
            t("Representing Pakistan's crop protection industry")
          ) : (
            <>
              Representing Pakistan&apos;s <span>crop protection</span> industry
            </>
          )}
        </h1>
        <p className="hero-desc">
          <T>A member association supporting the growth of Pakistan's agriculture sector, headquartered in Multan.</T>
        </p>
        <div className="hero-btns">
          <a href="/docs/MEMBERSHIP-APPLICATION-2026-2027.docx" className="btn btn-primary">
            <T>Become a Member</T> <Arrow className="h-4 w-4 rtl:rotate-180" />
          </a>
          <Link href="/about" className="btn btn-secondary">
            <T>About Us</T>
          </Link>
        </div>
      </div>

      <div className="hero-meta">
        <span style={{ fontWeight: 600, color: "rgba(255,255,255,.85)" }}>{temp ? `${temp}°C` : "—"}</span>
        <span>
          <T>Multan</T>
        </span>
        <span style={{ opacity: 0.7 }}>{date}</span>
      </div>

      <div className="hero-dots" role="group" aria-label="Slides">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`hero-dot${idx === i ? " active" : ""}`}
            aria-label={`${t("Next slide")} ${idx + 1}`}
            aria-current={idx === i}
            onClick={() => setI(idx)}
          />
        ))}
      </div>

      <a href="#notices" className="hero-scroll" aria-label="Scroll">
        Scroll
        <span className="hero-scroll-line" />
      </a>
    </section>
  );
}
