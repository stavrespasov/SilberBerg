type PillLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
};

const variants = {
  dark: "bg-neutral-900 text-white hover:bg-neutral-700",
  light: "bg-stone-200 text-neutral-900 hover:bg-stone-300",
} as const;

/** The system's button: a pill that compresses slightly on press. */
export function PillLink({
  href,
  children,
  variant = "dark",
  className,
}: PillLinkProps) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full px-7 text-[15px] font-medium transition-[background-color,transform] duration-200 active:scale-[0.97] ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}
