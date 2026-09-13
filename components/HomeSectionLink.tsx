"use client";

import type { ComponentProps } from "react";
import { Link, usePathname } from "@/i18n/navigation";

/** Use native fragment navigation when already on the localized homepage. */
export function HomeSectionLink({
  href,
  ...props
}: Omit<ComponentProps<"a">, "href"> & { href: `/#${string}` }) {
  const pathname = usePathname();

  if (pathname === "/") return <a href={href.slice(1)} {...props} />;

  return <Link href={href} {...props} />;
}
