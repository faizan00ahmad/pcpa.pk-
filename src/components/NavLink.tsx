import Link from "next/link";
import type { MenuItem } from "@/data/menu";
import { FileIcon } from "./Icons";

/** Renders a menu entry as a page link, a document link, or an inert label (original `#` items). */
export function NavLink({
  item,
  className = "",
  onNavigate,
  children,
}: {
  item: MenuItem;
  className?: string;
  onNavigate?: () => void;
  children?: React.ReactNode;
}) {
  const content = children ?? item.label;
  if (item.file) {
    return (
      <a
        href={item.file.src}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        <FileIcon className="mt-0.5 h-4 w-4 shrink-0 text-wheat-500" />
        <span className="min-w-0 flex-1">{content}</span>
        <span className="shrink-0 rounded bg-forest-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-forest-700">
          {item.file.kind}
        </span>
      </a>
    );
  }
  if (item.href) {
    return (
      <Link href={item.href} className={className} onClick={onNavigate}>
        <span className="min-w-0 flex-1">{content}</span>
      </Link>
    );
  }
  return (
    <span className={`${className} cursor-default`} title="Not yet available">
      <span className="min-w-0 flex-1">{content}</span>
    </span>
  );
}
