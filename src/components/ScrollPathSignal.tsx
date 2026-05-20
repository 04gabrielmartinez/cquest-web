"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const states = {
  hero: {
    label: "Core",
    className: "is-core",
    rotate: 0,
  },
  services: {
    label: "Systems",
    className: "is-systems",
    rotate: 45,
  },
  model: {
    label: "Model",
    className: "is-model",
    rotate: 0,
  },
  sectors: {
    label: "Signals",
    className: "is-signals",
    rotate: -12,
  },
  contact: {
    label: "Ready",
    className: "is-ready",
    rotate: 45,
  },
} as const;

type StateKey = keyof typeof states;

export function ScrollPathSignal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const currentStateRef = useRef<StateKey | null>(null);

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
        if (currentStateRef.current === stateKey) {
          return;
        }

        currentStateRef.current = stateKey;

        const state = states[stateKey];
        const classNames = Object.values(states).map((item) => item.className);

        const particles = gsap.utils.toArray<HTMLElement>(".scroll-path-signal-particle", signal);
        const shockwave = signal.querySelector<HTMLElement>(".scroll-path-signal-shockwave");
        const shape = signal.querySelector<HTMLElement>(".scroll-path-signal-shape");

        gsap
          .timeline({ defaults: { overwrite: "auto" } })
          .to(signal, {
            y: -18,
            scale: 1.18,
            duration: 0.18,
            ease: "power3.out",
          })
          .to(
            particles,
            {
              x: (index) => Math.cos((index / particles.length) * Math.PI * 2) * 30,
              y: (index) => Math.sin((index / particles.length) * Math.PI * 2) * 30,
              autoAlpha: 1,
              scale: 1,
              duration: 0.22,
              ease: "power3.out",
              stagger: 0.012,
            },
            0,
          )
          .to(
            shockwave,
            {
              autoAlpha: 0.72,
              scale: 1.65,
              duration: 0.22,
              ease: "power2.out",
            },
            0,
          )
          .add(() => {
            signal.classList.remove(...classNames);
            signal.classList.add(state.className);
            label.textContent = state.label;
          })
          .fromTo(
            shape,
            { rotate: state.rotate - 32, scale: 0.72 },
            { rotate: state.rotate, scale: 1, duration: 0.44, ease: "back.out(2)" },
          )
          .to(
            signal,
            {
              y: 0,
              scale: 1,
              duration: 0.48,
              ease: "elastic.out(1, 0.55)",
            },
            "<",
          )
          .to(
            particles,
            {
              x: 0,
              y: 0,
              autoAlpha: 0,
              scale: 0.2,
              duration: 0.34,
              ease: "power2.inOut",
              stagger: 0.01,
            },
            "<+=0.08",
          )
          .to(
            shockwave,
            {
              autoAlpha: 0,
              scale: 0.72,
              duration: 0.34,
              ease: "power2.inOut",
            },
            "<",
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
          start: "top 56%",
          end: "bottom 44%",
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
          d="M72 5 C54 14 28 18 38 30 C54 46 80 40 70 55 C58 72 31 61 40 76 C49 90 68 86 58 97"
        />
        <path
          className="scroll-path-signal-path"
          d="M72 5 C54 14 28 18 38 30 C54 46 80 40 70 55 C58 72 31 61 40 76 C49 90 68 86 58 97"
        />
      </svg>

      <div className="scroll-path-signal-marker is-core" ref={signalRef}>
        <span className="scroll-path-signal-shockwave" />
        <span className="scroll-path-signal-shape" />
        {Array.from({ length: 8 }).map((_, index) => (
          <span className="scroll-path-signal-particle" key={index} />
        ))}
        <span className="scroll-path-signal-label" ref={labelRef}>Core</span>
      </div>
    </div>
  );
}
