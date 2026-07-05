type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  center?: boolean;
};

export function SectionHeading({
  eyebrow,
  heading,
  center,
}: SectionHeadingProps) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p
        className={`mb-4 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-gold uppercase ${center ? "justify-center" : ""}`}
      >
        {!center && (
          <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
        )}
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-medium tracking-tight text-balance text-bone md:text-6xl">
        {heading}
      </h2>
    </div>
  );
}
