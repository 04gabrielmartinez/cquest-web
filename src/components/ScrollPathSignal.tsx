"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const states = {
  hero: {
    label: "Core",
    className: "is-core",
  },
  services: {
    label: "Systems",
    className: "is-systems",
  },
  model: {
    label: "Model",
    className: "is-model",
  },
  sectors: {
    label: "Signals",
    className: "is-signals",
  },
  contact: {
    label: "Ready",
    className: "is-ready",
  },
} as const;

type StateKey = keyof typeof states;

export function ScrollPathSignal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

    const root = rootRef.current;
    const signal = signalRef.current;
    const label = labelRef.current;

    if (!root || !signal || !label || window.matchMedia("(max-width: 900px)").matches) {
      return;
    }

    const path = root.querySelector<SVGPathElement>(".scroll-path-signal-path");

    if (!path) {
      return;
    }

    const context = gsap.context(() => {
      const setState = (stateKey: StateKey) => {
        const state = states[stateKey];
        const classNames = Object.values(states).map((item) => item.className);

        signal.classList.remove(...classNames);
        signal.classList.add(state.className);

        gsap.to(label, {
          textContent: state.label,
          duration: 0.24,
          ease: "power2.out",
          snap: { textContent: 1 },
        });

        gsap.fromTo(
          signal,
          { scale: 0.88, rotate: -8 },
          { scale: 1, rotate: 0, duration: 0.48, ease: "back.out(1.8)", overwrite: "auto" },
        );
      };

      setState("hero");

      gsap.to(signal, {
        ease: "none",
        motionPath: {
          path,
          align: path,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        scrollTrigger: {
          trigger: ".page-v2",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      const sections = gsap.utils.toArray<HTMLElement>("[data-scroll-signal]");

      sections.forEach((section) => {
        const state = section.dataset.scrollSignal as StateKey | undefined;

        if (!state || !states[state]) {
          return;
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top 54%",
          end: "bottom 46%",
          onEnter: () => setState(state),
          onEnterBack: () => setState(state),
        });
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div className="scroll-path-signal" ref={rootRef} aria-hidden="true">
      <svg className="scroll-path-signal-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          className="scroll-path-signal-guide"
          d="M20 4 C88 14 18 28 74 42 C98 58 16 64 50 78 C72 90 38 94 56 98"
        />
        <path
          className="scroll-path-signal-path"
          d="M20 4 C88 14 18 28 74 42 C98 58 16 64 50 78 C72 90 38 94 56 98"
        />
      </svg>

      <div className="scroll-path-signal-marker is-core" ref={signalRef}>
        <span className="scroll-path-signal-shape" />
        <span className="scroll-path-signal-label" ref={labelRef}>Core</span>
      </div>
    </div>
  );
}
