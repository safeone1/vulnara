"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReveal } from "@/components/motion/use-reveal";
import { faqs } from "@/lib/landing-content";
import { SectionHeading } from "./section-heading";

export function Faq() {
  const scope = useReveal<HTMLElement>();

  return (
    <section ref={scope} id="faq" className="relative pb-24 sm:pb-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="The questions security teams ask first."
        />

        <div data-reveal className="mt-12">
          <Accordion type="single" collapsible defaultValue="faq-0">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`faq-${i}`}>
                <AccordionTrigger className="py-4 text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 leading-relaxed text-pretty text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
