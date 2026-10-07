export interface Market {
  id: string;
  country: string;
  currency: string;
  symbol: string;
  locale: string;
  taxRate: number;
}

export const markets: Record<string, Market> = {
  ng: {
    id: "ng",
    country: "Nigeria",
    currency: "NGN",
    symbol: "₦",
    locale: "en-NG",
    taxRate: 0.075, // 7.5% VAT
  },
  us: {
    id: "us",
    country: "United States",
    currency: "USD",
    symbol: "$",
    locale: "en-US",
    taxRate: 0.08, // 8% Tax
  },
  uk: {
    id: "uk",
    country: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    locale: "en-GB",
    taxRate: 0.20, // 20% VAT
  },
  ca: {
    id: "ca",
    country: "Canada",
    currency: "CAD",
    symbol: "C$",
    locale: "en-CA",
    taxRate: 0.13, // 13% HST
  },
};

export const defaultMarket = "ng";
