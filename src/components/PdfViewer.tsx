import { Download, FileIcon } from "./Icons";

export function PdfViewer({ src, title }: { src: string; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-line bg-forest-50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5 text-forest-900">
          <FileIcon className="h-5 w-5 shrink-0 text-wheat-500" />
          <span className="truncate text-sm font-semibold">{title}</span>
        </div>
        <a
          href={src}
          download
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-forest-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-forest-700"
        >
          <Download className="h-4 w-4" /> Download
        </a>
      </div>
      <iframe src={`${src}#view=FitH`} title={title} className="h-[78vh] min-h-[480px] w-full bg-neutral-100" />
    </div>
  );
}
