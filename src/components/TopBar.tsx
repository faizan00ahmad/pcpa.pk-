"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { A11yToolbar } from "./A11yToolbar";
import { socialIcons } from "./Icons";
import { useLang } from "./LanguageProvider";
import { T } from "./T";

/** Utility bar: date and weather, accessibility tools, language switch, social links. */
export function TopBar() {
  const { lang } = useLang();
  const [temp, setTemp] = useState<string | null>(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString(lang === "ur" ? "ur-PK" : "en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
    );
  }, [lang]);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=30.1575&longitude=71.5249&current=temperature_2m")
      .then((r) => r.json())
      .then((d) => setTemp(Number(d.current.temperature_2m).toFixed(1)))
      .catch(() => setTemp(null));
  }, []);

  return (
    <div className="bg-forest-950 text-[13px] text-white/80">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white">{temp ? `${temp}°C` : "—"}</span>
          <span>
            <T>{site.city}</T>
          </span>
          <span className="hidden text-white/50 md:inline">{date || " "}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <A11yToolbar />
          <ul className="hidden items-center gap-1 lg:flex">
            {site.socials.map((s) => {
              const Icon = socialIcons[s];
              return (
                <li key={s}>
                  <a
                    href="#"
                    title={s}
                    aria-label={s}
                    className="grid h-7 w-7 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-wheat-400"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
