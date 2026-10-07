"use client";

import { useCartStore } from "@/store/cart-store";
import { Market } from "@/config/markets";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export function Checkout({ market }: { market: Market }) {
  const [mounted, setMounted] = useState(false);
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return null;

  const marketItems = items.filter(item => item.marketId === market.id);
  const subtotal = marketItems.reduce((acc, item) => acc + item.basePrice * item.quantity, 0);
  const tax = subtotal * market.taxRate;
  const total = subtotal + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we'd submit this to a backend
    clearCart();
    router.push(`/${market.id}/checkout/success`);
  };

  if (marketItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 md:py-40 px-6 border border-sand/50 bg-sand/20 rounded-3xl max-w-3xl mx-auto text-center">
        <div className="w-20 h-20 bg-paper rounded-full flex items-center justify-center shadow-sm mb-8">
          <ShoppingBag className="h-8 w-8 text-stone-muted" strokeWidth={1} />
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-medium text-ink mb-4 tracking-tight">Checkout is empty</h2>
        <p className="text-lg text-stone-muted font-body font-light mb-10 max-w-md">
          Please add items to your cart before proceeding with your order.
        </p>
        <Link
          href={`/${market.id}/services`}
          className="inline-flex items-center justify-center bg-ink px-8 py-4 rounded-full text-sm font-medium text-paper hover:bg-black/80 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Explore Services
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
      {/* Form */}
      <div className="flex-1">
        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-12">
          <div className="bg-sand/30 p-8 lg:p-12 rounded-2xl">
            <h2 className="text-xl font-display font-medium text-ink mb-8 border-b border-sand pb-4 tracking-tight">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-[11px] font-medium text-stone-muted uppercase tracking-widest mb-2">First Name</label>
                <input required type="text" className="w-full px-4 py-3 bg-paper border border-stone-200 focus:border-ink transition-colors outline-none font-body text-ink rounded-lg" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-stone-muted uppercase tracking-widest mb-2">Last Name</label>
                <input required type="text" className="w-full px-4 py-3 bg-paper border border-stone-200 focus:border-ink transition-colors outline-none font-body text-ink rounded-lg" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-medium text-stone-muted uppercase tracking-widest mb-2">Email Address</label>
                <input required type="email" className="w-full px-4 py-3 bg-paper border border-stone-200 focus:border-ink transition-colors outline-none font-body text-ink rounded-lg" />
              </div>
            </div>
          </div>

          <div className="bg-sand/30 p-8 lg:p-12 rounded-2xl">
            <h2 className="text-xl font-display font-medium text-ink mb-8 border-b border-sand pb-4 tracking-tight">Project Details <span className="text-stone-muted font-light text-base">(Optional)</span></h2>
            <textarea
              rows={4}
              placeholder="Briefly describe your project or add any specific notes for our team..."
              className="w-full px-4 py-3 bg-paper border border-stone-200 focus:border-ink transition-colors outline-none font-body text-ink resize-none rounded-lg font-light placeholder:text-stone-muted"
            ></textarea>
          </div>
        </form>
      </div>

      {/* Summary */}
      <div className="w-full lg:w-[400px] flex-shrink-0">
        <div className="bg-paper p-8 border border-stone-200 rounded-2xl sticky top-32 shadow-sm">
          <h2 className="text-xl font-display font-medium text-ink mb-8 tracking-tight">Order Summary</h2>
          
          <div className="space-y-4 mb-8 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {marketItems.map(item => (
              <div key={item.id} className="flex justify-between items-start text-sm pb-4 border-b border-sand/50 last:border-0 last:pb-0">
                <div className="pr-4">
                  <span className="font-display font-medium text-ink block mb-1 tracking-tight">{item.name}</span>
                  <span className="font-body text-stone-muted text-[11px] uppercase tracking-widest font-medium">QTY: {item.quantity}</span>
                </div>
                <span className="font-display font-medium text-ink whitespace-nowrap">
                  {formatCurrency(item.basePrice * item.quantity, market.currency, market.locale)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-sm font-body text-stone-muted mb-8 border-t border-sand pt-8 font-light">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-ink">{formatCurrency(subtotal, market.currency, market.locale)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax/VAT ({(market.taxRate * 100).toFixed(1)}%)</span>
              <span className="font-medium text-ink">{formatCurrency(tax, market.currency, market.locale)}</span>
            </div>
            <div className="border-t border-sand pt-6 mt-6 flex justify-between items-end">
              <span className="text-[11px] font-medium text-stone-muted uppercase tracking-widest">Total</span>
              <span className="text-3xl font-display font-medium text-ink leading-none">{formatCurrency(total, market.currency, market.locale)}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="w-full flex items-center justify-center bg-ink px-8 py-4 rounded-full text-sm font-medium text-paper hover:bg-black/80 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
