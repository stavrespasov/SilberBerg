type PillLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
};

const variants = {
  // Solid fills only — no gradients on buttons (client direction, v4.1).
  solid: "bg-bone text-ink font-semibold hover:bg-gold hover:-translate-y-0.5",
  ghost:
    "border border-line-2 text-bone hover:border-gold hover:text-gold-hi hover:-translate-y-0.5",
} as const;

/** The system's button: a pill that compresses slightly on press. */
export function PillLink({
  href,
  children,
  variant = "solid",
  className,
}: PillLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full px-7 text-[15px] font-medium transition-[transform,background-color,border-color,color] duration-300 ease-vault active:scale-[0.97] active:translate-y-0 ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
