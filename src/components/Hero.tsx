"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/content";
import { SplineHeroVisual } from "@/components/SplineHeroVisual";

export function Hero({ dictionary }: { dictionary: Dictionary }) {
  const splinePreviewUrl = "https://app.spline.design/file/359d4095-5c35-477b-ad0d-91e1f132096b?view=preview";
  const splineRuntimeSceneUrl =
    process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? "/assets/spline/cquest-hero.scene.splinecode";

  return (
    <section className="hero hero-premium">
      <div className="hero-shell">
        <div className="hero-copy">
          <motion.span
            className="badge"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
          >
            {dictionary.hero_badge}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
          >
            <span>{dictionary.hero_title_line_1}</span>
            <span>{dictionary.hero_title_line_2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          >
            {dictionary.hero_desc}
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
          >
            <Link className="btn hero-primary" href="/contact">
              {dictionary.cta}
            </Link>
            <Link className="hero-secondary" href="/services">
              {dictionary.nav_service_cta}
            </Link>
          </motion.div>

          <motion.div
            className="hero-trust"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: "easeOut" }}
          >
            <span>{dictionary.hero_proof_1}</span>
            <span>{dictionary.hero_proof_2}</span>
            <span>{dictionary.hero_proof_3}</span>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual hero-spline-visual"
          initial={{ opacity: 0, scale: 0.96, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
        >
          <div className="spline-shell">
            <SplineHeroVisual previewUrl={splinePreviewUrl} runtimeSceneUrl={splineRuntimeSceneUrl} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
