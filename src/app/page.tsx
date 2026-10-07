import { redirect } from "next/navigation";
import { defaultMarket } from "../config/markets";

export default function RootPage() {
  redirect(`/${defaultMarket}`);
}
