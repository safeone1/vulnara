"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GitHubMark } from "@/components/icons";
import { gsap, useGSAP, SplitText } from "@/components/motion/gsap";
import { SIGN_IN_HREF, hero } from "@/lib/landing-content";
import { ScanTerminal } from "./scan-terminal";

const [titleLead, titleHighlight] = splitOnHighlight(
  hero.title,
  hero.highlight,
);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-hero-in], [data-hero-title]", { autoAlpha: 1, y: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = title.current;
        // Masked lines slide up from behind their own clip box.
        const split = heading
          ? new SplitText(heading, { type: "lines", mask: "lines" })
          : null;

        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.8 },
        });

        tl.set(heading, { autoAlpha: 1 });

        if (split) {
          tl.from(split.lines, { yPercent: 115, duration: 0.9, stagger: 0.11 });
        }

        tl.fromTo(
          "[data-hero-in]",
          { y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 },
          0.18,
        );

        // Slow, barely-there drift on the background light sources.
        const drift = gsap.to(".aurora-blob", {
          xPercent: "random(-9, 9)",
          yPercent: "random(-12, 12)",
          duration: 14,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 2.5, from: "random" },
        });

        return () => {
          tl.kill();
          drift.kill();
          split?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div
          className="aurora-blob top-[-14rem] left-[-6rem] size-[34rem]"
          style={{ background: "var(--primary)" }}
        />
        <div
          className="aurora-blob top-[-8rem] right-[-8rem] size-[30rem]"
          style={{ background: "var(--chart-2)" }}
        />
        <div
          className="aurora-blob bottom-[-18rem] left-1/3 size-[28rem] opacity-20"
          style={{ background: "var(--chart-3)" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 pt-32 pb-20 sm:px-8 sm:pt-40 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-14 lg:pt-44 lg:pb-28">
        <div className="max-w-2xl">
          <span
            data-hero-in
            className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3 py-1 text-xs font-medium text-primary"
          >
            <Sparkles className="size-3.5" />
            {hero.eyebrow}
          </span>

          <h1
            ref={title}
            data-hero-title
            className="mt-6 text-[2.5rem] leading-[1.06] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.1rem]"
          >
            {titleLead}
            <span className="text-gradient">{titleHighlight}</span>
          </h1>

          <p
            data-hero-in
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {hero.subtitle}
          </p>

          <div data-hero-in className="mt-9 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-11 gap-2 px-5 text-sm">
              <Link href={SIGN_IN_HREF}>
                <GitHubMark className="size-4" />
                {hero.primaryCta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 px-5 text-sm"
            >
              <a href="#workflows">{hero.secondaryCta}</a>
            </Button>
          </div>

          <p data-hero-in className="mt-5 text-xs text-muted-foreground">
            {hero.footnote}
          </p>
        </div>

        <div data-hero-in className="lg:pl-4">
          <ScanTerminal />
        </div>
      </div>
    </section>
  );
}

/** Splits the headline so the trailing phrase can take the gradient. */
function splitOnHighlight(title: string, highlight: string) {
  const at = title.lastIndexOf(highlight);
  if (at === -1) return [title, ""] as const;
  return [title.slice(0, at), highlight] as const;
}
