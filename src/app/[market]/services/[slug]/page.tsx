import { markets } from "@/config/markets";
import { getServiceBySlug, getRelatedServices } from "@/data/services";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/services/AddToCart";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string; slug: string }>;
}): Promise<Metadata> {
  const { market: marketId, slug } = await params;
  const service = await getServiceBySlug(slug);
  const market = markets[marketId];

  if (!service || !market) {
    return { title: "Service Not Found | Branda" };
  }

  return {
    title: `${service.name} | Branda ${market.country}`,
    description: service.shortDescription,
    openGraph: {
      title: `${service.name} | Branda`,
      description: service.shortDescription,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ market: string; slug: string }>;
}) {
  const { market: marketId, slug } = await params;
  const market = markets[marketId];
  if (!market) notFound();

  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const pricing = service.pricing[market.id] || service.pricing.us;
  const relatedServices = await getRelatedServices(service.relatedServices);

  return (
    <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">
      <div className="text-[11px] font-medium uppercase tracking-widest text-stone-muted mb-12 flex items-center gap-3">
        <Link href={`/${market.id}`} className="hover:text-ink transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/${market.id}/services`} className="hover:text-ink transition-colors">Services</Link>
        <span>/</span>
        <span className="text-ink font-semibold">{service.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">
        {/* Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] w-full overflow-hidden bg-sand/50 rounded-2xl">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4 md:gap-6">
            {service.gallery.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden bg-sand/50 cursor-pointer hover:opacity-80 transition-opacity rounded-xl">
                <Image src={img} alt={`Gallery ${i}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-5 flex flex-col pt-4 lg:pt-12">
          <div className="mb-6 flex items-center justify-between">
            <span className="inline-flex items-center justify-center bg-sand/50 text-ink text-[11px] font-medium px-4 py-1.5 rounded-full shadow-sm">
              {service.category}
            </span>
            <span className="text-[11px] font-medium text-stone-muted uppercase tracking-widest flex items-center gap-1.5">
              <span className="text-amber-400">★</span> {service.rating} ({service.popularity} REVIEWS)
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-display font-semibold text-ink mb-6 leading-[1.1] tracking-tight">{service.name}</h1>
          <p className="text-lg font-body text-stone-muted mb-10 leading-relaxed font-light">{service.description}</p>

          <div className="mb-10 pb-10 border-b border-sand/50">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-[11px] text-stone-muted uppercase tracking-widest">Pricing</span>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-display font-medium text-ink leading-none">
                  {formatCurrency(pricing.basePrice, market.currency, market.locale)}
                </span>
                {pricing.discount && (
                  <span className="text-xl font-display text-stone-muted line-through mb-1">
                    {formatCurrency(pricing.basePrice * (1 + pricing.discount / 100), market.currency, market.locale)}
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm font-body text-stone-muted mt-6 font-light">Estimated Turnaround: <span className="text-ink font-medium">{service.turnaround}</span></p>
          </div>

          <AddToCart service={service} market={market} />

          <div className="mt-16 pt-10 border-t border-sand/50">
            <h3 className="text-[11px] font-medium text-stone-muted mb-6 uppercase tracking-widest">What&apos;s Included</h3>
            <ul className="space-y-4">
              {service.includedItems.map((item, i) => (
                <li key={i} className="flex items-start text-ink font-body text-sm leading-relaxed">
                  <span className="mr-4 text-stone-muted font-medium mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related/Complementary Services */}
      {relatedServices.length > 0 && (
        <section className="mt-32 pt-20 border-t border-sand/50">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-semibold text-ink tracking-tight">Complementary Services</h2>
            <Link
              href={`/${market.id}/services`}
              className="hidden md:inline-flex text-[11px] font-medium tracking-widest text-stone-muted hover:text-ink transition-colors uppercase"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedServices.map(rs => {
              const rsPricing = rs.pricing[market.id] || rs.pricing.us;
              return (
                <Link
                  key={rs.id}
                  href={`/${market.id}/services/${rs.slug}`}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand/50 mb-6 rounded-xl">
                    <Image
                      src={rs.image}
                      alt={rs.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-display font-medium text-ink text-lg mb-2 group-hover:text-stone-500 transition-colors">{rs.name}</h3>
                  <span className="font-medium text-ink text-sm">
                    {formatCurrency(rsPricing.basePrice, market.currency, market.locale)}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
