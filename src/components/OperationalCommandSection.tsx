"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const content = {
  en: {
    kicker: "Managed Operating Model",
    title: "A command system for the work that cannot drop.",
    summary:
      "CQuest does not just add tools or staff. We map the operation, stabilize ownership, run the service rhythm, and keep leadership informed with the signals that matter.",
    status: "Managed delivery layer",
    proof: "Operational proof",
    lanes: [
      ["01", "Map", "Systems, owners, handoffs and risk points become visible before execution starts."],
      ["02", "Stabilize", "Support, infrastructure, CRM and backoffice routines move into a governed service cadence."],
      ["03", "Automate", "Approvals, alerts, reports and escalations are connected into repeatable workflows."],
      ["04", "Improve", "Leadership gets rhythm, evidence and decisions instead of disconnected operational noise."],
    ],
    metrics: [
      ["24/7", "coverage model"],
      ["<15m", "response target"],
      ["99.9%", "continuity design"],
    ],
    signals: ["Ticket routing", "Infrastructure health", "CRM visibility", "Executive reporting"],
  },
  es: {
    kicker: "Modelo operativo gestionado",
    title: "Un sistema de comando para el trabajo que no puede fallar.",
    summary:
      "CQuest no solo agrega herramientas o personal. Mapeamos la operacion, estabilizamos responsables, gestionamos el ritmo de servicio y mantenemos a liderazgo informado con las senales que importan.",
    status: "Capa de entrega gestionada",
    proof: "Prueba operacional",
    lanes: [
      ["01", "Mapear", "Sistemas, responsables, traspasos y puntos de riesgo se vuelven visibles antes de ejecutar."],
      ["02", "Estabilizar", "Soporte, infraestructura, CRM y backoffice entran en una cadencia de servicio gobernada."],
      ["03", "Automatizar", "Aprobaciones, alertas, reportes y escalaciones se conectan en flujos repetibles."],
      ["04", "Mejorar", "Liderazgo recibe ritmo, evidencia y decisiones en vez de ruido operacional desconectado."],
    ],
    metrics: [
      ["24/7", "modelo de cobertura"],
      ["<15m", "objetivo de respuesta"],
      ["99.9%", "diseno de continuidad"],
    ],
    signals: ["Enrutamiento de tickets", "Salud de infraestructura", "Visibilidad CRM", "Reportes ejecutivos"],
  },
} as const;

type OperationalCommandSectionProps = {
  locale: "en" | "es";
};

export function OperationalCommandSection({ locale }: OperationalCommandSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const sectionContent = content[locale];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const copy = copyRef.current;
    const board = boardRef.current;

    if (!section || !copy || !board) {
      return;
    }

    const context = gsap.context(() => {
      const revealItems = gsap.utils.toArray<HTMLElement>(".operating-model-reveal", section);
      const lanes = gsap.utils.toArray<HTMLElement>(".operating-model-lane", section);

      gsap.set([copy, board], { autoAlpha: 0, y: 34 });
      gsap.set(revealItems, { autoAlpha: 0, y: 18, scale: 0.97 });
      gsap.set(lanes, { "--lane-progress": "0%" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            end: "bottom 18%",
            toggleActions: "play none none reverse",
          },
        })
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.72, ease: "power3.out" })
        .to(board, { autoAlpha: 1, y: 0, duration: 0.82, ease: "power3.out" }, "-=0.46")
        .to(
          revealItems,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.56,
            ease: "power3.out",
            stagger: 0.065,
          },
          "-=0.42",
        );

      lanes.forEach((lane) => {
        gsap.to(lane, {
          "--lane-progress": "100%",
          ease: "none",
          scrollTrigger: {
            trigger: lane,
            start: "top 82%",
            end: "bottom 54%",
            scrub: 0.7,
          },
        });
      });

      gsap.to(board, {
        yPercent: window.matchMedia("(max-width: 900px)").matches ? -2 : -5,
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
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section className="home-section operating-model" ref={sectionRef}>
      <div className="container operating-model-layout">
        <div className="operating-model-copy" ref={copyRef}>
          <span className="eyebrow">{sectionContent.kicker}</span>
          <h2>{sectionContent.title}</h2>
          <p>{sectionContent.summary}</p>

          <div className="operating-model-metrics">
            {sectionContent.metrics.map(([value, label]) => (
              <span className="operating-model-metric operating-model-reveal" key={label}>
                <strong>{value}</strong>
                <small>{label}</small>
              </span>
            ))}
          </div>
        </div>

        <div className="operating-model-board" ref={boardRef}>
          <div className="operating-model-board-head operating-model-reveal">
            <span>{sectionContent.status}</span>
            <strong>{sectionContent.proof}</strong>
          </div>

          <div className="operating-model-lanes">
            {sectionContent.lanes.map(([number, title, description]) => (
              <article className="operating-model-lane operating-model-reveal" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="operating-model-signals">
            {sectionContent.signals.map((signal) => (
              <span className="operating-model-signal operating-model-reveal" key={signal}>
                {signal}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
