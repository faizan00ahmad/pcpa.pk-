"use client";

import { useEffect, useRef } from "react";

/** Thin gold bar showing how far down the page the reader is. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      const p = max > 0 ? Math.min(1, d.scrollTop / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
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
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-transparent" aria-hidden>
      <div ref={bar} className="h-full origin-left bg-[var(--accent)] will-change-transform rtl:origin-right" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
