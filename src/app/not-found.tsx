import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 pb-28 pt-40 text-center">
      <p className="font-display text-7xl font-semibold">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-forest-900">Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="btn btn-primary mt-8">
        Back to Home
      </Link>
    </section>
  );
}
