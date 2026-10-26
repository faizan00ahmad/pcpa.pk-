"use client";

import { useState } from "react";
import { contact } from "@/data/site";
import { Mail, Phone, Pin } from "./Icons";

const MAP =
  "https://maps.google.com/maps?q=Industrial%20Estate%20Phase%20I%20Multan&t=&z=14&ie=UTF8&iwloc=&output=embed";

type Person = {
  name: string;
  role: string;
  org?: string;
  address?: string;
  email?: string;
  contact?: string;
  phone?: string;
};

function PersonCard({ p }: { p: Person }) {
  return (
    <div className="rounded-2xl bg-forest-50 p-5">
      <p className="font-display text-xl font-semibold text-forest-900">{p.name}</p>
      <p className="text-sm font-medium text-wheat-500">{p.role}</p>
      {p.org && <p className="text-sm text-muted">{p.org}</p>}
      <ul className="mt-4 space-y-2.5 text-sm">
        {p.address && (
          <li className="flex gap-3"><Pin className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" /><span><b className="font-semibold">Address :</b> {p.address}</span></li>
        )}
        {p.email && (
          <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" /><span><b className="font-semibold">Email :</b> <a className="underline decoration-wheat-400 underline-offset-2 hover:text-forest-600" href={`mailto:${p.email}`}>{p.email}</a></span></li>
        )}
        {p.contact && (
          <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" /><span><b className="font-semibold">Contact :</b> <a className="hover:text-forest-600" href={`tel:${p.contact.replace(/-/g, "")}`}>{p.contact}</a></span></li>
        )}
        {p.phone && (
          <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" /><span><b className="font-semibold">Ph No :</b> <a className="hover:text-forest-600" href={`tel:${p.phone.replace(/-/g, "")}`}>{p.phone}</a></span></li>
        )}
      </ul>
    </div>
  );
}

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition placeholder:text-muted/70 focus:border-forest-600 focus:ring-2 focus:ring-forest-600/20";

export function ContactView() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(String(f.get("subject") || "Message from PCPA website"));
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:multanpcpa@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <div className="space-y-14">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-semibold text-forest-900">{contact.heading}</h2>
        <p className="mt-3 text-lg text-muted">{contact.lead}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {contact.offices.map((o) => (
          <section key={o.city} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line sm:p-8">
            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-forest-700">{o.city}</h3>
            <div className="space-y-4">
              {o.people.map((p) => (
                <PersonCard key={p.name} p={p as Person} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-line">
          <iframe
            title="PCPA Secretariat, Industrial Estate Phase-I, Multan"
            src={MAP}
            loading="lazy"
            className="h-full min-h-[360px] w-full border-0"
          />
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl bg-forest-900 p-6 text-white sm:p-8" aria-label="Contact form">
          <h3 className="font-display text-2xl font-semibold">Send us a message</h3>
          <div className="mt-6 space-y-4">
            <input className={`${field} text-ink`} name="name" required placeholder="Name *" aria-label="Name" />
            <input className={`${field} text-ink`} name="email" type="email" required placeholder="Email *" aria-label="Email" />
            <input className={`${field} text-ink`} name="subject" placeholder="Subject" aria-label="Subject" />
            <textarea className={`${field} min-h-36 text-ink`} name="message" placeholder="Your message" aria-label="Your message" maxLength={2000} />
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-wheat-500 px-6 py-3 font-semibold text-forest-950 transition hover:bg-wheat-400"
          >
            Submit
          </button>
          {sent && <p role="status" className="mt-4 text-sm text-white/80">Opening your email app to send the message…</p>}
        </form>
      </div>
    </div>
  );
}
