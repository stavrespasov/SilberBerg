"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";

/**
 * Gives its child a gentle magnetic pull toward the cursor — hover
 * physics, not layout. Fine pointers only; inert under reduced motion
 * and on touch, where the child renders exactly as before.
 */
export function Magnetic({
  children,
  strength = 8,
  className,
}: {
  children: ReactNode;
  /** Max pull in px at the element's edge. */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const active = () =>
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !active()) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    el.style.transition = "transform 0.1s ease-out";
    el.style.transform = `translate(${x * strength}px, ${y * strength * 0.7}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      // Caller-supplied classes replace the default so a `hidden`
      // breakpoint class is never fighting a hardcoded display value.
      className={className ?? "inline-block"}
    >
      {children}
    </div>
  );
}
