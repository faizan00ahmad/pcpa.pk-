"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";

const FAILSAFE_MS = 9000;
const FADE_MS = 600;

/**
 * Opening logo film. Plays once per browser session on the home page, then fades away.
 * Picks the portrait cut on tall screens and MP4 or WebM depending on browser support.
 * Skipped for reduced-motion visitors; any playback problem simply removes it.
 */
export function IntroSplash() {
  const { t } = useLang();
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const video = useRef<HTMLVideoElement>(null);
  const done = useRef(false);

  function finish(fast = false) {
    if (done.current) return;
    done.current = true;
    setFading(true);
    window.setTimeout(
      () => {
        setVisible(false);
        document.body.style.overflow = "";
      },
      fast ? 250 : FADE_MS,
    );
  }

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

    const probe = document.createElement("video");
    const mp4 = probe.canPlayType('video/mp4; codecs="avc1.640028"') !== "";
    const ext = mp4 ? "mp4" : probe.canPlayType('video/webm; codecs="vp9"') !== "" ? "webm" : "";
    if (!ext) {
      setVisible(false);
      return;
    }
    const portrait = window.innerHeight > window.innerWidth;
    setSrc(`/video/pcpa-intro${portrait ? "-portrait" : ""}.${ext}`);

    document.body.style.overflow = "hidden";
    const failsafe = window.setTimeout(() => finish(), FAILSAFE_MS);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && finish(true);
    window.addEventListener("keydown", esc);
    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`intro-splash fixed inset-0 z-[100] bg-[#010f08] transition-opacity ease-out ${fading ? "opacity-0" : "opacity-100"}`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      role="presentation"
      aria-hidden
    >
      {src && (
        <video
          ref={video}
          src={src}
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          onEnded={() => finish()}
          onError={() => finish(true)}
        />
      )}
      <button
        type="button"
        onClick={() => finish(true)}
        aria-hidden={false}
        className="absolute bottom-6 end-6 z-10 rounded border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 backdrop-blur transition hover:bg-white/10"
      >
        {t("Skip intro")}
      </button>
    </div>
  );
}
