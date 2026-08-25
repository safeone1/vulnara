import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <p
        data-reveal
        className="font-mono text-[0.7rem] tracking-[0.18em] text-primary uppercase"
      >
        {eyebrow}
      </p>
      <h2
        data-reveal
        data-reveal-delay="0.06"
        className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-[2.6rem] sm:leading-[1.1]"
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-reveal
          data-reveal-delay="0.12"
          className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
