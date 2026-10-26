import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const Menu = (p: P) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h10" /></svg>
);
export const Close = (p: P) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>
);
export const Chevron = (p: P) => (
  <svg {...base(p)}><path d="M6 9l6 6 6-6" /></svg>
);
export const ChevronRight = (p: P) => (
  <svg {...base(p)}><path d="M9 6l6 6-6 6" /></svg>
);
export const Arrow = (p: P) => (
  <svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const FileIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);
export const Download = (p: P) => (
  <svg {...base(p)}><path d="M12 4v11M7 11l5 5 5-5M5 20h14" /></svg>
);
export const Search = (p: P) => (
  <svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
);
export const Phone = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
);
export const Pin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const Mail = (p: P) => (
  <svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
export const Sprout = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21v-9M12 12C12 8 9 5 4 5c0 4 3 7 8 7zM12 14c0-3 2.5-6 8-6 0 4-3 6-8 6z" />
  </svg>
);
export const Leaf = (p: P) => (
  <svg {...base(p)}><path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15zM5 19l8-8" /></svg>
);
export const Clock = (p: P) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>
);

/* Social glyphs (filled) */
const fill = (p: P) => ({ width: 16, height: 16, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true, ...p });
export const Facebook = (p: P) => (
  <svg {...fill(p)}><path d="M14 8V6.5c0-.7.3-1 1-1h2V2h-2.8C11.5 2 10 3.6 10 6v2H7.5v3.5H10V22h4v-10.5h2.7L17 8z" /></svg>
);
export const Twitter = (p: P) => (
  <svg {...fill(p)}><path d="M17.5 3h3.2l-7 8 8.2 10.9h-6.4l-5-6.5L4.7 21H1.5l7.5-8.6L1.1 3h6.5l4.5 6zm-1.1 16.9h1.8L7.7 4.9H5.8z" /></svg>
);
export const Instagram = (p: P) => (
  <svg {...fill(p)}>
    <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2z" />
    <path d="M17.2 2H6.8A4.8 4.8 0 0 0 2 6.8v10.4A4.8 4.8 0 0 0 6.8 22h10.4a4.8 4.8 0 0 0 4.8-4.8V6.8A4.8 4.8 0 0 0 17.2 2zm3.1 15.2a3.1 3.1 0 0 1-3.1 3.1H6.8a3.1 3.1 0 0 1-3.1-3.1V6.8a3.1 3.1 0 0 1 3.1-3.1h10.4a3.1 3.1 0 0 1 3.1 3.1z" />
    <circle cx="17.4" cy="6.6" r="1.1" />
  </svg>
);
export const Pinterest = (p: P) => (
  <svg {...fill(p)}><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.6 0-2.4-1.7-4.1-4.2-4.1a4.4 4.4 0 0 0-4.6 4.4c0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.4.1-1.300-.6-2.100-2.500-2.100-4 0-3.300 2.400-6.300 6.900-6.300 3.600 0 6.400 2.600 6.400 6 0 3.600-2.300 6.500-5.400 6.500-1 0-2-.5-2.300-1.100l-.6 2.400c-.2.900-.8 2-1.200 2.700A10 10 0 1 0 12 2z" /></svg>
);
export const Youtube = (p: P) => (
  <svg {...fill(p)}><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.200 5 12 5 12 5s-6.200 0-7.800.4A2.500 2.500 0 0 0 2.400 7.200C2 8.800 2 12 2 12s0 3.200.4 4.800a2.500 2.500 0 0 0 1.800 1.800C5.800 19 12 19 12 19s6.200 0 7.800-.4a2.500 2.500 0 0 0 1.800-1.800C22 15.200 22 12 22 12s0-3.200-.4-4.800zM10 15V9l5.200 3z" /></svg>
);
export const Heart = (p: P) => (
  <svg {...fill(p)}><path d="M12 21s-8-5.200-8-11a4.800 4.800 0 0 1 8-3.500A4.800 4.800 0 0 1 20 10c0 5.800-8 11-8 11z" /></svg>
);

export const socialIcons: Record<string, (p: P) => React.ReactElement> = {
  Facebook,
  Twitter,
  Instagram,
  Pinterest,
  Youtube,
  Email: Mail as (p: P) => React.ReactElement,
  Bloglovin: Heart,
};
