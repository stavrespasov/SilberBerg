"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Inertial scrolling for the whole document. Wheel input only (Lenis
 * leaves native touch scrolling alone) and skipped entirely when the
 * visitor prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, anchors: true });
    let frame = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}
