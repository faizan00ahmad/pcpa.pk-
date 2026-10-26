"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { news, site } from "@/data/site";
import { socialIcons } from "./Icons";

export function TopBar() {
  const [temp, setTemp] = useState<string | null>(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    );
    // Live temperature for Multan (same widget as the original site)
    fetch("https://api.open-meteo.com/v1/forecast?latitude=30.1575&longitude=71.5249&current=temperature_2m")
      .then((r) => r.json())
      .then((d) => setTemp(Number(d.current.temperature_2m).toFixed(1)))
      .catch(() => setTemp(null));
  }, []);

  const items = [...news, ...news, ...news];

  return (
    <div className="bg-forest-950 text-[13px] text-white/80">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2 sm:px-6">
        <div className="flex shrink-0 items-center gap-3">
          <span className="font-semibold text-white">
            {temp ? `${temp}°C` : "—"}
          </span>
          <span>{site.city}</span>
          <span className="hidden text-white/50 sm:inline">{date || " "}</span>
        </div>

        <div className="ticker relative hidden min-w-0 flex-1 items-center gap-3 overflow-hidden md:flex">
          <span className="shrink-0 rounded bg-wheat-500 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-forest-950">
            PCPA News
          </span>
          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
              {[...items, ...items].map((n, i) => (
                <Link key={i} href={n.path} className="hover:text-wheat-400">
                  {n.shortTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <ul className="ml-auto flex shrink-0 items-center gap-1">
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
  );
}
