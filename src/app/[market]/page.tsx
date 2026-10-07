import Link from "next/link";
import { markets } from "@/config/markets";
import { getFeaturedServices } from "@/data/services";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default async function MarketPage({ params }: { params: Promise<{ market: string }> }) {
  const { market: marketId } = await params;
  const market = markets[marketId];
  const featuredServices = await getFeaturedServices();

  return (
    <div className="flex flex-col bg-paper">
      {/* Refined Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
            <div className="lg:col-span-6 xl:col-span-5 z-10">
              <span className="text-xs font-medium uppercase tracking-widest text-stone-muted mb-8 block">
                Branda Ecosystem
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-semibold text-ink leading-[1.05] tracking-tight mb-8 text-balance">
                Elevate your brand in {market.country}.
              </h1>
              <p className="text-lg md:text-xl font-body text-stone-muted mb-12 max-w-lg leading-relaxed font-light">
                Discover and order premium branding services from top-tier creative professionals globally. From digital experiences to curated studio prints, we materialize your vision with exceptional precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <Link
                  href={`/${market.id}/services`}
                  className="group inline-flex items-center justify-center bg-ink px-8 py-4 rounded-full text-sm font-medium text-paper hover:bg-black/80 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Explore Services
                </Link>
                <Link
                  href={`/${market.id}/services?category=Studio`}
                  className="group inline-flex items-center text-sm font-medium text-ink hover:text-stone-500 transition-colors duration-300"
                >
                  View Studio <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-6 xl:col-span-7 relative h-[500px] lg:h-[700px] w-full mt-12 lg:mt-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-sand/30 mix-blend-multiply z-10 rounded-2xl"></div>
              <Image
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&q=80"
                alt="Editorial creative studio"
                fill
                className="object-cover scale-100 hover:scale-105 transition-transform duration-[2s] ease-out"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="container mx-auto px-6 lg:px-12 py-32 border-t border-sand/50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-ink mb-4 tracking-tight">Curated Selections</h2>
            <p className="text-xl font-body text-stone-muted font-light">Our highest-rated services available in {market.country}, meticulously vetted for quality.</p>
          </div>
          <Link
            href={`/${market.id}/services`}
            className="hidden md:inline-flex items-center text-sm font-medium text-ink hover:text-stone-500 transition-colors duration-300 group mt-8 md:mt-0"
          >
            All Services <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {featuredServices.map(service => {
            const pricing = service.pricing[market.id] || service.pricing.us;
            return (
              <Link
                key={service.id}
                href={`/${market.id}/services/${service.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand/50 mb-6 rounded-xl">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute top-4 left-4 bg-paper/90 backdrop-blur-sm text-xs font-medium px-3 py-1.5 rounded-full text-ink shadow-sm">
                    {service.category}
                  </div>
                </div>
                
                <h3 className="font-display font-medium text-ink text-xl mb-2 group-hover:text-stone-500 transition-colors duration-300 leading-tight">
                  {service.name}
                </h3>
                <p className="font-body text-sm text-stone-muted line-clamp-2 mb-6 flex-grow font-light">
                  {service.shortDescription}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-medium text-ink">
                    {formatCurrency(pricing.basePrice, market.currency, market.locale)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
