import { BuyingCategoryPage } from "@/components/BuyingCategoryPage";
import { buyingMetadata } from "@/lib/buyingMetadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/krzno-in-usnje">) {
  return buyingMetadata("fur", (await params).locale);
}

export default function FurAndLeatherPage({
  params,
}: PageProps<"/[locale]/krzno-in-usnje">) {
  return <BuyingCategoryPage categoryKey="fur" params={params} />;
}
