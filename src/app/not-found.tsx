import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-28 text-center">
      <p className="font-display text-7xl font-semibold text-wheat-500">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-forest-900">Page not found</h1>
      <p className="mt-3 text-muted">The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-8 inline-block rounded-md bg-forest-800 px-6 py-3 font-medium text-white hover:bg-forest-700">
        Back to Home
      </Link>
    </section>
  );
}
