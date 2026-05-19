"use client";

import { useEffect, useRef } from "react";

function getScrollLimit() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
}

function getScrollProgress() {
  const limit = getScrollLimit();
  return limit > 0 ? Math.min(window.scrollY / limit, 1) : 0;
}

export function ScrollExperience() {
  const barRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!barRef.current) {
        return;
      }

      barRef.current.style.transform = `scaleX(${getScrollProgress()})`;

      const hero = document.querySelector<HTMLElement>(".hero");
      const isPastHero = hero ? hero.getBoundingClientRect().bottom <= 96 : true;
      document.documentElement.toggleAttribute("data-header-solid", isPastHero);
    };

    const queueProgressUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(() => {
          updateProgress();
          frameRef.current = null;
        });
      }
    };

    const handleResize = () => {
      updateProgress();
    };

    updateProgress();
    window.addEventListener("scroll", queueProgressUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("scroll", queueProgressUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}
