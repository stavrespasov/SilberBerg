import { BuyingCategoryPage } from "@/components/BuyingCategoryPage";
import { buyingMetadata } from "@/lib/buyingMetadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/plemenite-kovine">) {
  return buyingMetadata("metals", (await params).locale);
}

export default function PreciousMetalsPage({
  params,
}: PageProps<"/[locale]/plemenite-kovine">) {
  return <BuyingCategoryPage categoryKey="metals" params={params} />;
}
