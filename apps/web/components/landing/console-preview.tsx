"use client";

import { useRef } from "react";
import { GitBranch, Play, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Counter } from "@/components/motion/counter";
import { gsap, useGSAP } from "@/components/motion/gsap";
import { useReveal } from "@/components/motion/use-reveal";
import { VulnaraMark } from "@/components/icons";
import {
  consoleFindings,
  consoleKpis,
  consoleNav,
  findingsTrend,
  severityBreakdown,
  severityMeta,
} from "@/lib/landing-content";
import { SectionHeading } from "./section-heading";

const DONUT = { size: 148, radius: 58, stroke: 14, gap: 3 };

export function ConsolePreview() {
  const scope = useReveal<HTMLElement>();
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(frame);

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-draw]", { strokeDashoffset: 0 });
        gsap.set("[data-row]", { autoAlpha: 1, x: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: frame.current,
            start: "top 68%",
            once: true,
          },
          defaults: { ease: "power2.out" },
        });

        // Donut arcs and the trend line share the same draw-on treatment:
        // each path is dashed to its own length, then the offset runs to zero.
        gsap.utils.toArray<SVGPathElement>("[data-draw]").forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        });

        tl.to("[data-draw='arc']", {
          strokeDashoffset: 0,
          duration: 1.1,
          stagger: 0.12,
        })
          .to(
            "[data-draw='trend']",
            { strokeDashoffset: 0, duration: 1.4, ease: "none" },
            0.15,
          )
          .fromTo(
            "[data-row]",
            { autoAlpha: 0, x: -10 },
            { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.07 },
            0.3,
          );

        return () => tl.kill();
      });

      return () => mm.revert();
    },
    { scope: frame },
  );

  return (
    <section ref={scope} id="console" className="relative py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="aurora-blob top-1/4 left-1/2 size-[36rem] -translate-x-1/2 opacity-[0.14]"
          style={{ background: "var(--primary)" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The console"
          title="One place where the whole estate makes sense."
          subtitle="Severity that reflects reachability, a fix queue instead of a backlog, and the trend line that tells you whether any of it is actually working."
        />

        <div
          ref={frame}
          data-reveal
          className="panel mt-14 overflow-hidden rounded-2xl shadow-2xl shadow-black/50 sm:mt-16"
        >
          {/* browser chrome */}
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              <span className="size-2.5 rounded-full bg-muted-foreground/30" />
            </div>
            <div className="mx-auto flex max-w-sm min-w-0 flex-1 items-center gap-2 rounded-lg bg-muted/60 px-3 py-1">
              <Search className="size-3 shrink-0 text-muted-foreground/60" />
              <span className="truncate font-mono text-[0.65rem] text-muted-foreground">
                app.vulnara.io/repos/acme/payments-api
              </span>
            </div>
          </div>

          <div className="flex">
            {/* sidebar */}
            <aside className="hidden w-52 shrink-0 border-r border-border bg-sidebar/60 p-4 lg:block">
              <div className="flex items-center gap-2 px-2 pb-4">
                <VulnaraMark className="size-5" />
                <span className="text-sm font-semibold tracking-tight">
                  Vulnara
                </span>
              </div>
              <nav className="space-y-0.5">
                {consoleNav.map((item, i) => (
                  <span
                    key={item}
                    className={cn(
                      "flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs",
                      i === 2
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {item}
                    {i === 2 && (
                      <span className="rounded-full bg-primary/15 px-1.5 text-[0.6rem]">
                        37
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            </aside>

            {/* main */}
            <div className="min-w-0 flex-1 p-4 sm:p-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-base font-medium">
                    acme/payments-api
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[0.65rem] text-muted-foreground">
                    <GitBranch className="size-3" />
                    main · 7f3c9d1 · scanned 4m ago
                  </p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-2.5 py-1.5 text-xs font-medium text-primary-foreground">
                  <Play className="size-3" />
                  Scan now
                </span>
              </div>

              {/* KPIs */}
              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {consoleKpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-xl border border-border bg-background/40 p-3"
                  >
                    <p className="text-xl font-semibold tracking-tight tabular-nums">
                      <Counter value={kpi.value} suffix={kpi.suffix} />
                    </p>
                    <p className="mt-1 text-[0.7rem] text-muted-foreground">
                      {kpi.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* charts */}
              <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-12">
                <SeverityDonut className="lg:col-span-5" />
                <TrendCard className="lg:col-span-7" />
              </div>

              {/* findings */}
              <div className="mt-3 overflow-hidden rounded-xl border border-border">
                <div className="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2">
                  <p className="text-[0.7rem] font-medium">Open findings</p>
                  <p className="font-mono text-[0.65rem] text-muted-foreground">
                    sorted by reachable risk
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {consoleFindings.map((f) => {
                    const meta = severityMeta[f.severity];
                    return (
                      <div
                        key={f.title}
                        data-row
                        className="flex items-center gap-3 px-3 py-2.5"
                      >
                        <span
                          className={cn(
                            "hidden w-16 shrink-0 rounded-md px-1.5 py-0.5 text-center font-mono text-[0.6rem] uppercase sm:block",
                            meta.bg,
                            meta.text,
                          )}
                        >
                          {f.severity}
                        </span>
                        <span
                          className={cn(
                            "size-1.5 shrink-0 rounded-full sm:hidden",
                            meta.dot,
                          )}
                          aria-hidden="true"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs">{f.title}</p>
                          <p className="truncate font-mono text-[0.65rem] text-muted-foreground">
                            {f.code} · {f.location}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "shrink-0 rounded-md px-2 py-1 text-[0.65rem] font-medium",
                            f.fixable
                              ? "bg-primary/12 text-primary"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          {f.fixable ? "AI fix ready" : "Rotate key"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- the donut */

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p0 = polar(cx, cy, r, a0);
  const p1 = polar(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`;
}

const DONUT_TOTAL = severityBreakdown.reduce((sum, s) => sum + s.count, 0);

/** Arcs laid end to end around the ring, with a small gap between each. */
const DONUT_SEGMENTS = severityBreakdown.map(({ severity, count }, i) => {
  const center = DONUT.size / 2;
  const start =
    (severityBreakdown.slice(0, i).reduce((sum, s) => sum + s.count, 0) /
      DONUT_TOTAL) *
    360;
  const sweep = (count / DONUT_TOTAL) * 360;
  return {
    severity,
    d: arcPath(
      center,
      center,
      DONUT.radius,
      start + DONUT.gap / 2,
      start + sweep - DONUT.gap / 2,
    ),
  };
});

function SeverityDonut({ className }: { className?: string }) {
  const { size, radius, stroke } = DONUT;
  const center = size / 2;

  return (
    <div className={cn("rounded-xl border border-border bg-background/40 p-4", className)}>
      <p className="text-[0.7rem] font-medium">Severity mix</p>

      <div className="mt-2 flex items-center gap-4">
        <div className="relative shrink-0">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="size-28 sm:size-32"
            role="img"
            aria-label={`${DONUT_TOTAL} open findings by severity`}
          >
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="var(--border)"
              strokeWidth={stroke}
              opacity="0.5"
            />
            {DONUT_SEGMENTS.map((seg) => (
              <path
                key={seg.severity}
                data-draw="arc"
                d={seg.d}
                fill="none"
                stroke={severityMeta[seg.severity].stroke}
                strokeWidth={stroke}
                strokeLinecap="round"
              />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold tabular-nums">
              <Counter value={DONUT_TOTAL} />
            </span>
            <span className="text-[0.6rem] text-muted-foreground">open</span>
          </div>
        </div>

        <ul className="min-w-0 flex-1 space-y-1.5">
          {severityBreakdown.map(({ severity, count }) => {
            const meta = severityMeta[severity];
            return (
              <li key={severity} className="flex items-center gap-2 text-[0.7rem]">
                <span
                  className={cn("size-2 shrink-0 rounded-full", meta.dot)}
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">{meta.label}</span>
                <span className="ml-auto font-mono tabular-nums">{count}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- trend of open */

function TrendCard({ className }: { className?: string }) {
  const w = 320;
  const h = 96;
  const max = Math.max(...findingsTrend);
  const min = Math.min(...findingsTrend);
  const span = max - min || 1;

  const points = findingsTrend.map((v, i) => ({
    x: (i / (findingsTrend.length - 1)) * w,
    y: h - ((v - min) / span) * (h - 12) - 6,
  }));

  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;

  return (
    <div className={cn("rounded-xl border border-border bg-background/40 p-4", className)}>
      <div className="flex items-baseline justify-between">
        <p className="text-[0.7rem] font-medium">Open findings · 14 days</p>
        <p className="font-mono text-[0.65rem] text-primary">−60%</p>
      </div>

      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="mt-3 h-24 w-full"
        role="img"
        aria-label="Open findings trending down over the last fourteen days"
      >
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="var(--primary)"
              stopOpacity="0.28"
            />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#trend-fill)" />
        <path
          data-draw="trend"
          d={line}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
