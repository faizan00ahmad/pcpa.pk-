"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up to `value` when scrolled into view. Non-numeric values (e.g. "2026–28") render as-is. */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const target = /^\d+$/.test(value) ? Number(value) : null;
  const [shown, setShown] = useState(target === null ? value : "0");
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (target === null) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(String(target));
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(String(Math.round(eased * target)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
