"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./Icons";
import { useLang } from "./LanguageProvider";
import { T } from "./T";

type Leader = { name: string; title: string; image: string };

/** Office-bearer slider (auto-advancing, dots + arrows), styled like Commander's leadership slider. */
export function LeaderSlider({ leaders }: { leaders: Leader[] }) {
  const { t, lang } = useLang();
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = leaders.length;
  const rtl = lang === "ur";

  const next = useCallback(() => setIdx((i) => (i + 1) % len), [len]);
  const prev = () => setIdx((i) => (i - 1 + len) % len);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, paused]);

  return (
    <div className="leader-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="leader-slider-viewport" dir="ltr">
        <div className="leader-slider-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {leaders.map((l, i) => (
            <div className="leader-slide" key={l.name} aria-hidden={i !== idx} dir={rtl ? "rtl" : "ltr"}>
              <div className="leader-slide-img">
                <Image src={l.image} alt={`${l.name}, ${l.title}`} fill sizes="(min-width:980px) 320px, 100vw" draggable={false} />
              </div>
              <div className="leader-slide-text">
                <p className="count">
                  {String(i + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
                </p>
                <h4>{l.name}</h4>
                <p className="role">
                  <T>{l.title}</T>
                </p>
                <Link href="/office-bearers" className="leader-see-more" tabIndex={i === idx ? 0 : -1}>
                  <T>Office Bearers</T>
                  <Arrow className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="leader-controls">
        <button type="button" className="icon-btn" onClick={prev} aria-label={t("Previous slide")}>
          ‹
        </button>
        <div className="leader-dots">
          {leaders.map((l, i) => (
            <button key={l.name} type="button" className={`leader-dot${i === idx ? " active" : ""}`} onClick={() => setIdx(i)} aria-label={l.name} />
          ))}
        </div>
        <button type="button" className="icon-btn" onClick={next} aria-label={t("Next slide")}>
          ›
        </button>
      </div>
    </div>
  );
}
