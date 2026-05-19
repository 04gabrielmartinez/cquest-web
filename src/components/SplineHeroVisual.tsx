"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const ReactSpline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="spline-loader" aria-hidden="true" />,
});

type SplineHeroVisualProps = {
  previewUrl: string;
  runtimeSceneUrl?: string;
};

export function SplineHeroVisual({ previewUrl, runtimeSceneUrl }: SplineHeroVisualProps) {
  const cleanRuntimeUrl = runtimeSceneUrl?.trim();
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  const splineZoom = useMemo(() => {
    const shellWidth = viewportWidth ? Math.min(viewportWidth * 0.92, 660) : 660;
    const zoom = 1.0 + shellWidth / 4200;
    return Math.min(1.18, Math.max(1.08, zoom));
  }, [viewportWidth]);

  if (cleanRuntimeUrl?.endsWith(".splinecode")) {
    return (
      <ReactSpline
        className="spline-runtime"
        scene={cleanRuntimeUrl}
        renderOnDemand
        aria-label="CQuest 3D visual"
        style={{ ["--spline-zoom" as string]: splineZoom }}
      />
    );
  }

  return (
    <iframe
      className="spline-scene spline-preview-iframe"
      src={previewUrl}
      title="CQuest 3D visual"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      referrerPolicy="no-referrer"
      scrolling="no"
    />
  );
}
