export type Category = "Digital" | "Gifts" | "Create" | "Studio" | "Prints";

export interface ServiceOption {
  name: string;
  choices: { label: string; priceMultiplier?: number; priceAddition?: number }[];
}

export interface MarketPrice {
  basePrice: number;
  discount?: number; // percentage, e.g., 10 for 10% off
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  pricing: Record<string, MarketPrice>; // key is market id
  popularity: number; // 0 to 100
  rating: number; // 0 to 5
  useCases: string[];
  industries: string[];
  urgency: ("Standard" | "Express")[];
  turnaround: string;
  includedItems: string[];
  options: ServiceOption[];
  featured: boolean;
  complementaryServices: string[]; // slugs
  relatedServices: string[]; // slugs
}
