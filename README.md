# CQuest Web

Visual draft for the CQuest enterprise technology website.

This project is currently a design and direction prototype, not a finalized production system. The current priority is to define the premium hero direction, typography, layout rhythm, bilingual content, and the role of the 3D visual before extracting a stricter design system.

## Current Direction

CQuest should feel like an enterprise technology partner with a premium, minimal, cinematic SaaS tone.

The target visual language is closer to Linear, Vercel, Stripe, Framer, Apple enterprise, Arc, and Raycast than to a generic marketing landing page.

Current hero principles:

- minimal copy
- refined typography
- strong negative space
- restrained visual hierarchy
- clean relationship between the text block and 3D scene
- enterprise tone without exaggerated marketing language

## Stack

- Next.js 16
- React 19
- TypeScript
- Framer Motion
- Spline via `@splinetool/react-spline`
- Global CSS in `src/app/globals.css`

## Project Structure

```txt
src/app/
  layout.tsx          Root layout
  page.tsx            Home page
  globals.css         Global design system and page styles

src/components/
  Header.tsx          Main navigation
  Hero.tsx            Home hero composition
  SplineHeroVisual.tsx  Spline runtime integration
  ScrollExperience.tsx  Header state and scroll progress behavior

src/lib/
  content.ts          Bilingual content, services, industries, and labels

public/assets/
  spline/
    cquest-hero.scene.splinecode
```

## Hero Notes

The 3D scene is intentionally isolated from the hero text.

Do not change the Spline scene, camera, motion, timing, runtime behavior, or canvas interaction unless the task explicitly asks for animation work. Most visual iteration should happen in:

- `src/lib/content.ts` for copy
- `src/app/globals.css` for typography, spacing, and layout
- `src/components/Hero.tsx` only when the hero structure itself needs to change

The current Spline scene loads from:

```txt
public/assets/spline/cquest-hero.scene.splinecode
```

It can be overridden with:

```bash
NEXT_PUBLIC_SPLINE_SCENE_URL=https://prod.spline.design/.../scene.splinecode
```

## Content Model

Most site copy is centralized in `src/lib/content.ts`.

The project currently supports:

- English: `en`
- Spanish: `es`

When changing public-facing copy, update both language dictionaries unless the task is explicitly single-language.

## Development

Install dependencies:

```bash
npm install
```

Run the dev server:

```bash
npm run dev
```

Run on port `3001`:

```bash
npm run dev -- -p 3001
```

Validate code:

```bash
npm run lint
npm run build
```

## Mobile Testing

For testing from a phone on the same network, the dev server must be reachable from the LAN. In WSL, this may require a Windows port proxy and firewall rule.

The Spline asset should be directly reachable from the phone:

```txt
http://<LAN_IP>:3001/assets/spline/cquest-hero.scene.splinecode
```

If the file responds but the animation does not render, the issue is likely mobile WebGL/Spline runtime behavior rather than network access.

## Draft Cleanup Later

Before production, this draft should be cleaned up:

- extract hero-specific CSS into a more maintainable structure
- define color, spacing, and typography tokens
- remove discarded visual experiments from global CSS
- decide whether Spline remains or is replaced by a local Three.js/GLB implementation
- finalize bilingual copy
- verify responsive screenshots across desktop and mobile
- run a production build before deployment

