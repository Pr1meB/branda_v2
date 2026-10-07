import Link from "next/link";
import { defaultMarket } from "@/config/markets";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-6xl md:text-8xl font-display font-semibold text-ink mb-6 tracking-tight">404</h1>
      <h2 className="text-2xl font-display font-medium text-ink mb-4">Page Not Found</h2>
      <p className="text-lg font-body text-stone-muted max-w-md mx-auto mb-10 font-light leading-relaxed">
        We couldn&apos;t find what you were looking for. The page may have been moved, deleted, or possibly never existed.
      </p>
      <Link
        href={`/${defaultMarket}`}
        className="inline-flex items-center justify-center bg-ink px-8 py-4 rounded-full text-sm font-medium text-paper hover:bg-black/80 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        Return Home
      </Link>
    </div>
  );
}
