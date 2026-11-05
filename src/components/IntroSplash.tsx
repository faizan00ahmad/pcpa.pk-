"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "./LanguageProvider";

const DONE_MS = 4400;

/**
 * Opening animation: the PCPA emblem is assembled piece by piece (white base disc, ring draws,
 * ring text arranges, star drops, sprout grows, "PCPA" lettering rises), the real logo resolves in,
 * then the green curtain opens top and bottom to reveal the page edge to edge.
 * Plays once per browser session; skipped for reduced-motion users.
 */
export function IntroSplash() {
  const { t } = useLang();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("pcpa-intro") === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setVisible(false);
      return;
    }
    try {
      sessionStorage.setItem("pcpa-intro", "1");
    } catch {}
    document.body.style.overflow = "hidden";
    const end = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, DONE_MS);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && skip();
    window.addEventListener("keydown", esc);
    return () => {
      clearTimeout(end);
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function skip() {
    setVisible(false);
    document.body.style.overflow = "";
  }

  if (!visible) return null;

  return (
    <div className="intro-splash fixed inset-0 z-[100]" role="presentation" aria-hidden>
      <style>{css}</style>

      {/* curtain halves */}
      <div className="grain sp-top absolute inset-x-0 top-0 h-1/2 bg-forest-950" />
      <div className="grain sp-bottom absolute inset-x-0 bottom-0 h-1/2 bg-forest-950" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(27,122,75,.35),transparent_60%)]" />

      <div className="sp-emblem absolute inset-0 grid place-items-center">
        <div className="relative h-[19rem] w-[16rem] sm:h-[24rem] sm:w-[20rem]">
          {/* assembled emblem */}
          <svg viewBox="0 0 200 240" className="sp-parts absolute inset-0 h-full w-full" fill="none">
            <circle className="sp-disc" cx="100" cy="110" r="92" fill="#fff" />
            <circle className="sp-ring" cx="100" cy="110" r="84" stroke="#1c6fb8" strokeWidth="14" strokeLinecap="round" transform="rotate(-90 100 110)" />
            <path id="sp-arc" d="M 16 110 A 84 84 0 1 1 184 110" />
            <text className="sp-ringtext" fill="#fff" fontSize="8" fontWeight="800" textAnchor="middle">
              <textPath href="#sp-arc" startOffset="50%">
                PAKISTAN CROP PROTECTION ASSOCIATION
              </textPath>
            </text>
            <polygon className="sp-star" points="100.0,0.5 102.6,7.4 110.0,7.8 104.2,12.4 106.2,19.5 100.0,15.4 93.8,19.5 95.8,12.4 90.0,7.8 97.4,7.4" fill="#1b8a3a" />
            <g fill="#1b8a3a">
              <path className="sp-leaf sp-l1" d="M100 120 C86 100 88 76 100 62 C112 76 114 100 100 120Z" />
              <path className="sp-leaf sp-l2" d="M100 132 C78 132 62 120 58 100 C80 100 96 110 100 132Z" />
              <path className="sp-leaf sp-l3" d="M100 132 C122 132 138 120 142 100 C120 100 104 110 100 132Z" />
            </g>
            <g className="sp-letters" fill="#fff" fontSize="34" fontWeight="900" textAnchor="middle">
              <text className="sp-pc" x="58" y="234" style={{ animationDelay: "2.05s" }}>P</text>
              <text className="sp-pc" x="84" y="234" style={{ animationDelay: "2.15s" }}>C</text>
              <text className="sp-pc" x="116" y="234" style={{ animationDelay: "2.25s" }}>P</text>
              <text className="sp-pc" x="142" y="234" style={{ animationDelay: "2.35s" }}>A</text>
            </g>
          </svg>
          {/* real logo resolves in */}
          <div className="sp-real absolute inset-0 grid place-items-center rounded-2xl bg-white p-3 shadow-2xl">
            <Image src="/images/brand/favicon.png" alt="" width={280} height={280} priority className="h-full w-full object-contain" />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={skip}
        aria-hidden={false}
        className="absolute bottom-6 end-6 z-10 rounded border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur transition hover:bg-white/10"
      >
        {t("Skip intro")}
      </button>
    </div>
  );
}

const css = `
.sp-emblem{animation:sp-fade .45s 3.15s ease forwards}
.sp-top{animation:sp-up .95s 3.35s cubic-bezier(.77,0,.18,1) forwards}
.sp-bottom{animation:sp-down .95s 3.35s cubic-bezier(.77,0,.18,1) forwards}
.sp-disc{transform-box:fill-box;transform-origin:center;transform:scale(0);animation:sp-pop .55s .1s cubic-bezier(.2,1.3,.4,1) forwards}
.sp-ring{stroke-dasharray:530;stroke-dashoffset:530;animation:sp-draw 1s .55s ease forwards}
.sp-ringtext{opacity:0;letter-spacing:7px;animation:sp-text 1.1s .95s ease forwards}
.sp-star{opacity:0;transform-box:fill-box;transform-origin:center;transform:translateY(-34px) scale(.3) rotate(-90deg);animation:sp-drop .6s 1.45s cubic-bezier(.2,1.5,.4,1) forwards}
.sp-leaf{transform-box:fill-box;transform-origin:50% 100%;transform:scale(0);animation:sp-grow .6s ease forwards}
.sp-l1{animation-delay:1.7s}.sp-l2{animation-delay:1.9s}.sp-l3{animation-delay:2.05s}
.sp-pc{opacity:0;transform-box:fill-box;transform-origin:center;transform:translateY(26px);animation:sp-rise .5s ease forwards}
.sp-parts{animation:sp-parts-out .5s 2.7s ease forwards}
.sp-real{opacity:0;transform:scale(.96);animation:sp-real-in .7s 2.6s ease forwards}
@keyframes sp-pop{to{transform:scale(1)}}
@keyframes sp-draw{to{stroke-dashoffset:0}}
@keyframes sp-text{to{opacity:1;letter-spacing:1.2px}}
@keyframes sp-drop{to{opacity:1;transform:none}}
@keyframes sp-grow{to{transform:scale(1)}}
@keyframes sp-rise{to{opacity:1;transform:none}}
@keyframes sp-parts-out{to{opacity:0}}
@keyframes sp-real-in{to{opacity:1;transform:none}}
@keyframes sp-fade{to{opacity:0;transform:scale(1.06)}}
@keyframes sp-up{to{transform:translateY(-100%)}}
@keyframes sp-down{to{transform:translateY(100%)}}
`;
