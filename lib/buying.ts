/** Shared catalogue used by the pages, overview, navigation, and sitemap. */
export type BuyingImageAsset = {
  file: string;
  key: string;
  /** Add the approved local asset here when the photography is supplied. */
  src?: string;
  position?: string;
};

export type BuyingImage = BuyingImageAsset & {
  variants?: {
    studio: string;
    outdoor: string;
  };
  sequence?: readonly BuyingImageAsset[];
};

type BuyingCategory = {
  key: string;
  href: string;
  conditional: boolean;
  items: readonly string[];
  images: readonly BuyingImage[];
  cover?: BuyingImageAsset;
};

const rolexWatch = {
  file: "rolex-watch",
  key: "rolex",
  src: "/media/buying/rolex-watch.webp",
} as const;

const patekWatch = {
  file: "patek-philippe-watch",
  key: "patek",
  src: "/media/buying/patek-philippe-watch.jpg",
  position: "42% 50%",
} as const;

const louisVuittonBags = {
  file: "louis-vuitton-bags",
  key: "louisVuitton",
  src: "/media/buying/louis-vuitton-bags.jpg",
} as const;

export const buyingCategories = [
  {
    key: "metals",
    href: "/plemenite-kovine",
    conditional: false,
    items: [
      "jewellery",
      "investment",
      "dental",
      "scrap",
      "coins",
      "cutlery",
      "platinum",
      "tin",
    ],
    images: [
      {
        file: "investment-gold",
        key: "investment",
        src: "/media/buying/investment-gold.webp",
      },
      {
        file: "jewellery",
        key: "jewellery",
        src: "/media/buying/jewellery.webp",
      },
      {
        file: "silver-cutlery",
        key: "cutlery",
        src: "/media/buying/silver-cutlery.webp",
      },
      {
        file: "dental-gold",
        key: "dental",
        src: "/media/buying/dental-gold.webp",
      },
    ],
  },
  {
    key: "fur",
    href: "/krzno-in-usnje",
    conditional: true,
    items: [
      "furCoats",
      "collars",
      "hats",
      "leatherCoats",
      "trousers",
      "belts",
      "handbags",
    ],
    images: [
      {
        file: "fur-jacket",
        key: "jacket",
        src: "/media/buying/fur-jacket.webp",
        variants: {
          studio: "/media/buying/candidates/studio/fur-jacket.webp",
          outdoor: "/media/buying/candidates/outdoor/fur-jacket.webp",
        },
      },
      {
        file: "leather-jacket",
        key: "leather",
        src: "/media/buying/leather-jacket.webp",
        variants: {
          studio: "/media/buying/candidates/studio/leather-jacket.webp",
          outdoor: "/media/buying/candidates/outdoor/leather-jacket.webp",
        },
      },
      {
        file: "fur-coat",
        key: "coat",
        src: "/media/buying/fur-coat.webp",
        variants: {
          studio: "/media/buying/candidates/studio/fur-coat.webp",
          outdoor: "/media/buying/candidates/outdoor/fur-coat.webp",
        },
      },
      {
        file: "fur-collar",
        key: "collar",
        src: "/media/buying/fur-collar.webp",
        variants: {
          studio: "/media/buying/candidates/studio/fur-collar.webp",
          outdoor: "/media/buying/candidates/outdoor/fur-collar.webp",
        },
      },
    ],
  },
  {
    key: "other",
    href: "/drugi-predmeti",
    cover: patekWatch,
    conditional: true,
    items: [
      "watches",
      "handbags",
      "diamonds",
      "amber",
      "wigs",
      "instruments",
      "golf",
      "crystal",
      "porcelain",
      "cameras",
      "sewing",
    ],
    images: [
      {
        file: "premium-watch",
        key: "watch",
        src: rolexWatch.src,
        sequence: [
          rolexWatch,
          patekWatch,
          {
            file: "premium-watch",
            key: "watch",
            src: "/media/buying/premium-watch.webp",
          },
        ],
      },
      {
        file: "designer-handbag",
        key: "handbag",
        src: louisVuittonBags.src,
        sequence: [
          louisVuittonBags,
          {
            file: "designer-handbag",
            key: "handbag",
            src: "/media/buying/designer-handbag.webp",
          },
        ],
      },
      {
        file: "vintage-camera",
        key: "camera",
        src: "/media/buying/vintage-camera.webp",
      },
      {
        file: "sewing-machine",
        key: "sewing",
        src: "/media/buying/sewing-machine.webp",
      },
    ],
  },
] as const satisfies readonly BuyingCategory[];

export type BuyingCategoryKey = (typeof buyingCategories)[number]["key"];

export function getBuyingCategory(key: BuyingCategoryKey): BuyingCategory {
  return buyingCategories.find((category) => category.key === key)!;
}
