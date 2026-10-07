"use client";

import { useState } from "react";
import { Service } from "@/types/service";
import { Market } from "@/config/markets";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export function AddToCart({ service, market }: { service: Service; market: Market }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    service.options.forEach(opt => {
      if (opt.choices.length > 0) {
        initial[opt.name] = opt.choices[0].label;
      }
    });
    return initial;
  });
  const [added, setAdded] = useState(false);

  const addItem = useCartStore(state => state.addItem);

  const pricing = service.pricing[market.id] || service.pricing.us;
  let currentPrice = pricing.basePrice;

  // Calculate price based on options
  service.options.forEach(opt => {
    const selectedChoice = opt.choices.find(c => c.label === selectedOptions[opt.name]);
    if (selectedChoice) {
      if (selectedChoice.priceMultiplier) {
        currentPrice *= selectedChoice.priceMultiplier;
      }
      if (selectedChoice.priceAddition) {
        currentPrice += selectedChoice.priceAddition;
      }
    }
  });

  const handleAddToCart = () => {
    // Generate a unique ID based on service ID + selected options
    const optionsString = Object.entries(selectedOptions).sort().map(([k,v]) => `${k}:${v}`).join('|');
    const cartItemId = `${service.id}-${optionsString}`;

    addItem({
      id: cartItemId,
      serviceId: service.id,
      slug: service.slug,
      name: service.name,
      image: service.image,
      category: service.category,
      marketId: market.id,
      basePrice: currentPrice,
      quantity,
      options: selectedOptions,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Options */}
      {service.options.length > 0 && (
        <div className="space-y-8">
          {service.options.map(opt => (
            <div key={opt.name}>
              <h4 className="text-[11px] font-medium text-stone-muted uppercase tracking-widest mb-4">{opt.name}</h4>
              <div className="flex flex-wrap gap-3">
                {opt.choices.map(choice => {
                  const isSelected = selectedOptions[opt.name] === choice.label;
                  return (
                    <button
                      key={choice.label}
                      onClick={() => setSelectedOptions(prev => ({ ...prev, [opt.name]: choice.label }))}
                      className={`px-5 py-2.5 text-[13px] font-medium rounded-full transition-all duration-300 ${
                        isSelected
                          ? "bg-ink text-paper shadow-sm"
                          : "bg-paper text-ink border border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      {choice.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Computed Price per unit if options change it */}
      {currentPrice !== pricing.basePrice && (
        <div className="text-sm font-body text-stone-muted border-l-2 border-stone-200 pl-4 py-1 font-light">
          Adjusted Unit Price: <span className="font-display font-medium text-ink ml-2">{formatCurrency(currentPrice, market.currency, market.locale)}</span>
        </div>
      )}

      {/* Quantity & Actions */}
      <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-8 border-t border-sand/50">
        <div className="flex items-center border border-stone-200 rounded-full bg-paper px-2">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="p-3 text-stone-muted hover:text-ink transition-colors focus:outline-none"
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-medium text-ink">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="p-3 text-stone-muted hover:text-ink transition-colors focus:outline-none"
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 gap-4">
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-medium transition-all duration-300 ${
              added
                ? "bg-green-600 text-white shadow-sm"
                : "bg-sand/50 text-ink hover:bg-sand"
            }`}
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            {added ? "Added" : "Add to Cart"}
          </button>

          <button
            onClick={() => {
              handleAddToCart();
              router.push(`/${market.id}/cart`);
            }}
            className="flex-1 flex items-center justify-center py-4 px-6 rounded-full bg-ink text-paper font-medium hover:bg-black/80 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
