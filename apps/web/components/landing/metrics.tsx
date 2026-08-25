"use client";

import { Counter } from "@/components/motion/counter";
import { useReveal } from "@/components/motion/use-reveal";
import { metrics } from "@/lib/landing-content";

export function Metrics() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} aria-label="Results" className="pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div
          data-reveal
          className="panel grid grid-cols-2 gap-y-10 rounded-2xl px-6 py-10 sm:px-10 lg:grid-cols-4 lg:divide-x lg:divide-border lg:gap-y-0"
        >
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              data-reveal
              data-reveal-delay={(i * 0.08).toFixed(2)}
              className="px-2 text-center lg:px-6"
            >
              <p className="text-4xl font-semibold tracking-[-0.03em] tabular-nums text-primary sm:text-5xl">
                <Counter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  decimals={metric.decimals ?? 0}
                />
              </p>
              <p className="mx-auto mt-2.5 max-w-[15rem] text-sm leading-snug text-pretty text-muted-foreground">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
