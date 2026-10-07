import { Service } from "../types/service";

export const mockServices: Service[] = [
  {
    id: "s1",
    slug: "social-media-design",
    name: "Social Media Design",
    category: "Digital",
    description: "Premium social media design templates and custom posts tailored to your brand identity. Engage your audience with high-converting visuals.",
    shortDescription: "Custom social media post designs to boost engagement.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80"
    ],
    pricing: {
      ng: { basePrice: 50000, discount: 10 },
      us: { basePrice: 150 },
      uk: { basePrice: 120 },
      ca: { basePrice: 200 }
    },
    popularity: 95,
    rating: 4.8,
    useCases: ["Business", "Corporate"],
    industries: ["Technology", "Retail", "Professional Services"],
    urgency: ["Standard", "Express"],
    turnaround: "3-5 business days",
    includedItems: ["5 Custom Posts", "Source Files", "2 Revisions"],
    options: [
      {
        name: "Package",
        choices: [
          { label: "Basic (5 Posts)" },
          { label: "Standard (10 Posts)", priceMultiplier: 1.8 },
          { label: "Premium (20 Posts)", priceMultiplier: 3.5 }
        ]
      }
    ],
    featured: true,
    complementaryServices: ["brand-strategy", "digital-ads-design"],
    relatedServices: ["website-design"]
  },
  {
    id: "s2",
    slug: "brand-identity",
    name: "Brand Identity",
    category: "Create",
    description: "A complete brand identity system including logo design, color palette, typography, and brand guidelines.",
    shortDescription: "Comprehensive brand identity for modern businesses.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80"
    ],
    pricing: {
      ng: { basePrice: 250000 },
      us: { basePrice: 800 },
      uk: { basePrice: 650 },
      ca: { basePrice: 1000 }
    },
    popularity: 98,
    rating: 5.0,
    useCases: ["Business", "Corporate"],
    industries: ["Technology", "Hospitality", "Retail"],
    urgency: ["Standard"],
    turnaround: "2-3 weeks",
    includedItems: ["Logo Design", "Brand Guidelines", "Color Palette", "Typography", "Stationery Design"],
    options: [],
    featured: true,
    complementaryServices: ["website-design"],
    relatedServices: ["logo-design"]
  },
  {
    id: "s3",
    slug: "corporate-gift-boxes",
    name: "Corporate Gift Boxes",
    category: "Gifts",
    description: "Curated gift boxes for clients, employees, and partners. Includes branded items and premium packaging.",
    shortDescription: "Premium branded gift boxes for corporate gifting.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"
    ],
    pricing: {
      ng: { basePrice: 35000 },
      us: { basePrice: 120 },
      uk: { basePrice: 100 },
      ca: { basePrice: 150 }
    },
    popularity: 85,
    rating: 4.6,
    useCases: ["Corporate", "Events"],
    industries: ["Professional Services", "Technology", "Education"],
    urgency: ["Standard", "Express"],
    turnaround: "7-10 business days",
    includedItems: ["Branded Notebook", "Premium Pen", "Custom Mug", "Gift Box"],
    options: [
      {
        name: "Quantity",
        choices: [
          { label: "10 Boxes" },
          { label: "50 Boxes", priceMultiplier: 4.5 },
          { label: "100 Boxes", priceMultiplier: 8.5 }
        ]
      }
    ],
    featured: false,
    complementaryServices: ["event-coverage"],
    relatedServices: ["branded-mugs", "custom-notebooks"]
  },
  {
    id: "s4",
    slug: "product-photography",
    name: "Product Photography",
    category: "Studio",
    description: "High-quality product photography for e-commerce, social media, and marketing materials. Shot in our premium studio.",
    shortDescription: "Professional studio photography for your products.",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80"
    ],
    pricing: {
      ng: { basePrice: 150000 },
      us: { basePrice: 500 },
      uk: { basePrice: 400 },
      ca: { basePrice: 650 }
    },
    popularity: 90,
    rating: 4.9,
    useCases: ["Business"],
    industries: ["Retail", "Hospitality"],
    urgency: ["Standard"],
    turnaround: "1-2 weeks",
    includedItems: ["Studio Setup", "20 Edited Photos", "High-Resolution Files", "Commercial Rights"],
    options: [],
    featured: true,
    complementaryServices: ["social-media-design", "digital-ads-design"],
    relatedServices: ["corporate-photography", "video-production"]
  },
  {
    id: "s5",
    slug: "business-cards",
    name: "Business Cards",
    category: "Prints",
    description: "Premium quality business cards printed on thick, luxurious cardstock with various finishing options.",
    shortDescription: "High-quality custom business cards.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80"
    ],
    pricing: {
      ng: { basePrice: 15000 },
      us: { basePrice: 50 },
      uk: { basePrice: 40 },
      ca: { basePrice: 65 }
    },
    popularity: 99,
    rating: 4.7,
    useCases: ["Business", "Personal", "Corporate"],
    industries: ["Technology", "Retail", "Hospitality", "Professional Services", "Education"],
    urgency: ["Standard", "Express"],
    turnaround: "3-5 business days",
    includedItems: ["100 Cards", "Double-Sided Printing", "Matte Finish"],
    options: [
      {
        name: "Finish",
        choices: [
          { label: "Matte" },
          { label: "Glossy" },
          { label: "Soft Touch", priceAddition: 10 }
        ]
      },
      {
        name: "Quantity",
        choices: [
          { label: "100" },
          { label: "250", priceMultiplier: 2 },
          { label: "500", priceMultiplier: 3.5 }
        ]
      }
    ],
    featured: false,
    complementaryServices: ["logo-design"],
    relatedServices: ["brochures", "flyer-design"]
  }
];

export async function getServices(): Promise<Service[]> {
  return mockServices;
}

export async function getServiceBySlug(slug: string): Promise<Service | undefined> {
  return mockServices.find(s => s.slug === slug);
}

export async function getFeaturedServices(): Promise<Service[]> {
  return mockServices.filter(s => s.featured);
}

export async function getRelatedServices(slugs: string[]): Promise<Service[]> {
  return mockServices.filter(s => slugs.includes(s.slug));
}
