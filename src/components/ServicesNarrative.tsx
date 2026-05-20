"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ServiceCard = {
  title: string;
  desc: string;
  meta: string;
};

type ServicesNarrativeProps = {
  kicker: string;
  title: string;
  summary: string;
  services: ServiceCard[];
};

export function ServicesNarrative({ kicker, title, summary, services }: ServicesNarrativeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const narrative = narrativeRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!root || !narrative || !viewport || !track) {
      return;
    }

    let mobileObserver: IntersectionObserver | null = null;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".service-capability", root);
      const showNarrative = (fromY: number) => {
        gsap.fromTo(
          narrative,
          { autoAlpha: 0, y: fromY },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.64,
            ease: "power3.out",
            overwrite: "auto",
          },
        );
      };
      const hideNarrative = (toY: number) => {
        gsap.to(narrative, {
          autoAlpha: 0,
          y: toY,
          duration: 0.42,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };

      gsap.set(narrative, { autoAlpha: 0, y: 24 });
      gsap.set(cards, { autoAlpha: 1, y: 0 });
      gsap.set(track, { y: 0, force3D: true });

      if (window.matchMedia("(max-width: 900px)").matches) {
        gsap.set(narrative, { autoAlpha: 0, y: 20 });
        gsap.set(cards, { autoAlpha: 0, x: 24, y: 10, scale: 0.96, filter: "blur(8px)" });
        gsap.set(track, { x: 0, y: 0, force3D: true });

        const revealMobile = (fromX = 24) => {
          gsap.fromTo(
            narrative,
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.72,
              ease: "power3.out",
              overwrite: "auto",
            },
          );

          gsap.fromTo(
            cards,
            { autoAlpha: 0, x: fromX, y: 10, scale: 0.96, filter: "blur(8px)" },
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.76,
              ease: "power3.out",
              stagger: 0.055,
              overwrite: "auto",
            },
          );
        };

        const hideMobile = (toX = -22) => {
          gsap.to(narrative, {
            autoAlpha: 0,
            y: toX < 0 ? -16 : 18,
            duration: 0.44,
            ease: "power2.inOut",
            overwrite: "auto",
          });

          gsap.to(cards, {
            autoAlpha: 0,
            x: toX,
            y: toX < 0 ? -8 : 10,
            scale: 0.97,
            filter: "blur(7px)",
            duration: 0.62,
            ease: "power2.inOut",
            stagger: {
              each: 0.035,
              from: toX < 0 ? "start" : "end",
            },
            overwrite: "auto",
          });
        };

        const getTravel = () => Math.max(track.scrollWidth - viewport.clientWidth, 0);

        if (getTravel() > 24) {
          root.classList.add("services-showcase-mobile-scroll");

          gsap.to(track, {
            x: () => -getTravel(),
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 14%",
              end: () => `+=${Math.max(getTravel() * 1.6, window.innerHeight * 1.15)}`,
              scrub: 0.72,
              pin: root,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onEnter: () => revealMobile(24),
              onLeave: () => hideMobile(-24),
              onEnterBack: () => revealMobile(-18),
              onLeaveBack: () => hideMobile(24),
            },
          });
        } else {
          ScrollTrigger.create({
            trigger: root,
            start: "top 92%",
            end: "bottom 12%",
            invalidateOnRefresh: true,
            onEnter: () => revealMobile(24),
            onLeave: () => hideMobile(-24),
            onEnterBack: () => revealMobile(-18),
            onLeaveBack: () => hideMobile(24),
          });
        }

        mobileObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry?.isIntersecting) {
              revealMobile(24);
            }
          },
          { threshold: 0.16 },
        );

        mobileObserver.observe(root);

        requestAnimationFrame(() => ScrollTrigger.refresh());

        return;
      }

      ScrollTrigger.create({
        trigger: root,
        start: "top 82%",
        onEnter: () => showNarrative(26),
        onLeaveBack: () => hideNarrative(24),
      });

      if (cards.length <= 2) {
        return;
      }

      const getTravel = () => Math.max(track.scrollHeight - viewport.offsetHeight, 0);

      gsap.to(track, {
        y: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 20%",
          end: () => `+=${Math.max(getTravel() * 2.4, 1100)}`,
          scrub: 0.7,
          pin: root,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => hideNarrative(-24),
          onEnterBack: () => showNarrative(-22),
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => {
      mobileObserver?.disconnect();
      root.classList.remove("services-showcase-mobile-scroll");
      context.revert();
    };
  }, []);

  return (
    <div className="services-showcase" ref={rootRef}>
      <div
        className="services-narrative"
        ref={narrativeRef}
      >
        <span className="eyebrow">{kicker}</span>

        <h2>{title}</h2>

        <p>{summary}</p>
      </div>

      <div className="services-carousel" ref={viewportRef}>
        <div className="services-capabilities" ref={trackRef}>
          {services.map((service, index) => (
            <article
              className="service-capability"
              key={service.title}
            >
              <div className="service-capability-topline">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{service.meta}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
