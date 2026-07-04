import type { PriceRow } from "./pricing";

/**
 * INDICATIVE PLACEHOLDER PRICES — every row is confirmed: false and renders
 * with a visible [CONFIRM WITH CLIENT] tag until the client supplies real
 * values. Do not present these as live or binding rates.
 */
export const indicativePrices: readonly PriceRow[] = [
  { metal: "gold", purity: "585", karat: "14 k", eurPerGram: 41.5, confirmed: false },
  { metal: "gold", purity: "750", karat: "18 k", eurPerGram: 53.2, confirmed: false },
  { metal: "gold", purity: "875", karat: "21 k", eurPerGram: 62.1, confirmed: false },
  { metal: "gold", purity: "999.9", karat: "24 k", eurPerGram: 70.9, confirmed: false },
  { metal: "silver", purity: "925", eurPerGram: 0.62, confirmed: false },
  { metal: "silver", purity: "999", eurPerGram: 0.71, confirmed: false },
];

/** The date shown next to the disclaimer; updated whenever prices change. */
export const pricesUpdatedOn = new Date(2026, 6, 4);
