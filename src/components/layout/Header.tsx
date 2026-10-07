"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Market } from "@/config/markets";
import { markets } from "@/config/markets";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

export function Header({ currentMarket }: { currentMarket: Market }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleMarketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMarket = e.target.value;
    const currentPathWithoutMarket = pathname.replace(`/${currentMarket.id}`, "");
    router.push(`/${newMarket}${currentPathWithoutMarket}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-paper/80 backdrop-blur-md border-b border-sand/50 transition-all">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href={`/${currentMarket.id}`} className="flex items-center gap-2 group">
              <span className="text-2xl font-display font-semibold tracking-tight text-ink transition-opacity hover:opacity-70">
                Branda.
              </span>
            </Link>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <Link
                    href={`/${currentMarket.id}/services`}
                    className="text-sm font-body text-stone-muted hover:text-ink transition-colors duration-300"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentMarket.id}/services?category=Digital`}
                    className="text-sm font-body text-stone-muted hover:text-ink transition-colors duration-300"
                  >
                    Digital
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${currentMarket.id}/services?category=Gifts`}
                    className="text-sm font-body text-stone-muted hover:text-ink transition-colors duration-300"
                  >
                    Gifts
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="hidden md:flex items-center gap-3">
              <span className="text-[11px] font-medium text-stone-muted uppercase tracking-widest">Market</span>
              <select
                value={currentMarket.id}
                onChange={handleMarketChange}
                className="bg-transparent text-sm font-body text-ink outline-none cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Select Market"
              >
                {Object.values(markets).map((m) => (
                  <option key={m.id} value={m.id} className="bg-paper text-ink">
                    {m.country} ({m.currency})
                  </option>
                ))}
              </select>
            </div>

            <button className="text-ink hover:opacity-70 transition-opacity">
              <Search className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <Link
              href={`/${currentMarket.id}/cart`}
              className="relative text-ink hover:opacity-70 transition-opacity flex items-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-ink text-[10px] font-medium text-paper">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden text-ink hover:opacity-70 transition-opacity"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" strokeWidth={1.5} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-20 z-40 bg-white md:hidden transition-transform duration-500 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-8 space-y-8">
          <Link
            href={`/${currentMarket.id}/services`}
            className="text-3xl font-display font-medium text-ink"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            All Services
          </Link>
          <Link
            href={`/${currentMarket.id}/services?category=Digital`}
            className="text-3xl font-display font-medium text-ink"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Digital
          </Link>
          <Link
            href={`/${currentMarket.id}/services?category=Gifts`}
            className="text-3xl font-display font-medium text-ink"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Gifts
          </Link>
          
          <div className="pt-10 border-t border-sand/50">
            <p className="text-[11px] uppercase tracking-widest text-stone-muted mb-4">Market</p>
            <select
              value={currentMarket.id}
              onChange={(e) => {
                handleMarketChange(e);
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-transparent py-2 text-xl font-display text-ink focus:outline-none rounded-none"
            >
              {Object.values(markets).map((m) => (
                <option key={m.id} value={m.id}>
                  {m.country} ({m.currency})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
