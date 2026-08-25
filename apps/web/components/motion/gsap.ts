"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Single place where GSAP plugins get registered. Every animated component
 * imports from here instead of calling `registerPlugin` itself.
 *
 * Registering at module scope is SSR-safe — the plugins only touch `window`
 * once an animation is actually created. Constructing a `SplitText` is *not*
 * SSR-safe, so that only ever happens inside a `useGSAP` callback.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

if (typeof window !== "undefined") {
  // Webfonts land after the first triggers are measured, which shifts every
  // start/end position. One refresh once Geist is ready keeps them honest.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, useGSAP, ScrollTrigger, SplitText };
