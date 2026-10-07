"use client";

import { useCartStore } from "@/store/cart-store";
import { Market } from "@/config/markets";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export function Cart({ market }: { market: Market }) {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem, updateQuantity } = useCartStore();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) {
    return <div className="h-64 flex items-center justify-center text-slate-500">Loading cart...</div>;
  }

  const marketItems = items.filter(item => item.marketId === market.id);

  if (marketItems.length === 0) {
    return (
      <div className="text-center py-32 brutal-border bg-sand">
        <h2 className="text-3xl font-display font-bold text-ink mb-4">YOUR CART IS EMPTY</h2>
        <p className="text-stone-muted font-body mb-8">Begin your creative journey by exploring our services.</p>
        <Link
          href={`/${market.id}/services`}
          className="inline-flex items-center justify-center bg-ink px-8 py-4 text-sm font-display font-bold tracking-widest text-paper hover:bg-accent transition-colors"
        >
          BROWSE SERVICES
        </Link>
      </div>
    );
  }

  const subtotal = marketItems.reduce((acc, item) => acc + item.basePrice * item.quantity, 0);
  const tax = subtotal * market.taxRate;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
      {/* Items */}
      <div className="flex-1 space-y-8">
        {marketItems.map(item => (
          <div key={item.id} className="flex gap-8 pb-8 border-b border-sand/50 last:border-0">
            <div className="relative h-32 w-24 md:h-40 md:w-32 flex-shrink-0 bg-sand/50 rounded-xl overflow-hidden">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            
            <div className="flex flex-1 flex-col justify-between">
              <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
                <div>
                  <Link href={`/${market.id}/services/${item.slug}`} className="font-display font-medium text-ink hover:text-stone-500 transition-colors duration-300 text-xl md:text-2xl leading-none block mb-2 tracking-tight">
                    {item.name}
                  </Link>
                  <p className="text-[11px] font-medium text-stone-muted uppercase tracking-widest mb-4">{item.category}</p>
                  
                  {Object.entries(item.options).length > 0 && (
                    <div className="text-sm font-body text-stone-muted space-y-1 font-light">
                      {Object.entries(item.options).map(([k, v]) => (
                        <div key={k}><span className="text-ink font-medium">{k}:</span> {v}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="md:text-right mt-2 md:mt-0">
                  <p className="font-display font-medium text-ink text-xl">
                    {formatCurrency(item.basePrice * item.quantity, market.currency, market.locale)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-xs font-body text-stone-muted mt-1 font-light">
                      {formatCurrency(item.basePrice, market.currency, market.locale)} each
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-sand/30">
                <div className="flex items-center border border-stone-200 rounded-full bg-paper px-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-stone-muted hover:text-ink transition-colors"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-ink">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-stone-muted hover:text-ink transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-[11px] font-medium text-stone-muted hover:text-red-500 transition-colors flex items-center gap-1.5 uppercase tracking-widest"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="w-full lg:w-[400px] flex-shrink-0">
        <div className="bg-sand/30 p-8 rounded-2xl sticky top-32">
          <h2 className="text-xl font-display font-medium text-ink mb-8 tracking-tight">Order Summary</h2>
          
          <div className="space-y-4 text-sm font-body text-stone-muted mb-8 font-light">
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

          <Link
            href={`/${market.id}/checkout`}
            className="w-full flex items-center justify-center bg-ink px-8 py-4 rounded-full text-sm font-medium text-paper hover:bg-black/80 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Proceed to Checkout
          </Link>
          
          <div className="mt-6 text-[11px] text-center font-medium text-stone-muted uppercase tracking-widest">
            Secure checkout powered by Branda
          </div>
        </div>
      </div>
    </div>
  );
}
