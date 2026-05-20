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
  renderOnDemand?: boolean;
  cacheKey?: string;
};

export function SplineHeroVisual({
  previewUrl,
  runtimeSceneUrl,
  renderOnDemand = true,
  cacheKey,
}: SplineHeroVisualProps) {
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

  const runtimeSceneWithCacheKey = useMemo(() => {
    if (!cleanRuntimeUrl || !cacheKey) {
      return cleanRuntimeUrl;
    }

    const separator = cleanRuntimeUrl.includes("?") ? "&" : "?";
    return `${cleanRuntimeUrl}${separator}v=${encodeURIComponent(cacheKey)}`;
  }, [cacheKey, cleanRuntimeUrl]);

  if (cleanRuntimeUrl?.split("?")[0].endsWith(".splinecode")) {
    const runtimeScene = runtimeSceneWithCacheKey ?? cleanRuntimeUrl;

    return (
      <ReactSpline
        key={runtimeScene}
        className="spline-runtime"
        scene={runtimeScene}
        renderOnDemand={renderOnDemand}
        aria-label="Visual 3D de CQuest"
        style={{ ["--spline-zoom" as string]: splineZoom }}
      />
    );
  }

  return (
    <iframe
      className="spline-scene spline-preview-iframe"
      src={previewUrl}
      title="Visual 3D de CQuest"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      referrerPolicy="no-referrer"
      scrolling="no"
    />
  );
}
