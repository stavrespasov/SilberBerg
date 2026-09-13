import Image from "next/image";
import type { BuyingImage } from "@/lib/buying";

export function BuyingPhoto({
  image,
  alt,
  sizes,
  preload = false,
}: {
  image: BuyingImage;
  alt: string;
  sizes: string;
  preload?: boolean;
}) {
  // Keep gallery dimensions stable if an optional future asset is unavailable.
  if (!image.src) {
    return <div aria-hidden="true" className="absolute inset-0 bg-coal-2" />;
  }

  return (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      className="object-cover"
      style={{ objectPosition: image.position ?? "50% 50%" }}
    />
  );
}
