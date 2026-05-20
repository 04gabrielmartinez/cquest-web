"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function DigitalHummingbird() {
  const rootRef = useRef<HTMLDivElement>(null);
  const birdRef = useRef<SVGGElement>(null);
  const wingNearRef = useRef<SVGGElement>(null);
  const wingFarRef = useRef<SVGGElement>(null);
  const chestLightRef = useRef<SVGEllipseElement>(null);
  const trailRef = useRef<Array<SVGPathElement | null>>([]);
  const featherRef = useRef<Array<SVGPathElement | null>>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    const bird = birdRef.current;
    const wingNear = wingNearRef.current;
    const wingFar = wingFarRef.current;
    const chestLight = chestLightRef.current;
    const trails = trailRef.current.filter(Boolean) as SVGPathElement[];
    const feathers = featherRef.current.filter(Boolean) as SVGPathElement[];

    if (!root || !bird || !wingNear || !wingFar || !chestLight || trails.length === 0 || feathers.length === 0) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const context = gsap.context(() => {
      gsap.set([wingNear, wingFar], {
        transformBox: "fill-box",
        transformOrigin: "38% 72%",
      });

      gsap.set(root, {
        opacity: 0.96,
        x: 14,
        y: "10vh",
        scale: 0.96,
        rotate: -1.5,
      });

      if (reduceMotion) {
        gsap.set(root, {
          opacity: 0.9,
          x: 12,
          y: "14vh",
          scale: 0.98,
          rotate: 0,
        });
        return;
      }

      gsap.to(wingNear, {
        rotation: 7,
        scaleY: 0.18,
        scaleX: 1.08,
        skewX: -7,
        duration: 0.052,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(wingFar, {
        rotation: -6,
        scaleY: 0.22,
        scaleX: 1.04,
        skewX: 6,
        duration: 0.06,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.018,
      });

      gsap.to(bird, {
        y: -5,
        x: 2,
        rotation: 1.1,
        duration: 1.75,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(chestLight, {
        opacity: 0.9,
        scale: 1.14,
        transformOrigin: "center",
        duration: 1.15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      feathers.forEach((item, index) => {
        gsap.to(item, {
          opacity: index % 2 ? 0.22 : 0.55,
          duration: 0.7 + index * 0.08,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      trails.forEach((item, index) => {
        gsap.fromTo(
          item,
          { strokeDashoffset: 120, opacity: 0.06 },
          {
            strokeDashoffset: -210,
            opacity: index === 0 ? 0.45 : 0.25,
            duration: 2.4 + index * 0.45,
            repeat: -1,
            ease: "none",
          }
        );
      });

      gsap.fromTo(
        root,
        {
          opacity: 0.96,
          x: 14,
          y: "10vh",
          scale: 0.96,
          rotate: -1.5,
        },
        {
          opacity: 1,
          x: 0,
          y: "72vh",
          scale: 1.05,
          rotate: 3,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.35,
            invalidateOnRefresh: true,
          },
        }
      );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="digital-hummingbird"
      style={{ mixBlendMode: "screen", perspective: 1000 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 320"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full overflow-visible"
      >
        <defs>
          <radialGradient id="real-body" cx="42%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#F7FFFF" stopOpacity="0.95" />
            <stop offset="18%" stopColor="#84FFF4" stopOpacity="0.88" />
            <stop offset="42%" stopColor="#1595AA" stopOpacity="0.72" />
            <stop offset="76%" stopColor="#0B344E" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#020A13" stopOpacity="1" />
          </radialGradient>

          <linearGradient id="real-back" x1="90" y1="90" x2="205" y2="225">
            <stop offset="0%" stopColor="#9BFFF6" />
            <stop offset="32%" stopColor="#1CC9D8" />
            <stop offset="72%" stopColor="#0A5671" />
            <stop offset="100%" stopColor="#07111D" />
          </linearGradient>

          <linearGradient id="real-wing" x1="72" y1="22" x2="158" y2="156">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.72" />
            <stop offset="18%" stopColor="#B8FFFF" stopOpacity="0.42" />
            <stop offset="55%" stopColor="#35D7EF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0A1E33" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="real-feather" x1="80" y1="30" x2="168" y2="158">
            <stop offset="0%" stopColor="#EFFFFF" stopOpacity="0.52" />
            <stop offset="55%" stopColor="#66F3FF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#0A7FFF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="real-beak" x1="206" y1="130" x2="304" y2="116">
            <stop offset="0%" stopColor="#BFFFFF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#52D9FF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1B57FF" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="real-trail" x1="170" y1="180" x2="16" y2="248">
            <stop offset="0%" stopColor="#CFFFFF" stopOpacity="0.65" />
            <stop offset="42%" stopColor="#32E6FF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#235CFF" stopOpacity="0" />
          </linearGradient>

          <filter id="real-glow" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="1.1" result="soft" />
            <feGaussianBlur stdDeviation="5.5" result="wide" />
            <feColorMatrix
              in="wide"
              type="matrix"
              values="0 0 0 0 0.05  0 0 0 0 0.9  0 0 0 0 1  0 0 0 0.55 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="soft" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="10" stdDeviation="11" floodColor="#00111F" floodOpacity="0.58" />
          </filter>

          <filter id="motion-blur" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="1.9 0.35" />
          </filter>
        </defs>

        <g fill="none" strokeLinecap="round" filter="url(#real-glow)">
          <path
            ref={(el) => {
              trailRef.current[0] = el;
            }}
            d="M150 190 C108 205 66 207 19 187"
            stroke="url(#real-trail)"
            strokeWidth="2.1"
            strokeDasharray="36 22"
          />
          <path
            ref={(el) => {
              trailRef.current[1] = el;
            }}
            d="M137 212 C96 243 55 250 10 231"
            stroke="url(#real-trail)"
            strokeWidth="1.2"
            strokeDasharray="18 28"
          />
          <path
            ref={(el) => {
              trailRef.current[2] = el;
            }}
            d="M158 170 C111 142 80 98 74 45"
            stroke="url(#real-trail)"
            strokeWidth="1"
            strokeDasharray="12 24"
          />
        </g>

        <g ref={birdRef} filter="url(#soft-shadow)">
          <g ref={wingFarRef} opacity="0.22" filter="url(#motion-blur)">
            <path
              d="M146 150 C105 78 67 34 18 2 C67 12 127 58 177 144 C169 150 159 153 146 150 Z"
              fill="url(#real-wing)"
            />
            <ellipse
              cx="108"
              cy="78"
              rx="74"
              ry="26"
              transform="rotate(-36 108 78)"
              fill="url(#real-wing)"
              opacity="0.38"
            />
          </g>

          <g ref={wingNearRef} opacity="0.5" filter="url(#motion-blur)">
            <path
              d="M157 151 C138 67 149 16 183 -24 C214 43 224 104 202 162 C186 160 171 157 157 151 Z"
              fill="url(#real-wing)"
            />
            <ellipse
              cx="182"
              cy="71"
              rx="82"
              ry="28"
              transform="rotate(-78 182 71)"
              fill="url(#real-wing)"
              opacity="0.44"
            />
          </g>

          <g filter="url(#real-glow)">
            <path
              d="M197 137 C228 127 262 119 305 111 C266 127 231 141 199 151 Z"
              fill="url(#real-beak)"
              stroke="#9EFFFF"
              strokeWidth="1.15"
            />
            <path
              d="M196 143 C229 139 263 134 304 126"
              stroke="#DFFFFF"
              strokeWidth="0.55"
              opacity="0.65"
            />

            <path
              d="M154 141 C164 115 185 105 208 117 C225 126 228 145 212 162 C194 181 166 172 154 141 Z"
              fill="url(#real-body)"
              stroke="#D8FFFF"
              strokeWidth="0.55"
            />

            <path
              d="M110 158 C128 128 153 122 177 135 C203 150 205 183 182 210 C158 236 119 229 101 195 C94 181 98 169 110 158 Z"
              fill="url(#real-back)"
              stroke="#96FFFF"
              strokeWidth="0.55"
            />

            <path
              d="M100 184 C114 205 132 221 150 238 C130 234 105 226 83 203 C88 196 94 189 100 184 Z"
              fill="rgba(9, 68, 88, 0.82)"
              stroke="#42E9FF"
              strokeWidth="0.9"
            />

            <path
              d="M82 202 C56 222 37 244 16 278 C48 257 83 241 118 220 C102 215 91 210 82 202 Z"
              fill="rgba(4, 12, 22, 0.96)"
              stroke="#45EFFF"
              strokeWidth="0.45"
            />
            <path
              d="M94 212 C78 235 68 257 63 287 C82 260 101 240 124 225"
              fill="rgba(5, 16, 29, 0.82)"
              stroke="#22C8FF"
              strokeWidth="0.72"
              opacity="0.78"
            />

            <path d="M127 154 C139 146 153 144 170 150" stroke="#DFFFFF" strokeWidth="0.7" opacity="0.45" fill="none" />
            <path d="M115 179 C132 188 150 190 174 183" stroke="#8EFFF4" strokeWidth="0.65" opacity="0.38" fill="none" />
            <path d="M105 190 C122 208 139 219 154 224" stroke="#1FBDDE" strokeWidth="0.55" opacity="0.5" fill="none" />

            <ellipse
              ref={chestLightRef}
              cx="143"
              cy="182"
              rx="26"
              ry="36"
              fill="#79FFF4"
              opacity="0.16"
              transform="rotate(-24 139 181)"
            />

            <circle cx="201" cy="132" r="4.2" fill="#021019" stroke="#BFFFFF" strokeWidth="0.8" />
            <circle cx="202.2" cy="130.5" r="1.4" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default DigitalHummingbird;
