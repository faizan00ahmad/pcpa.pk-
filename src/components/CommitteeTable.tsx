"use client";

import { useMemo, useState } from "react";
import type { Member } from "@/data/committee";
import { Search } from "./Icons";

const cols = [
  ["SR #", "sr"],
  ["AUTHORIZED PERSON", "person"],
  ["COMPANY NAME", "company"],
  ["CLASS", "cls"],
  ["DESIGNATION", "designation"],
  ["CONTACT NO", "contact"],
  ["STATUS", "status"],
  ["AREA", "area"],
] as const;

export function CommitteeTable({ rows }: { rows: Member[] }) {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("All");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (cls === "All" || r.cls === cls) &&
        (!s || Object.values(r).join(" ").toLowerCase().includes(s)),
    );
  }, [rows, q, cls]);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block sm:w-80">
          <span className="sr-only">Search the committee</span>
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, company, area…"
            className="w-full rounded-md border border-line bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-forest-600 focus:ring-2 focus:ring-forest-600/20"
          />
        </label>
        <div className="flex items-center gap-2" role="group" aria-label="Filter by class">
          {["All", "Corporate", "Associate"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCls(c)}
              aria-pressed={cls === c}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                cls === c ? "bg-forest-800 text-white" : "bg-white text-ink/70 ring-1 ring-line hover:bg-forest-50"
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-1 text-xs text-muted">{filtered.length} of {rows.length}</span>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-forest-900 text-[11px] font-semibold uppercase tracking-wider text-white">
              <tr>
                {cols.map(([h]) => (
                  <th key={h} className="whitespace-nowrap px-4 py-3.5">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((r) => (
                <tr key={r.sr} className="transition-colors even:bg-cream/60 hover:bg-forest-50">
                  <td className="px-4 py-3 font-medium text-muted">{r.sr}</td>
                  <td className="px-4 py-3 font-semibold text-forest-900">{r.person}</td>
                  <td className="px-4 py-3">{r.company}</td>
                  <td className="px-4 py-3"><ClassBadge v={r.cls} /></td>
                  <td className="px-4 py-3">{r.designation}</td>
                  <td className="whitespace-nowrap px-4 py-3 tabular-nums">{r.contact}</td>
                  <td className="px-4 py-3"><StatusBadge v={r.status} /></td>
                  <td className="px-4 py-3">{r.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <ul className="space-y-3 md:hidden">
        {filtered.map((r) => (
          <li key={r.sr} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-muted">SR # {r.sr}</p>
                <p className="mt-0.5 font-display text-lg font-semibold text-forest-900">{r.person}</p>
                <p className="text-sm text-ink/80">{r.company}</p>
              </div>
              <ClassBadge v={r.cls} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div><dt className="text-xs text-muted">Designation</dt><dd>{r.designation}</dd></div>
              <div><dt className="text-xs text-muted">Area</dt><dd>{r.area}</dd></div>
              <div><dt className="text-xs text-muted">Contact</dt><dd className="tabular-nums">{r.contact}</dd></div>
              <div><dt className="text-xs text-muted">Status</dt><dd>{r.status ? <StatusBadge v={r.status} /> : "—"}</dd></div>
            </dl>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="rounded-2xl bg-white p-8 text-center text-muted">No members match your search.</p>
      )}
    </div>
  );
}

function ClassBadge({ v }: { v: string }) {
  const corp = v === "Corporate";
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        corp ? "bg-forest-100 text-forest-800" : "bg-wheat-100 text-wheat-500"
      }`}
    >
      {v}
    </span>
  );
}

function StatusBadge({ v }: { v: string }) {
  if (!v) return null;
  return (
    <span className={`text-xs font-bold tracking-wide ${v === "NEW" ? "text-emblem" : "text-muted"}`}>{v}</span>
  );
}
