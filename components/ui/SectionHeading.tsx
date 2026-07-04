type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  /** Tone matches the section surface: dark = ink section, light = bone. */
  tone: "dark" | "light";
};

export function SectionHeading({ eyebrow, heading, tone }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p
        className={`mb-4 text-xs font-medium uppercase tracking-[0.22em] ${
          tone === "dark" ? "text-gold-400" : "text-gold-800"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className="font-display text-(length:--text-display-md) leading-[1.05] font-medium"
        style={{ fontOpticalSizing: "auto" }}
      >
        {heading}
      </h2>
    </div>
  );
}
