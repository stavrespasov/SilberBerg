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
      <p className="mb-3 text-sm font-medium text-amber-700">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
        {heading}
      </h2>
    </div>
  );
}
