import type { ComponentType } from "react";
import {
  Activity,
  Boxes,
  BrainCircuit,
  Bug,
  Cloud,
  Container,
  Database,
  FileCheck2,
  GitBranch,
  GitCommitHorizontal,
  GitPullRequestArrow,
  KeyRound,
  Radar,
  Rocket,
  ScanSearch,
  Scale,
  Sparkles,
  SquareKanban,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import {
  DockerMark,
  GitHubMark,
  GitLabMark,
  KubernetesMark,
  SlackMark,
  TerraformMark,
  VercelMark,
} from "@/components/icons";

/*
 * Every string the landing page renders lives here so the section components
 * stay presentational.
 *
 * PLACEHOLDER MARKER: anything tagged `PLACEHOLDER` below is invented copy
 * written to give the layout realistic proportions — headline metrics, prices,
 * and the sample findings. Replace with real figures before this goes public.
 */

export const SIGN_IN_HREF = "/auth";

export const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Workflows", href: "#workflows" },
  { label: "Console", href: "#console" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const hero = {
  eyebrow: "AI-native DevSecOps",
  title: "Security that keeps up with your commits.",
  // The last two words get the gradient treatment in the hero.
  highlight: "your commits.",
  subtitle:
    "Vulnara connects to your repos, scans every commit with AI that actually reads your code, triages the noise away, opens the fix PR, gates the deploy — then keeps watching what you shipped.",
  primaryCta: "Scan your first repo",
  secondaryCta: "See how it works",
  footnote:
    "Connect a repo in under a minute · Read-only by default · No agent to install",
} as const;

/* ---------------------------------------------------------------- terminal */

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type TerminalLine =
  | { kind: "command"; text: string }
  | { kind: "muted"; text: string }
  | { kind: "ai"; text: string }
  | { kind: "success"; text: string }
  | { kind: "finding"; severity: Severity; code: string; text: string };

/** PLACEHOLDER — illustrative scan output for the hero panel. */
export const terminalScript: TerminalLine[] = [
  { kind: "command", text: "vulnara scan --repo acme/payments-api" },
  { kind: "muted", text: "cloning acme/payments-api @ 7f3c9d1" },
  { kind: "muted", text: "1,284 files · 214k LOC · 63 dependencies" },
  { kind: "muted", text: "engines: sast · sca · secrets · iac · containers" },
  {
    kind: "finding",
    severity: "critical",
    code: "CWE-89",
    text: "SQL injection · src/billing/invoices.ts:142",
  },
  {
    kind: "finding",
    severity: "high",
    code: "CVE-2025-2847",
    text: "prototype pollution · lodash@4.17.20 (reachable)",
  },
  {
    kind: "finding",
    severity: "high",
    code: "SECRET",
    text: "live API key in git history · .env.staging",
  },
  {
    kind: "finding",
    severity: "medium",
    code: "CIS-5.4",
    text: "container runs as root · Dockerfile:18",
  },
  {
    kind: "muted",
    text: "41 findings suppressed by triage (unreachable / test-only)",
  },
  { kind: "ai", text: "drafting patches with repo-aware context…" },
  {
    kind: "success",
    text: "4 fixes verified against your test suite — PR #482 opened",
  },
];

/* ---------------------------------------------------------------- pipeline */

export type PipelineStage = {
  id: string;
  label: string;
  blurb: string;
  icon: LucideIcon;
};

export const pipelineStages: PipelineStage[] = [
  {
    id: "commit",
    label: "Commit",
    blurb: "Every push, pull request and merge-queue entry, the moment it lands.",
    icon: GitCommitHorizontal,
  },
  {
    id: "scan",
    label: "Scan",
    blurb: "Code, dependencies, secrets, IaC and images — all analysed in parallel.",
    icon: ScanSearch,
  },
  {
    id: "triage",
    label: "AI triage",
    blurb: "Reachability and blast radius decide what is real. The rest never pages you.",
    icon: BrainCircuit,
  },
  {
    id: "fix",
    label: "Auto-fix",
    blurb: "A patch, a passing test run, and a PR with the reasoning attached.",
    icon: GitPullRequestArrow,
  },
  {
    id: "gate",
    label: "Policy gate",
    blurb: "Merges and deploys held against rules you version alongside the code.",
    icon: Scale,
  },
  {
    id: "deploy",
    label: "Deploy",
    blurb: "Signed artifacts ship with an SBOM and recorded provenance.",
    icon: Rocket,
  },
  {
    id: "monitor",
    label: "Monitor",
    blurb: "A new advisory drops at 2am? You hear about it before standup.",
    icon: Radar,
  },
];

/* ---------------------------------------------------------------- features */

export type Feature = {
  title: string;
  headline: string;
  body: string;
  icon: LucideIcon;
};

/** Order matters — the bento grid assigns column spans by index. */
export const features: Feature[] = [
  {
    title: "AI code analysis",
    headline: "Reads your code, not just patterns",
    body: "Dataflow-aware analysis that follows values across files and frameworks, so injection, broken authorization and unsafe deserialization surface together with the exact path an attacker would take to reach them.",
    icon: Bug,
  },
  {
    title: "Dependency intelligence",
    headline: "Only the CVEs that can actually run",
    body: "Direct and transitive packages resolved against real reachability, so a critical buried in code you never call is ranked like the non-issue it is.",
    icon: Boxes,
  },
  {
    title: "Secret detection",
    headline: "Including the ones already in your history",
    body: "Entropy scoring plus provider-specific validators across the working tree and the full git history, with rotation guidance per provider.",
    icon: KeyRound,
  },
  {
    title: "Autonomous remediation",
    headline: "Pull requests, not tickets",
    body: "Vulnara writes the patch, runs your own test suite against it, and opens a PR you can review like any other — with the reasoning, the reachable path, and the advisory linked inline.",
    icon: Sparkles,
  },
  {
    title: "IaC & containers",
    headline: "Terraform, Kubernetes, Dockerfiles",
    body: "Open buckets, permissive security groups, privileged containers and drifting manifests — caught at review time instead of after apply.",
    icon: Container,
  },
  {
    title: "Policy as code",
    headline: "Your rules, enforced in the pipeline",
    body: "Thresholds, exceptions and expiry dates live in a version-controlled policy file. Gates evaluate it on every merge and every deploy.",
    icon: Workflow,
  },
  {
    title: "Runtime monitoring",
    headline: "Shipping isn't the end of the scan",
    body: "Continuous watch over deployed services for fresh advisories, configuration drift, and dependencies that quietly went end-of-life.",
    icon: Activity,
  },
  {
    title: "Compliance evidence",
    headline: "Audit-ready without the fire drill",
    body: "OWASP Top 10, CIS benchmark and SOC 2 control mapping generated from the scans you are already running.",
    icon: FileCheck2,
  },
];

/* ------------------------------------------------------------ integrations */

export type Integration = {
  name: string;
  icon: ComponentType<{ className?: string }>;
};

export const integrations: Integration[] = [
  { name: "GitHub", icon: GitHubMark },
  { name: "GitLab", icon: GitLabMark },
  { name: "Bitbucket", icon: GitBranch },
  { name: "GitHub Actions", icon: Workflow },
  { name: "Docker", icon: DockerMark },
  { name: "Kubernetes", icon: KubernetesMark },
  { name: "Terraform", icon: TerraformMark },
  { name: "AWS", icon: Cloud },
  { name: "Vercel", icon: VercelMark },
  { name: "Postgres", icon: Database },
  { name: "Slack", icon: SlackMark },
  { name: "Jira", icon: SquareKanban },
];

/* ----------------------------------------------------------------- metrics */

export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
};

/** PLACEHOLDER — swap for measured numbers before publishing. */
export const metrics: Metric[] = [
  { value: 94, suffix: "%", label: "less alert noise after AI triage" },
  { value: 12, suffix: "×", label: "faster mean time to triage" },
  { value: 38, suffix: "s", label: "median full scan on 100k LOC" },
  { value: 4.1, suffix: "M", decimals: 1, label: "advisories and rules tracked" },
];

/* --------------------------------------------------------- console preview */

export type FindingRow = {
  title: string;
  location: string;
  severity: Severity;
  code: string;
  fixable: boolean;
};

/** PLACEHOLDER — sample findings for the console mock. */
export const consoleFindings: FindingRow[] = [
  {
    title: "SQL injection via unparameterised query",
    location: "src/billing/invoices.ts:142",
    severity: "critical",
    code: "CWE-89",
    fixable: true,
  },
  {
    title: "Prototype pollution in transitive dependency",
    location: "lodash@4.17.20",
    severity: "high",
    code: "CVE-2025-2847",
    fixable: true,
  },
  {
    title: "Live API key committed to git history",
    location: ".env.staging",
    severity: "high",
    code: "SECRET",
    fixable: false,
  },
  {
    title: "Container runs as root",
    location: "Dockerfile:18",
    severity: "medium",
    code: "CIS-5.4",
    fixable: true,
  },
  {
    title: "Missing rate limit on auth endpoint",
    location: "src/auth/routes.ts:64",
    severity: "medium",
    code: "OWASP-A07",
    fixable: true,
  },
  {
    title: "Overly permissive CORS origin",
    location: "src/main.ts:22",
    severity: "low",
    code: "OWASP-A05",
    fixable: true,
  },
];

export const severityBreakdown: { severity: Severity; count: number }[] = [
  { severity: "critical", count: 3 },
  { severity: "high", count: 9 },
  { severity: "medium", count: 14 },
  { severity: "low", count: 11 },
];

export const consoleKpis: Metric[] = [
  { value: 24, label: "Repos monitored" },
  { value: 37, label: "Open findings" },
  { value: 112, label: "Auto-fixed this week" },
  { value: 4, suffix: "m", label: "Median triage time" },
];

/** Open findings over the last 14 days, for the console sparkline. */
export const findingsTrend = [
  92, 88, 81, 84, 76, 70, 64, 66, 58, 51, 47, 44, 39, 37,
];

export const consoleNav = [
  "Overview",
  "Repositories",
  "Findings",
  "Workflows",
  "Policies",
  "Monitors",
] as const;

/* ----------------------------------------------------------------- pricing */

export type PricingTier = {
  name: string;
  price: string;
  cadence?: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

/** PLACEHOLDER — pricing is illustrative. */
export const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "For solo developers and side projects.",
    features: [
      "3 repositories",
      "Weekly full scans",
      "Code, dependency and secret analysis",
      "Pull request checks",
      "Community support",
    ],
    cta: "Start free",
  },
  {
    name: "Team",
    price: "$29",
    cadence: "per developer / month",
    tagline: "For teams shipping every day.",
    features: [
      "Unlimited repositories",
      "Scan on every commit",
      "AI triage and auto-fix pull requests",
      "Policy-as-code merge and deploy gates",
      "IaC and container scanning",
      "Runtime monitoring and drift alerts",
      "Slack and Jira delivery",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tagline: "For regulated and self-hosted estates.",
    features: [
      "Everything in Team",
      "Self-hosted or air-gapped runners",
      "SSO / SAML and SCIM provisioning",
      "SOC 2 and ISO evidence export",
      "Audit log streaming",
      "Dedicated support with an SLA",
    ],
    cta: "Talk to us",
  },
];

/* --------------------------------------------------------------------- faq */

export const faqs = [
  {
    q: "Does my source code leave my infrastructure?",
    a: "On the managed plan your code is fetched into an ephemeral per-scan sandbox, analysed, and destroyed when the scan finishes — it is never retained and never used to train models. On Enterprise you run the scan runners inside your own network, and only findings metadata ever leaves.",
  },
  {
    q: "How is this different from Dependabot and CodeQL?",
    a: "Those tell you that a package or a pattern is vulnerable. Vulnara works out whether the vulnerable path is reachable from your code, ranks it against your actual blast radius, writes the patch, verifies it against your tests, and enforces your policy at the gate. It runs alongside them rather than replacing them.",
  },
  {
    q: "Which languages and ecosystems are supported?",
    a: "TypeScript and JavaScript, Python, Go, Java and Kotlin, Ruby, PHP, C# and Rust for code analysis. npm, PyPI, Go modules, Maven, RubyGems, Packagist, NuGet and Cargo for dependencies. Terraform, CloudFormation, Kubernetes manifests, Helm charts and Dockerfiles for infrastructure.",
  },
  {
    q: "What happens with false positives?",
    a: "Triage shows its reasoning on every finding, so you can dismiss one with a reason and the same pattern stops surfacing. Suppressions live in your policy file, get reviewed in pull requests like any other change, and can carry an expiry date so nothing is silently muted forever.",
  },
  {
    q: "Can Vulnara block a deploy?",
    a: "Only if you tell it to. Gates are opt-in per policy and per environment. Most teams start in report-only mode, watch a few weeks of findings, then turn on enforcement for critical severities once they trust the signal.",
  },
  {
    q: "Can we self-host?",
    a: "Yes. Enterprise ships as a Helm chart or a Docker Compose stack backed by your own Postgres and object storage, including fully air-gapped installs where the advisory feed is synced from a mirror you control.",
  },
] as const;

/* ------------------------------------------------------------------ footer */

export const footerColumns = [
  {
    heading: "Platform",
    links: [
      { label: "Code analysis", href: "#platform" },
      { label: "Dependencies", href: "#platform" },
      { label: "Secrets", href: "#platform" },
      { label: "Infrastructure", href: "#platform" },
    ],
  },
  {
    heading: "Workflows",
    links: [
      { label: "Pipeline", href: "#workflows" },
      { label: "Policy gates", href: "#workflows" },
      { label: "Console", href: "#console" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Changelog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Security", href: "#" },
      { label: "Sub-processors", href: "#" },
    ],
  },
] as const;

export const closingCta = {
  title: "Point Vulnara at one repository.",
  subtitle:
    "Connect with GitHub, pick a repo, and get a full picture of what is actually exploitable in it — usually before you have finished your coffee.",
  primary: "Scan your first repo",
  secondary: "Read the docs",
} as const;

/* ------------------------------------------------------------- severity UI */

export const severityMeta: Record<
  Severity,
  { label: string; text: string; bg: string; dot: string; stroke: string }
> = {
  critical: {
    label: "Critical",
    text: "text-sev-critical",
    bg: "bg-sev-critical/12",
    dot: "bg-sev-critical",
    stroke: "var(--sev-critical)",
  },
  high: {
    label: "High",
    text: "text-sev-high",
    bg: "bg-sev-high/12",
    dot: "bg-sev-high",
    stroke: "var(--sev-high)",
  },
  medium: {
    label: "Medium",
    text: "text-sev-medium",
    bg: "bg-sev-medium/12",
    dot: "bg-sev-medium",
    stroke: "var(--sev-medium)",
  },
  low: {
    label: "Low",
    text: "text-sev-low",
    bg: "bg-sev-low/12",
    dot: "bg-sev-low",
    stroke: "var(--sev-low)",
  },
  info: {
    label: "Info",
    text: "text-sev-info",
    bg: "bg-sev-info/12",
    dot: "bg-sev-info",
    stroke: "var(--sev-info)",
  },
};
