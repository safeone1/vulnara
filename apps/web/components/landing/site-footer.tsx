import Link from "next/link";

import { GitHubMark, VulnaraMark } from "@/components/icons";
import { SIGN_IN_HREF, footerColumns } from "@/lib/landing-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2" aria-label="Vulnara home">
            <VulnaraMark className="size-6" />
            <span className="text-[0.95rem] font-semibold tracking-tight">
              Vulnara
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            AI-native DevSecOps for teams that ship faster than their security
            review can keep up.
          </p>
          <Link
            href={SIGN_IN_HREF}
            className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHubMark className="size-4" />
            Continue with GitHub
          </Link>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <p className="font-mono text-[0.65rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
              {column.heading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Vulnara. All rights reserved.</p>
          <p className="font-mono text-[0.65rem]">
            Built for teams who ship on Fridays.
          </p>
        </div>
      </div>
    </footer>
  );
}
