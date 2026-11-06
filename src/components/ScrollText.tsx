"use client";

import { useEffect, useRef } from "react";
import { useLang } from "./LanguageProvider";

/** Large statement whose words light up as the reader scrolls through it (Apple-style). */
export function ScrollText({ text }: { text: string }) {
  const { t } = useLang();
  const ref = useRef<HTMLParagraphElement>(null);
  const words = t(text).split(/\s+/);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>(".w"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      spans.forEach((s) => s.classList.add("on"));
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top enters the lower third, 1 when its bottom reaches the upper third
      const start = vh * 0.85;
      const end = vh * 0.35;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height)));
      const lit = Math.round(p * spans.length * 1.15);
      spans.forEach((s, i) => s.classList.toggle("on", i < lit));
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
  }, [text, words.length]);

  return (
    <p ref={ref} className="statement">
      {words.map((w, i) => (
        <span key={i} className="w">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
