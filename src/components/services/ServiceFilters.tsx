"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { useDebounce } from "@/lib/useDebounce"; // need to create this
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const CATEGORIES = ["All", "Digital", "Gifts", "Create", "Studio", "Prints"];
const USE_CASES = ["All", "Business", "Events", "Personal", "Corporate"];
const INDUSTRIES = ["All", "Technology", "Retail", "Hospitality", "Professional Services", "Education"];
const SORT_OPTIONS = [
  { label: "Most Popular", value: "popular" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export function ServiceFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(localSearch, 500);
  const [isOpen, setIsOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "All") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    if (debouncedSearch !== (searchParams.get("search") || "")) {
      router.push(pathname + "?" + createQueryString("search", debouncedSearch));
    }
  }, [debouncedSearch, pathname, router, createQueryString, searchParams]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-6 flex justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm font-medium text-ink bg-sand/30 px-4 py-2 rounded-full hover:bg-sand/50 transition-colors"
        >
          <Filter className="h-4 w-4" />
          {isOpen ? "Close Filters" : "Filters"}
        </button>
      </div>

      <div className={cn("space-y-10 pr-6 md:block", isOpen ? "block" : "hidden")}>
        {/* Search */}
      <div>
        <h3 className="text-[11px] font-medium tracking-widest text-stone-muted uppercase mb-4">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Type to search..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-0 pr-8 py-2 font-body text-sm bg-transparent border-b border-sand/50 focus:border-ink transition-colors outline-none placeholder:text-stone-muted text-ink"
          />
          <Search className="absolute right-0 top-2.5 h-4 w-4 text-stone-muted" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-[11px] font-medium tracking-widest text-stone-muted uppercase mb-4">Category</h3>
        <div className="space-y-3">
          {CATEGORIES.map((category) => {
            const isActive = (searchParams.get("category") || "All") === category;
            return (
              <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isActive ? 'border-ink bg-ink' : 'border-stone-muted/50 group-hover:border-stone-500'} transition-colors`}>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-paper"></div>}
                </div>
                <input
                  type="radio"
                  name="category"
                  checked={isActive}
                  onChange={() => {
                    router.push(pathname + "?" + createQueryString("category", category));
                  }}
                  className="sr-only"
                />
                <span className={`text-sm font-body ${isActive ? 'text-ink font-medium' : 'text-stone-muted group-hover:text-ink'} transition-colors`}>
                  {category}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <h3 className="text-[11px] font-medium tracking-widest text-stone-muted uppercase mb-4">Use Case</h3>
        <select
          value={searchParams.get("useCase") || "All"}
          onChange={(e) => {
            router.push(pathname + "?" + createQueryString("useCase", e.target.value));
          }}
          className="w-full py-2 font-body text-sm bg-transparent border-b border-sand/50 focus:border-ink transition-colors outline-none cursor-pointer text-ink appearance-none rounded-none"
        >
          {USE_CASES.map(uc => (
            <option key={uc} value={uc} className="bg-paper text-ink">{uc}</option>
          ))}
        </select>
      </div>

      {/* Industries */}
      <div>
        <h3 className="text-[11px] font-medium tracking-widest text-stone-muted uppercase mb-4">Industry</h3>
        <select
          value={searchParams.get("industry") || "All"}
          onChange={(e) => {
            router.push(pathname + "?" + createQueryString("industry", e.target.value));
          }}
          className="w-full py-2 font-body text-sm bg-transparent border-b border-sand/50 focus:border-ink transition-colors outline-none cursor-pointer text-ink appearance-none rounded-none"
        >
          {INDUSTRIES.map(ind => (
            <option key={ind} value={ind} className="bg-paper text-ink">{ind}</option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div>
        <h3 className="text-[11px] font-medium tracking-widest text-stone-muted uppercase mb-4">Sort By</h3>
        <select
          value={searchParams.get("sort") || "popular"}
          onChange={(e) => {
            router.push(pathname + "?" + createQueryString("sort", e.target.value));
          }}
          className="w-full py-2 font-body text-sm bg-transparent border-b border-sand/50 focus:border-ink transition-colors outline-none cursor-pointer text-ink appearance-none rounded-none"
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} className="bg-paper text-ink">{opt.label}</option>
          ))}
        </select>
      </div>
      </div>
    </>
  );
}
