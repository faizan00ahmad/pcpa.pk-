import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, Clock } from "@/components/Icons";
import { PageHeader } from "@/components/PageHeader";
import { news } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => {
    const [, year, month, day] = n.path.split("/");
    return { slug: year, month, day, post: n.slug };
  });
}

type Params = Promise<{ slug: string; month: string; day: string; post: string }>;

const find = (slug: string) => news.find((n) => n.slug === slug);

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = find((await params).post);
  return { title: post ? `${post.title} – PCPA` : "PCPA" };
}

export default async function Post({ params }: { params: Params }) {
  const post = find((await params).post);
  if (!post) notFound();
  const other = news.find((n) => n.slug !== post.slug)!;

  return (
    <>
      <PageHeader title={post.title} eyebrow="News" />
      <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="relative aspect-[16/8] overflow-hidden rounded-3xl ring-1 ring-line">
          <Image src={post.image} alt="" fill priority sizes="(min-width:896px) 896px, 100vw" className="object-cover" />
        </div>
        <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <Clock className="h-4 w-4" />
          <span>{post.author}</span>·
          <span>{post.published}</span>
          {post.updated !== post.published && <span>· Updated {post.updated}</span>}
        </p>
        <div className="mt-8 space-y-6 text-lg leading-8 text-ink/85">
          {post.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <aside className="mt-16 border-t border-line pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-wheat-500">Related posts</p>
          <Link
            href={other.path}
            className="group mt-4 flex items-center justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-line transition hover:bg-forest-50"
          >
            <span>
              <span className="block text-lg font-semibold text-forest-900">{other.title}</span>
              <span className="text-sm text-muted">{other.author} · {other.published}</span>
            </span>
            <Arrow className="h-5 w-5 shrink-0 text-forest-600 transition group-hover:translate-x-1" />
          </Link>
        </aside>
      </article>
    </>
  );
}
