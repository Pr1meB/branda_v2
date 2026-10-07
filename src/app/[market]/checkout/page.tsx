import { markets } from "@/config/markets";
import { notFound } from "next/navigation";
import { Checkout } from "@/components/checkout/Checkout";

export const metadata = {
  title: "Checkout | Branda",
};

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ market: string }>;
}) {
  const { market: marketId } = await params;
  const market = markets[marketId];
  if (!market) notFound();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
      <Checkout market={market} />
    </div>
  );
}
