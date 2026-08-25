"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/components/motion/use-reveal";
import { SIGN_IN_HREF, pricingTiers } from "@/lib/landing-content";
import { SectionHeading } from "./section-heading";

export function Pricing() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Pricing"
          title="Start on one repo. Grow into the whole org."
          subtitle="Every plan includes code, dependency and secret analysis. You pay when you want Vulnara acting on what it finds."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <div
              key={tier.name}
              data-reveal
              data-reveal-delay={(i * 0.08).toFixed(2)}
              className={cn(
                "panel relative flex flex-col rounded-2xl p-7",
                tier.featured &&
                  "border-primary/40 ring-1 ring-primary/25 lg:-my-3 lg:py-10",
              )}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-2.5 py-1 text-[0.65rem] font-medium text-primary-foreground">
                  Most popular
                </span>
              )}

              <h3 className="text-sm font-medium">{tier.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {tier.tagline}
              </p>

              <p className="mt-6 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-[-0.03em]">
                  {tier.price}
                </span>
                {tier.cadence && (
                  <span className="text-xs text-muted-foreground">
                    {tier.cadence}
                  </span>
                )}
              </p>

              <Button
                asChild
                size="lg"
                variant={tier.featured ? "default" : "outline"}
                className="mt-6 h-10 w-full text-sm"
              >
                <Link href={SIGN_IN_HREF}>{tier.cta}</Link>
              </Button>

              <ul className="mt-7 space-y-2.5 border-t border-border pt-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          data-reveal
          className="mt-8 text-center text-xs text-muted-foreground"
        >
          Prices shown are illustrative while Vulnara is in early access.
        </p>
      </div>
    </section>
  );
}
