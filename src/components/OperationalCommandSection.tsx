"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const capabilities = [
  {
    en: "Intake, routing and escalation",
    es: "Entrada, enrutamiento y escalamiento",
  },
  {
    en: "Infrastructure signals and continuity",
    es: "Senales de infraestructura y continuidad",
  },
  {
    en: "Automated workflows and approvals",
    es: "Flujos automatizados y aprobaciones",
  },
  {
    en: "Executive reporting and service rhythm",
    es: "Reportes ejecutivos y ritmo de servicio",
  },
] as const;

const metrics = [
  {
    value: "99.98%",
    en: "continuity target",
    es: "objetivo de continuidad",
  },
  {
    value: "<15m",
    en: "response window",
    es: "ventana de respuesta",
  },
  {
    value: "24/7",
    en: "operational coverage",
    es: "cobertura operacional",
  },
] as const;

const flow = [
  {
    en: "Signal",
    es: "Senal",
  },
  {
    en: "Triage",
    es: "Triaje",
  },
  {
    en: "Resolution",
    es: "Resolucion",
  },
  {
    en: "Reporting",
    es: "Reporte",
  },
] as const;

const content = {
  en: {
    kicker: "Operational Command Layer",
    title: "We run the systems your operation depends on.",
    summary:
      "CQuest connects support, infrastructure, automation, CRM and reporting into one managed operating layer for teams that need continuity, control and execution.",
    aria: "Operational capabilities",
    metricAria: "Operational metrics",
    flowAria: "Operational flow",
    liveLabel: "Live operations",
    operationalStatus: "All systems operational",
    health: "System health",
    workload: "Workload",
    automation: "Automation",
    automationStatus: "Active",
    imageAlt:
      "CQuest operational command layer connecting service desk, infrastructure, automation, CRM, backoffice and reporting.",
  },
  es: {
    kicker: "Capa de comando operacional",
    title: "Operamos los sistemas de los que depende tu negocio.",
    summary:
      "CQuest conecta soporte, infraestructura, automatizacion, CRM y reportes en una capa operativa gestionada para equipos que necesitan continuidad, control y ejecucion.",
    aria: "Capacidades operativas",
    metricAria: "Metricas operativas",
    flowAria: "Flujo operativo",
    liveLabel: "Operaciones activas",
    operationalStatus: "Sistemas operando",
    health: "Salud del sistema",
    workload: "Carga operativa",
    automation: "Automatizacion",
    automationStatus: "Activo",
    imageAlt:
      "Capa de comando operacional de CQuest conectando service desk, infraestructura, automatizacion, CRM, backoffice y reportes.",
  },
} as const;

type OperationalCommandSectionProps = {
  locale: "en" | "es";
};

export function OperationalCommandSection({ locale }: OperationalCommandSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const sectionContent = content[locale];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const copy = copyRef.current;
    const visual = visualRef.current;
    const image = imageRef.current;

    if (!section || !copy || !visual || !image) {
      return;
    }

    const visualImage = image.querySelector("img");

    if (!visualImage) {
      return;
    }

    const context = gsap.context(() => {
      const chips = gsap.utils.toArray<HTMLElement>(".operational-command-chip", section);
      const metrics = gsap.utils.toArray<HTMLElement>(".operational-command-metric", section);
      const flowItems = gsap.utils.toArray<HTMLElement>(".operational-command-flow-step", section);
      const overlays = gsap.utils.toArray<HTMLElement>(".operational-command-overlay", section);

      gsap.set([copy, visual], { autoAlpha: 0, y: 32 });
      gsap.set([...chips, ...metrics, ...flowItems, ...overlays], { autoAlpha: 0, y: 14, scale: 0.96 });

      const intro = gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "bottom 22%",
            toggleActions: "play none none reverse",
          },
        })
        .to(copy, {
          autoAlpha: 1,
          y: 0,
          duration: 0.78,
          ease: "power3.out",
        })
        .to(
          visual,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.48",
        )
        .to(
          metrics,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.07,
          },
          "-=0.42",
        )
        .to(
          chips,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.055,
          },
          "-=0.34",
        )
        .to(
          flowItems,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.48,
            ease: "power3.out",
            stagger: 0.06,
          },
          "-=0.32",
        )
        .to(
          overlays,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.64,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.42",
        );

      gsap.to(visualImage, {
        yPercent: window.matchMedia("(max-width: 900px)").matches ? -4 : -8,
        scale: window.matchMedia("(max-width: 900px)").matches ? 1.02 : 1.045,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => intro.kill();
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section className="home-section operational-command" ref={sectionRef}>
      <div className="container operational-command-layout">
        <div className="operational-command-copy" ref={copyRef}>
          <span className="eyebrow">{sectionContent.kicker}</span>
          <h2>{sectionContent.title}</h2>
          <p>{sectionContent.summary}</p>

          <div className="operational-command-metrics" aria-label={sectionContent.metricAria}>
            {metrics.map((metric) => (
              <span className="operational-command-metric" key={metric.value}>
                <strong>{metric.value}</strong>
                <small>{metric[locale]}</small>
              </span>
            ))}
          </div>

          <div className="operational-command-chips" aria-label={sectionContent.aria}>
            {capabilities.map((capability) => (
              <span className="operational-command-chip" key={capability.en}>
                {capability[locale]}
              </span>
            ))}
          </div>
        </div>

        <div className="operational-command-visual" ref={visualRef}>
          <div className="operational-command-visual-shell">
            <div className="operational-command-visual-head">
              <span>{sectionContent.liveLabel}</span>
              <strong>{sectionContent.operationalStatus}</strong>
            </div>

            <div className="operational-command-flow" aria-label={sectionContent.flowAria}>
              {flow.map((step, index) => (
                <span className="operational-command-flow-step" key={step.en}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {step[locale]}
                </span>
              ))}
            </div>

            <div className="operational-command-overlay overlay-health">
              <span>{sectionContent.health}</span>
              <strong>98%</strong>
            </div>
            <div className="operational-command-overlay overlay-workload">
              <span>{sectionContent.workload}</span>
              <strong>1.2k</strong>
            </div>
            <div className="operational-command-overlay overlay-automation">
              <span>{sectionContent.automation}</span>
              <strong>{sectionContent.automationStatus}</strong>
            </div>
          </div>

          <div className="operational-command-image" ref={imageRef}>
            <Image
              src="/assets/img/sections/operational-command-layer.png"
              alt={sectionContent.imageAlt}
              width={704}
              height={618}
              sizes="(max-width: 900px) 100vw, 58vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
