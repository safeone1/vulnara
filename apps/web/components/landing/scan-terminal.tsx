"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";
import { gsap, useGSAP, SplitText } from "@/components/motion/gsap";
import {
  severityMeta,
  terminalScript,
  type TerminalLine,
} from "@/lib/landing-content";

export function ScanTerminal({ className }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-term-line]", { autoAlpha: 1, y: 0 });
        gsap.set("[data-term-progress]", { scaleX: 1 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const lines = gsap.utils.toArray<HTMLElement>("[data-term-line]");
        const [commandLine, ...rest] = lines;
        const commandText =
          commandLine?.querySelector<HTMLElement>("[data-term-typed]");

        // Split the command into characters so it can be typed out.
        const split = commandText
          ? new SplitText(commandText, { type: "chars" })
          : null;

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 4,
          defaults: { ease: "power2.out" },
        });

        tl.set(lines, { autoAlpha: 0, y: 6 })
          .set("[data-term-progress]", { scaleX: 0 })
          .set("[data-term-caret]", { autoAlpha: 0 });

        if (split) tl.set(split.chars, { autoAlpha: 0 });

        tl.to(commandLine, { autoAlpha: 1, y: 0, duration: 0.2 });

        if (split) {
          tl.to(
            split.chars,
            { autoAlpha: 1, duration: 0.01, stagger: 0.026 },
            "<",
          );
        }

        tl.to("[data-term-progress]", {
          scaleX: 1,
          duration: 2.6,
          ease: "power1.inOut",
        })
          .to(
            rest,
            { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.34 },
            "-=2.4",
          )
          .to("[data-term-caret]", { autoAlpha: 1, duration: 0.2 }, "-=0.1")
          .fromTo(
            "[data-term-success]",
            { boxShadow: "0 0 0 0 color-mix(in oklch, var(--primary), transparent 100%)" },
            {
              boxShadow:
                "0 0 26px -6px color-mix(in oklch, var(--primary), transparent 40%)",
              duration: 0.5,
              yoyo: true,
              repeat: 1,
            },
            "<",
          );

        return () => {
          tl.kill();
          split?.revert();
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className={cn(
        "panel overflow-hidden rounded-2xl shadow-2xl shadow-black/40",
        className,
      )}
    >
      {/* chrome */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-sev-critical/70" />
          <span className="size-2.5 rounded-full bg-sev-medium/70" />
          <span className="size-2.5 rounded-full bg-primary/70" />
        </div>
        <p className="truncate font-mono text-[0.7rem] text-muted-foreground">
          vulnara — acme/payments-api
        </p>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[0.65rem] text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          live
        </span>
      </div>

      {/* scan progress */}
      <div className="h-px w-full bg-border">
        <div
          data-term-progress
          className="h-px w-full origin-left bg-primary"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* output */}
      <div className="space-y-1.5 p-4 font-mono text-[0.72rem] leading-relaxed sm:text-xs">
        {terminalScript.map((line, i) => (
          <TerminalRow key={i} line={line} />
        ))}
        <div data-term-caret className="pl-3">
          <span className="text-primary">$</span>
          <span className="caret" aria-hidden="true" />
        </div>
      </div>

      {/* status bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border bg-muted/40 px-4 py-2.5 font-mono text-[0.65rem] text-muted-foreground">
        <span>
          <span className="text-sev-critical">1</span> critical
        </span>
        <span>
          <span className="text-sev-high">2</span> high
        </span>
        <span>
          <span className="text-sev-medium">1</span> medium
        </span>
        <span className="ml-auto text-primary">4 fixable · 38s</span>
      </div>
    </div>
  );
}

function TerminalRow({ line }: { line: TerminalLine }) {
  if (line.kind === "command") {
    return (
      <p data-term-line className="text-foreground">
        <span className="mr-1.5 text-primary">$</span>
        <span data-term-typed>{line.text}</span>
      </p>
    );
  }

  if (line.kind === "muted") {
    return (
      <p data-term-line className="pl-3 text-muted-foreground">
        <span className="mr-1.5 text-muted-foreground/60">→</span>
        {line.text}
      </p>
    );
  }

  if (line.kind === "ai") {
    return (
      <p data-term-line className="pl-3 text-chart-2">
        <span className="mr-1.5">◆</span>
        {line.text}
      </p>
    );
  }

  if (line.kind === "success") {
    return (
      <p
        data-term-line
        data-term-success
        className="mt-2 rounded-lg border border-primary/25 bg-primary/8 px-2.5 py-2 pl-3 text-primary"
      >
        <span className="mr-1.5">✔</span>
        {line.text}
      </p>
    );
  }

  const meta = severityMeta[line.severity];
  return (
    <p data-term-line className="flex items-start gap-2 pl-3">
      <span
        className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", meta.dot)}
        aria-hidden="true"
      />
      <span className={cn("w-14 shrink-0 uppercase", meta.text)}>
        {line.severity}
      </span>
      <span className="w-28 shrink-0 truncate text-muted-foreground/70">
        {line.code}
      </span>
      <span className="min-w-0 flex-1 text-foreground/90">{line.text}</span>
    </p>
  );
}
