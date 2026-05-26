# STYLES.md — 3D Model System

## Design Goals
- Modern, minimal, and developer-friendly UI
- Apple-like clarity: clean surfaces, subtle contrast, generous spacing
- UI must not compete with the 3D canvas
- Consistent in both light and dark themes

---

## Theme
- Support **light and dark modes**
- Default to system preference via `prefers-color-scheme`
- Apply theme using the `dark` class on `<html>`

---

## Color System (Tailwind)

Use **neutral** palette (no slate) + blue accent.

### Neutrals
- Background: `neutral-50` (light) / `neutral-950` (dark)
- Surface: `white` (light) / `neutral-900` (dark)
- Elevated: `neutral-100` (light) / `neutral-800` (dark)
- Border: `neutral-200` (light) / `neutral-800` (dark)

### Text
- Primary: `neutral-900` (light) / `neutral-100` (dark)
- Secondary: `neutral-500` (light) / `neutral-400` (dark)
- Muted: `neutral-400` (light) / `neutral-500` (dark)

### Accent & States
- Primary: `blue-500` (hover `blue-600`)
- Highlight (3D/UI focus): `cyan-400`
- Success: `emerald-500`
- Warning: `amber-500`
- Error: `red-500`

---

## Typography

### Fonts
- UI: `Inter, system-ui, sans-serif`
- Code: `JetBrains Mono, monospace`

### Sizes
- Body: `14px`
- Small: `12px`
- Headings: `18px`, `20px`, `24px`
- Code editor: `13px–14px`

---

## Spacing & Layout
- Base scale: `4, 6, 8, 12, 16, 24, 32`
- Radius: `rounded-lg` (default)
- Shadows:
  - Subtle: `shadow-sm`
  - Elevated: `shadow-md`

---

## Tailwind Rules
- Avoid long class strings; extract to constants when needed
- Use `dark:` variants for theming
- Prefer composition over duplication
- Keep visual density compact (IDE-like)

---

## Base Components (Examples)

### Button
```tsx
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
}

export const Button = ({ children, variant = 'primary' }: ButtonProps) => {
  const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors';

  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700',
    ghost: 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return <button className={`${base} ${variants[variant]}`}>{children}</button>;
};
```

### Input
```tsx
export const inputClasses = 'w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100';
```

### Card / Panel
```tsx
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

const cardClasses = 'rounded-lg border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900';

export const Card = ({ children }: CardProps) => {
  return <div className={cardClasses}>{children}</div>;
};
```

---

## Editor Layout Guidelines
- Top toolbar: compact controls, neutral background
- Main area: split view
  - Left: Monaco Editor
  - Right: 3D Viewer (canvas dominant)
- Optional sidebar: features/settings
- Avoid visual noise; prioritize the 3D canvas

---

## Interaction Principles
- Fast feedback (instant preview updates)
- Subtle hover states
- Minimal animations (no heavy motion)
- Clear focus states (especially inputs/editor)

---

## What to Avoid
- No external UI libraries
- No heavy gradients or flashy visuals
- No excessive shadows
- No complex animations

---

## Summary
- Clean, minimal, developer-first design
- Neutral palette with blue accent
- Consistent light/dark experience
- UI supports the 3D workflow, never distracts from it
