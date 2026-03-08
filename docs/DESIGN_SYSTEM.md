# Design System

> Single source of truth for visual design decisions across all customer apps.

## shadcn/ui Configuration

When running `npx shadcn@latest init`, use these answers:

- **Style**: new-york
- **Base color**: zinc
- **CSS variables**: yes

## Color Palette

All colors use shadcn/ui CSS custom properties. Light mode only by default.

### Base Theme (zinc/slate)

```css
--background: 0 0% 100%;
--foreground: 240 10% 3.9%;
--card: 0 0% 100%;
--card-foreground: 240 10% 3.9%;
--popover: 0 0% 100%;
--popover-foreground: 240 10% 3.9%;
--muted: 240 4.8% 95.9%;
--muted-foreground: 240 3.8% 46.1%;
--border: 240 5.9% 90%;
--input: 240 5.9% 90%;
--ring: 240 5.9% 10%;
```

### Accent: Blue

```css
--primary: 221.2 83.2% 53.3%;
--primary-foreground: 210 40% 98%;
--accent: 210 40% 96.1%;
--accent-foreground: 222.2 47.4% 11.2%;
```

### Semantic Colors

```css
--destructive: 0 84.2% 60.2%;
--destructive-foreground: 0 0% 98%;
```

## Typography

**Font**: Inter via `@fontsource/inter`

Install in each app:
```bash
npm install @fontsource/inter
```

Import in `main.tsx`:
```tsx
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
```

Set in `tailwind.config.ts`:
```ts
fontFamily: {
  sans: ["Inter", "system-ui", "sans-serif"],
}
```

### Type Scale

| Role             | Tailwind Classes                        |
|------------------|-----------------------------------------|
| Page title       | `text-3xl font-bold tracking-tight`     |
| Section heading  | `text-2xl font-semibold tracking-tight` |
| Card title       | `text-lg font-semibold`                 |
| Body             | `text-sm`                               |
| Muted / helper   | `text-sm text-muted-foreground`         |

## Spacing

| Context          | Tailwind Classes         |
|------------------|--------------------------|
| Page padding     | `p-6 md:p-8`            |
| Card gap (grid)  | `gap-4 md:gap-6`        |
| Inner card       | `p-6`                   |
| Form field stack | `space-y-4`             |
| Section gap      | `space-y-6`             |

## Border Radius & Shadows

Set `--radius: 0.5rem` in the shadcn/ui config.

| Element    | Tailwind Classes                              |
|------------|-----------------------------------------------|
| Card       | `rounded-lg border shadow-sm`                 |
| Modal      | `rounded-lg border shadow-lg`                 |
| Button     | Uses shadcn default (inherits `--radius`)     |
| Input      | Uses shadcn default (inherits `--radius`)     |
| Badge      | `rounded-md`                                  |

## Dark Mode

Not included by default. Can be added per-app if explicitly requested by the customer. When adding dark mode, use shadcn/ui's built-in dark mode support with a `ThemeProvider`.
