"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GitHubMark } from "@/components/icons";
import { useReveal } from "@/components/motion/use-reveal";
import { SIGN_IN_HREF, closingCta } from "@/lib/landing-content";

export function ClosingCta() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} className="relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0" />
        <div
          className="aurora-blob bottom-[-12rem] left-1/2 size-[38rem] -translate-x-1/2"
          style={{ background: "var(--primary)" }}
        />
      </div>

      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2
          data-reveal
          className="text-3xl font-semibold tracking-[-0.02em] text-balance sm:text-[2.75rem] sm:leading-[1.08]"
        >
          {closingCta.title}
        </h2>
        <p
          data-reveal
          data-reveal-delay="0.07"
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground"
        >
          {closingCta.subtitle}
        </p>

        <div
          data-reveal
          data-reveal-delay="0.14"
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg" className="h-11 gap-2 px-5 text-sm">
            <Link href={SIGN_IN_HREF}>
              <GitHubMark className="size-4" />
              {closingCta.primary}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 px-5 text-sm">
            <a href="#platform">{closingCta.secondary}</a>
          </Button>
        </div>

        <p data-reveal data-reveal-delay="0.2" className="mt-6 text-xs text-muted-foreground">
          Read-only access · Revoke any time from your GitHub settings
        </p>
      </div>
    </section>
  );
}
