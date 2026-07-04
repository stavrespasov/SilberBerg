type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
};

export function SectionHeading({ eyebrow, heading }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-gold-800">
        {eyebrow}
      </p>
      <h2
        className="font-display text-(length:--text-display-md) leading-[1.05] font-medium text-ink-900"
        style={{ fontOpticalSizing: "auto" }}
      >
        {heading}
      </h2>
    </div>
  );
}
