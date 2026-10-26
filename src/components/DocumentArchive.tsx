import fs from "node:fs";
import path from "node:path";
import { archive } from "@/data/archive";
import { Download, FileIcon } from "./Icons";

function size(file: string) {
  try {
    const b = fs.statSync(path.join(process.cwd(), "public", file)).size;
    return b > 1_048_576 ? `${(b / 1_048_576).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`;
  } catch {
    return "";
  }
}

export function DocumentArchive() {
  const total = archive.reduce((n, g) => n + g.docs.length, 0);
  return (
    <div>
      <p className="mb-8 text-muted">
        {total} documents from the PCPA file library, grouped by topic.
      </p>
      <nav aria-label="Archive sections" className="mb-10 flex flex-wrap gap-2">
        {archive.map((g) => (
          <a
            key={g.id}
            href={`#${g.id}`}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-ink/75 ring-1 ring-line transition hover:bg-forest-800 hover:text-white"
          >
            {g.title}
          </a>
        ))}
      </nav>
      <div className="space-y-12">
        {archive.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-28">
            <h2 className="text-2xl font-semibold text-forest-900">{g.title}</h2>
            {g.blurb && <p className="mt-1 text-sm text-muted">{g.blurb}</p>}
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {g.docs.map((doc) => (
                <li key={doc.file}>
                  <a
                    href={doc.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full items-start gap-4 rounded-2xl bg-white p-4 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest-950/10"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest-50 text-wheat-500 transition group-hover:bg-forest-800 group-hover:text-white">
                      <FileIcon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium leading-snug text-forest-900">{doc.title}</span>
                      <span className="mt-1 block text-xs text-muted">
                        PDF{doc.year && ` · ${doc.year}`}
                        {size(doc.file) && ` · ${size(doc.file)}`}
                      </span>
                    </span>
                    <Download className="mt-1 h-4 w-4 shrink-0 text-forest-600" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
