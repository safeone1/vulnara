"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { useReveal } from "@/components/motion/use-reveal";
import { pipelineStages, type PipelineStage } from "@/lib/landing-content";
import { SectionHeading } from "./section-heading";

export function Pipeline() {
  const scope = useReveal<HTMLElement>();
  const rail = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(rail);

      mm.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          // Only the rail that is actually on screen gets a scroll trigger;
          // matchMedia rebuilds this when the breakpoint flips.
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { reduce, desktop } = ctx.conditions as Record<string, boolean>;

          if (reduce) {
            gsap.set("[data-rail]", { scaleX: 1, scaleY: 1 });
            gsap.utils
              .toArray<HTMLElement>("[data-node-tile]")
              .forEach((tile) => tile.setAttribute("data-active", "true"));
            return;
          }

          const root = rail.current?.querySelector<HTMLElement>(
            desktop ? "[data-pipeline='horizontal']" : "[data-pipeline='vertical']",
          );
          const bar = root?.querySelector<HTMLElement>("[data-rail]");
          const tiles = root
            ? gsap.utils.toArray<HTMLElement>("[data-node-tile]", root)
            : [];
          if (!root || !bar || tiles.length === 0) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top 72%",
              end: "bottom 72%",
              scrub: 0.6,
            },
            // The leading edge of the rail switches nodes on, and switches
            // them back off when you scrub upward.
            onUpdate: () => {
              const p = tl.progress();
              tiles.forEach((tile, i) => {
                if (p >= (i / tiles.length) * 0.9)
                  tile.setAttribute("data-active", "true");
                else tile.removeAttribute("data-active");
              });
            },
          });

          tl.fromTo(
            bar,
            desktop ? { scaleX: 0 } : { scaleY: 0 },
            desktop
              ? { scaleX: 1, ease: "none", duration: 1 }
              : { scaleY: 1, ease: "none", duration: 1 },
            0,
          );

          tiles.forEach((tile, i) => {
            const at = (i / tiles.length) * 0.9;
            tl.to(tile, { scale: 1.07, duration: 0.05 }, at);
            tl.to(tile, { scale: 1, duration: 0.1 }, at + 0.05);
          });

          return () => tl.kill();
        },
      );

      return () => mm.revert();
    },
    { scope: rail },
  );

  return (
    <section ref={scope} id="workflows" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Workflows"
          title="From commit to production, one continuous loop."
          subtitle="Vulnara isn't a scan you remember to run. It's a workflow that sits in the pipeline you already have — reacting to every push and staying awake long after the deploy."
        />

        <div ref={rail} className="mt-16 sm:mt-20">
          {/* Horizontal rail — desktop */}
          <div data-pipeline="horizontal" className="relative hidden lg:block">
            <div
              aria-hidden="true"
              className="absolute top-6 right-[7.15%] left-[7.15%] h-px bg-border"
            />
            <div
              data-rail
              aria-hidden="true"
              className="absolute top-6 right-[7.15%] left-[7.15%] h-px origin-left bg-gradient-to-r from-primary/25 via-primary/70 to-primary shadow-[0_0_14px_var(--primary)]"
              style={{ transform: "scaleX(0)" }}
            />
            <ol className="relative grid grid-cols-7 gap-3">
              {pipelineStages.map((stage, i) => (
                <StageNode key={stage.id} stage={stage} index={i} />
              ))}
            </ol>
          </div>

          {/* Vertical rail — tablet and below */}
          <div data-pipeline="vertical" className="relative lg:hidden">
            <div
              aria-hidden="true"
              className="absolute top-6 bottom-6 left-6 w-px bg-border"
            />
            <div
              data-rail
              aria-hidden="true"
              className="absolute top-6 bottom-6 left-6 w-px origin-top bg-gradient-to-b from-primary/25 via-primary/70 to-primary shadow-[0_0_14px_var(--primary)]"
              style={{ transform: "scaleY(0)" }}
            />
            <ol className="relative space-y-8">
              {pipelineStages.map((stage, i) => (
                <StageNode key={stage.id} stage={stage} index={i} vertical />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageNode({
  stage,
  index,
  vertical,
}: {
  stage: PipelineStage;
  index: number;
  vertical?: boolean;
}) {
  const { icon: Icon } = stage;

  return (
    <li
      data-reveal
      data-reveal-delay={(index * 0.05).toFixed(2)}
      className={cn(
        vertical ? "flex gap-4" : "flex flex-col items-center text-center",
      )}
    >
      <span
        data-node-tile
        className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors duration-300 data-[active]:border-primary/50 data-[active]:bg-primary/10 data-[active]:text-primary data-[active]:shadow-[0_0_24px_-6px_var(--primary)]"
      >
        <Icon className="size-5" />
      </span>

      <div className={cn(vertical ? "pt-1" : "mt-4")}>
        <p className="font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground/60 uppercase">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-1 text-sm font-medium">{stage.label}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-pretty text-muted-foreground">
          {stage.blurb}
        </p>
      </div>
    </li>
  );
}
