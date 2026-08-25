"use client";

import type { PointerEvent } from "react";

import { cn } from "@/lib/utils";
import { useReveal } from "@/components/motion/use-reveal";
import { features, type Feature } from "@/lib/landing-content";
import { SectionHeading } from "./section-heading";

/**
 * Column spans on the 12-column bento, by feature index. Chosen so every row
 * fills exactly — 7+5, 5+7, 4+4+4, 12.
 */
const SPANS = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-12",
];

export function FeaturesBento() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="platform" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Platform"
          title="Every layer of the stack, under the same lens."
          subtitle="Eight engines share one model of your repository, so a secret, a vulnerable package and a risky code path are ranked against each other instead of arriving in four different dashboards."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:mt-16 md:grid-cols-12">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={i}
              className={cn(
                "md:col-span-6",
                i === features.length - 1 && "md:col-span-12",
                SPANS[i],
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
  index,
  className,
}: {
  feature: Feature;
  index: number;
  className?: string;
}) {
  const { icon: Icon } = feature;

  // Follows the pointer so the highlight tracks the cursor across the card.
  const track = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      data-reveal
      data-reveal-delay={((index % 3) * 0.07).toFixed(2)}
      onPointerMove={track}
      className={cn(
        "panel group relative isolate overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-primary/25 sm:p-7",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklch, var(--primary), transparent 88%), transparent 70%)",
        }}
      />

      <span className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
        <Icon className="size-5" />
      </span>

      <p className="mt-5 font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
        {feature.title}
      </p>
      <h3 className="mt-2 text-lg font-medium tracking-[-0.01em] text-balance">
        {feature.headline}
      </h3>
      <p className="mt-2.5 max-w-prose text-sm leading-relaxed text-pretty text-muted-foreground">
        {feature.body}
      </p>
    </div>
  );
}
