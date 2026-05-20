"use client";

import { motion } from "framer-motion";

type DeliveryModelSectionProps = {
  kicker: string;
  title: string;
  summary: string;
};

const deliveryLayers = [
  {
    title: "Mapa operativo",
    desc: "Captura responsables, traspasos, sistemas, niveles de servicio y puntos de fricción antes de tomar decisiones tecnológicas.",
  },
  {
    title: "Núcleo estabilizado",
    desc: "Convierte la ejecución fragmentada en una base operativa controlada, con escalamiento, monitoreo y gobernanza claros.",
  },
  {
    title: "Capa de automatización",
    desc: "Conecta flujos, datos, notificaciones, aprobaciones y reportes en una capa de entrega digital gestionada.",
  },
] as const;

export function DeliveryModelSection({ kicker, title, summary }: DeliveryModelSectionProps) {
  return (
    <section className="home-section delivery-blueprint">
      <div className="delivery-blueprint-bg" aria-hidden="true">
        <span className="delivery-blueprint-glow glow-left" />
        <span className="delivery-blueprint-glow glow-right" />
        <span className="delivery-blueprint-noise" />
      </div>

      <div className="container delivery-blueprint-layout">
        <motion.div
          className="delivery-blueprint-copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.28 }}
          transition={{ duration: 0.72, ease: "easeOut" }}
        >
          <span className="eyebrow">{kicker}</span>
          <h2>{title}</h2>
          <p>{summary}</p>

          <div className="delivery-blueprint-metrics" aria-label="Controles de entrega">
            {["Torre de control", "Ritmo de servicio", "Mejora gestionada"].map((metric, index) => (
              <motion.span
                key={metric}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.34 }}
                transition={{ duration: 0.52, delay: 0.2 + index * 0.08, ease: "easeOut" }}
              >
                {metric}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="delivery-blueprint-stack"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.32 }}
          variants={{
            hidden: {
              transition: {
                staggerChildren: 0.1,
                staggerDirection: -1,
              },
            },
            show: {
              transition: {
                delayChildren: 0.18,
                staggerChildren: 0.14,
              },
            },
          }}
        >
          <motion.div
            className="delivery-blueprint-stack-head"
            variants={{
              hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.56, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <span className="delivery-blueprint-stack-kicker">Secuencia operativa</span>
            <span className="delivery-blueprint-stack-stage">01-03</span>
          </motion.div>

          <div className="delivery-blueprint-layers">
            {deliveryLayers.map((layer, index) => (
              <motion.article
                key={layer.title}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 28,
                    scale: 0.96,
                    filter: "blur(10px)",
                    transition: {
                      duration: 0.42,
                      ease: "easeInOut",
                    },
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.72,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                whileHover={{ y: -6, scale: 1.012 }}
              >
                <span className="delivery-blueprint-card-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{layer.title}</h3>
                <p>{layer.desc}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default DeliveryModelSection;
