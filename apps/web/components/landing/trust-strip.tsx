"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/components/motion/gsap";
import { integrations } from "@/lib/landing-content";

export function TrustStrip() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el) return;

        // The row is rendered twice, so travelling exactly -50% loops seamlessly.
        const loop = gsap.to(el, {
          xPercent: -50,
          duration: 38,
          ease: "none",
          repeat: -1,
        });

        const pause = () => loop.pause();
        const resume = () => loop.resume();
        el.addEventListener("pointerenter", pause);
        el.addEventListener("pointerleave", resume);

        return () => {
          el.removeEventListener("pointerenter", pause);
          el.removeEventListener("pointerleave", resume);
          loop.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      id="integrations"
      aria-label="Integrations"
      className="border-y border-border/60 bg-muted/20 py-10"
    >
      <div ref={root} className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center font-mono text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
          Plugs into the stack you already run
        </p>

        <div className="mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <div ref={track} className="flex w-max gap-3">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 gap-3" aria-hidden={copy === 1}>
                {integrations.map(({ name, icon: Icon }) => (
                  <div
                    key={name}
                    className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border/70 bg-card/60 px-4 py-2.5"
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    <span className="text-sm whitespace-nowrap text-muted-foreground">
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
