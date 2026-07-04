import type { SVGProps } from "react";

/**
 * Bespoke line-art marks drawn for Silberberg — engraved-plate character:
 * 1.5px strokes, squared terminals, 24x24 grid. Not an icon-pack import.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Balance scale — appraisal, fairness. */
export function ScaleIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3v15" />
      <path d="M5 6h14" />
      <path d="M5 6 2.5 12a3.5 3.5 0 0 0 5 0L5 6Z" />
      <path d="M19 6l-2.5 6a3.5 3.5 0 0 0 5 0L19 6Z" />
      <path d="M8 21h8" />
      <path d="M12 18l-2 3h4l-2-3Z" />
    </Base>
  );
}

/** Cast ingot in perspective. */
export function IngotIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7 9h10l3 7H4l3-7Z" />
      <path d="M9.5 12.5h5" />
    </Base>
  );
}

/** Coin with rim notch — numismatics. */
export function CoinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 9.5v5M10 11l2-1.5 2 1.5" />
    </Base>
  );
}

/** Ring with set stone — jewellery. */
export function RingIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="14" r="6.5" />
      <path d="M9.5 5.5 12 3l2.5 2.5L12 8 9.5 5.5Z" />
    </Base>
  );
}

/** Pocket-watch — timepieces. */
export function WatchIcon(props: IconProps) {
  return (
    <Base {...props}>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 9.5V13l2.5 2" />
      <path d="M10 5.5V3h4v2.5" />
    </Base>
  );
}

/** Molar — dental gold, drawn plainly, not cute. */
export function DentalIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M7.5 4C5.5 4 4.5 6 4.5 8c0 3 1.5 4 2 6.5.4 2 .5 5.5 2 5.5 1.6 0 1-4.5 3.5-4.5s1.9 4.5 3.5 4.5c1.5 0 1.6-3.5 2-5.5.5-2.5 2-3.5 2-6.5 0-2-1-4-3-4-1.8 0-2.5 1-4.5 1s-2.7-1-4.5-1Z" />
    </Base>
  );
}

/** Hallmark stamp — the assay mark. */
export function HallmarkIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M4 7l2-3h12l2 3v10l-2 3H6l-2-3V7Z" />
      <path d="M8.5 14.5v-5l2 2.5 2-2.5v5M16 9.5v5" />
    </Base>
  );
}

/** Shield with scale beam — discretion and security. */
export function ShieldIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 3 5 5.5v6c0 4.5 3 7.5 7 9.5 4-2 7-5 7-9.5v-6L12 3Z" />
      <path d="M8.5 11h7M12 8.5V15" />
    </Base>
  );
}

/** Banknote — immediate payment. */
export function BanknoteIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="7" width="18" height="10" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 10v4M18 10v4" />
    </Base>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 21c4-4.5 7-7.8 7-11.5A7 7 0 0 0 5 9.5C5 13.2 8 16.5 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </Base>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a1.5 1.5 0 0 1-1.7 1.5C10.5 19.6 4.4 13.5 3.5 5.7A1.5 1.5 0 0 1 5 4Z" />
    </Base>
  );
}

export function EnvelopeIcon(props: IconProps) {
  return (
    <Base {...props}>
      <rect x="3" y="5.5" width="18" height="13" />
      <path d="m3.5 6.5 8.5 7 8.5-7" />
    </Base>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Base>
  );
}
