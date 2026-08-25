"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

function formatter(prefix: string, suffix: string, decimals: number) {
  return (n: number) =>
    `${prefix}${n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`;
}

/**
 * Counts up to `value` the first time it scrolls into view. The final value is
 * what renders on the server, so the number is correct before (and without)
 * any JavaScript.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.4,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = formatter(prefix, suffix, decimals);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.textContent = format(value);
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { v: 0 };
        el.textContent = format(0);

        const tween = gsap.to(counter, {
          v: value,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = format(counter.v);
          },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });

        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { dependencies: [value, prefix, suffix, decimals, duration] },
  );

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
