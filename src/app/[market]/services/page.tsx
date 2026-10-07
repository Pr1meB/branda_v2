import { Suspense } from "react";
import { markets } from "@/config/markets";
import { getServices } from "@/data/services";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ServiceFilters } from "@/components/services/ServiceFilters";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Services | Branda",
  description: "Browse our premium branding services.",
};

export default async function ServicesPage({
  params,
  searchParams,
}: {
  params: Promise<{ market: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { market: marketId } = await params;
  const resolvedSearchParams = await searchParams;
  const market = markets[marketId];
  if (!market) notFound();

  let services = await getServices();

  const category = resolvedSearchParams.category as string;
  const useCase = resolvedSearchParams.useCase as string;
  const industry = resolvedSearchParams.industry as string;
  const sort = resolvedSearchParams.sort as string;
  const search = resolvedSearchParams.search as string;

  // Filter
  if (category) {
    services = services.filter(s => s.category === category);
  }
  if (useCase) {
    services = services.filter(s => s.useCases.includes(useCase));
  }
  if (industry) {
    services = services.filter(s => s.industries.includes(industry));
  }
  if (search) {
    const q = search.toLowerCase();
    services = services.filter(s => 
      s.name.toLowerCase().includes(q) || 
      s.description.toLowerCase().includes(q)
    );
  }

  // Sort
  if (sort === "price-asc") {
    services.sort((a, b) => (a.pricing[market.id]?.basePrice || 0) - (b.pricing[market.id]?.basePrice || 0));
  } else if (sort === "price-desc") {
    services.sort((a, b) => (b.pricing[market.id]?.basePrice || 0) - (a.pricing[market.id]?.basePrice || 0));
  } else {
    // Default sort by popularity
    services.sort((a, b) => b.popularity - a.popularity);
  }

  // Pagination
  const itemsPerPage = 6;
  const pageParam = parseInt(resolvedSearchParams.page as string) || 1;
  const totalPages = Math.ceil(services.length / itemsPerPage) || 1;
  const currentPage = Math.max(1, Math.min(pageParam, totalPages));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedServices = services.slice(startIndex, startIndex + itemsPerPage);

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (useCase) params.set("useCase", useCase);
    if (industry) params.set("industry", industry);
    if (sort) params.set("sort", sort);
    if (search) params.set("search", search);
    params.set("page", page.toString());
    return `/${market.id}/services?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-6 lg:px-12 py-12 md:py-20">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
          <div className="sticky top-32">
            <Suspense fallback={<div className="h-96 w-full bg-sand/30 rounded-xl animate-pulse"></div>}>
              <ServiceFilters />
            </Suspense>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-16 border-b border-sand/50 pb-8">
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink mb-4 tracking-tight">Service Index</h1>
            <p className="text-lg font-body text-stone-muted font-light">
              Displaying {services.length} curated result{services.length !== 1 ? 's' : ''} in {market.country}.
            </p>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-32 bg-sand/30 rounded-2xl">
              <h3 className="text-2xl font-display font-medium text-ink mb-4">No services found</h3>
              <p className="text-stone-muted font-body font-light">Refine your filters or search criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16 mb-16">
                {paginatedServices.map(service => {
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
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                        <div className="flex flex-col">
                          <span className="font-medium text-ink">
                            {formatCurrency(pricing.basePrice, market.currency, market.locale)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 pt-8 border-t border-sand/50">
                  {currentPage > 1 ? (
                    <Link
                      href={getPageUrl(currentPage - 1)}
                      className="px-6 py-3 rounded-full text-sm font-medium border border-stone-200 hover:border-ink transition-colors"
                    >
                      Previous
                    </Link>
                  ) : (
                    <span className="px-6 py-3 rounded-full text-sm font-medium border border-stone-100 text-stone-300 cursor-not-allowed">
                      Previous
                    </span>
                  )}
                  
                  <span className="text-sm font-medium text-stone-muted">
                    Page {currentPage} of {totalPages}
                  </span>

                  {currentPage < totalPages ? (
                    <Link
                      href={getPageUrl(currentPage + 1)}
                      className="px-6 py-3 rounded-full text-sm font-medium border border-stone-200 hover:border-ink transition-colors"
                    >
                      Next
                    </Link>
                  ) : (
                    <span className="px-6 py-3 rounded-full text-sm font-medium border border-stone-100 text-stone-300 cursor-not-allowed">
                      Next
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
