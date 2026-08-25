import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { TrustStrip } from "@/components/landing/trust-strip";
import { Pipeline } from "@/components/landing/pipeline";
import { FeaturesBento } from "@/components/landing/features-bento";
import { ConsolePreview } from "@/components/landing/console-preview";
import { Metrics } from "@/components/landing/metrics";
import { Pricing } from "@/components/landing/pricing";
import { Faq } from "@/components/landing/faq";
import { ClosingCta } from "@/components/landing/closing-cta";
import { SiteFooter } from "@/components/landing/site-footer";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustStrip />
        <Pipeline />
        <FeaturesBento />
        <ConsolePreview />
        <Metrics />
        <Pricing />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
