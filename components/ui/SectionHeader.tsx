type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`mb-10 max-w-3xl ${alignment}`}>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
