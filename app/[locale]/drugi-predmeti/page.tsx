import { BuyingCategoryPage } from "@/components/BuyingCategoryPage";
import { buyingMetadata } from "@/lib/buyingMetadata";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/drugi-predmeti">) {
  return buyingMetadata("other", (await params).locale);
}

export default function OtherItemsPage({
  params,
}: PageProps<"/[locale]/drugi-predmeti">) {
  return <BuyingCategoryPage categoryKey="other" params={params} />;
}
