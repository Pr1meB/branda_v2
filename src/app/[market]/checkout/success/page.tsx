import { markets } from "@/config/markets";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata = {
  title: "Order Successful | Branda",
};

export default async function CheckoutSuccessPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: marketId } = await params;
  const market = markets[marketId];
  if (!market) notFound();

  // Use a static order number to avoid Next.js 15 static generation unstable value errors
  const orderNumber = `BRD-839210`;

  return (
    <div className="container mx-auto px-6 lg:px-12 py-32 flex justify-center">
      <div className="max-w-xl w-full text-center bg-sand/30 p-12 md:p-16 rounded-[2rem] shadow-sm border border-stone-100">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
            <CheckCircle className="h-10 w-10 text-white" strokeWidth={2} />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-medium text-ink mb-6 tracking-tight">Order Received</h1>
        <p className="text-lg font-body text-stone-muted mb-4 font-light">
          Thank you for choosing Branda. We&apos;ve received your request and our creative team will get started right away.
        </p>
        <p className="text-sm font-medium uppercase tracking-widest text-ink mb-12 border-t border-b border-sand py-4 mt-8">
          Order number: <span className="font-light ml-2">{orderNumber}</span>
        </p>
        <Link
          href={`/${market.id}/services`}
          className="inline-flex items-center justify-center w-full bg-ink px-8 py-4 rounded-full text-sm font-medium text-paper hover:bg-black/80 transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Continue Browsing
        </Link>
      </div>
    </div>
  );
}
