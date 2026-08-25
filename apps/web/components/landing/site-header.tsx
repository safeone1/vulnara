"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GitHubMark, VulnaraWordmark } from "@/components/icons";
import { gsap, useGSAP, ScrollTrigger } from "@/components/motion/gsap";
import { SIGN_IN_HREF, navLinks } from "@/lib/landing-content";

export function SiteHeader() {
  const header = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // The bar sits transparent over the hero and picks up its glass background
  // once you scroll past the fold's first slice.
  useGSAP(
    () => {
      const el = header.current;
      if (!el) return;

      const fill = gsap.to(el, {
        backgroundColor:
          "color-mix(in oklch, var(--background), transparent 25%)",
        borderBottomColor: "var(--border)",
        duration: 0.25,
        ease: "none",
        paused: true,
      });

      ScrollTrigger.create({
        start: 24,
        end: "max",
        onToggle: (self) => (self.isActive ? fill.play() : fill.reverse()),
      });
    },
    { scope: header },
  );

  return (
    <header
      ref={header}
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="shrink-0" aria-label="Vulnara home">
          <VulnaraWordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            <Link href={SIGN_IN_HREF}>Sign in</Link>
          </Button>

          <Button asChild size="sm" className="hidden h-8 px-3 sm:inline-flex">
            <Link href={SIGN_IN_HREF}>
              <GitHubMark className="size-3.5" />
              Start free scan
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle asChild>
                  <VulnaraWordmark />
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col px-2" aria-label="Mobile">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-2 p-4">
                <Button asChild variant="outline" size="lg">
                  <Link href={SIGN_IN_HREF}>Sign in</Link>
                </Button>
                <Button asChild size="lg">
                  <Link href={SIGN_IN_HREF}>
                    <GitHubMark className="size-4" />
                    Start free scan
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
