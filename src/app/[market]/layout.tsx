import { ReactNode, Suspense } from "react";
import { notFound } from "next/navigation";
import { markets } from "@/config/markets";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export async function generateStaticParams() {
  return Object.keys(markets).map((market) => ({
    market,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  return {
    alternates: {
      languages: {
        'en-US': '/us',
        'en-GB': '/uk',
        'en-CA': '/ca',
        'en-NG': '/ng',
      },
    },
  };
}

export const instant = false;

export default async function MarketLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ market: string }>;
}) {
  const { market: marketId } = await params;
  const market = markets[marketId];

  if (!market) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Suspense fallback={<div className="h-16 w-full border-b bg-white"></div>}>
        <Header currentMarket={market} />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
