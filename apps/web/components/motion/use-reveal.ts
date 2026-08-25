"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "./gsap";

/**
 * Scroll-reveal for a whole section. Returns a ref to put on the section
 * element; every descendant carrying `data-reveal` fades and lifts into place
 * as it enters the viewport. An optional `data-reveal-delay` (in seconds)
 * staggers items within a group.
 *
 * Under `prefers-reduced-motion: reduce` nothing animates and nothing is
 * hidden — the CSS that hides `[data-reveal]` is behind the same query.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope);

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-reveal]", { autoAlpha: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: Number(el.dataset.revealDelay ?? 0),
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            },
          );
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return scope;
}
