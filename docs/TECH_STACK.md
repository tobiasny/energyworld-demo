# Tech Stack

> This file defines the approved technologies for all customer apps.

## Stack

- **Framework**: Vite + React
- **Styling**: Tailwind CSS v4 + shadcn/ui v4
- **Language**: TypeScript
- **Package manager**: npm
- **Build tool**: Vite

## Data

- **No backend** — all data is mocked and managed in memory on the client side
- Use React state (`useState`, `useReducer`) or a lightweight store for data management
- Mock data should be defined in a `src/data/` folder as TypeScript modules

## shadcn/ui

- Initialize with `npx shadcn@latest init --defaults` in each app folder (see `APP_TEMPLATE.md` for prerequisites)
- Add components as needed with `npx shadcn@latest add <component>`
- shadcn components live in `src/components/ui/` (the default)

### shadcn v4 Gotchas

- **No `asChild` prop**: shadcn v4 Button (and other components) no longer support the `asChild` prop from Radix. Use `onClick` with `useNavigate()` instead of wrapping a `<Link>` with `asChild`.
- **Tailwind v4 CSS config**: shadcn v4 generates CSS-based theme configuration inside `src/index.css` using `@theme inline`. There is no `tailwind.config.ts` file.
- **Default font is Geist**: After init, replace with Inter (see `APP_TEMPLATE.md`).

## Approved Libraries

| Purpose        | Library                          | Notes                                    |
|----------------|----------------------------------|------------------------------------------|
| Icons          | `lucide-react`                   | Only icon library. No Font Awesome, etc. |
| Dates          | `date-fns`                       | Lightweight, tree-shakeable              |
| Forms          | `react-hook-form` + `zod`        | Zod for schema validation                |
| Routing        | `react-router-dom`               | Only if 2+ views; skip for single-view   |
| State          | `zustand`                        | For shared/global state (see below)      |
| Toasts         | `sonner`                         | For success/info feedback                |
| Charts         | `recharts`                       | When data visualization is needed        |
| Maps           | `react-leaflet` + `leaflet`      | Also install `@types/leaflet` as dev dep |
| Font           | `@fontsource/inter`              | See `docs/DESIGN_SYSTEM.md`              |

## State Management

Use **Zustand** for any shared or global state. Local component state (`useState`) is fine for UI-only concerns (open/closed, form inputs before submit).

Standard store pattern in `src/store/`:

```ts
// src/store/use-app-store.ts
import { create } from "zustand";

interface AppState {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
}));
```

### Zustand Pitfall: Derived Data in Selectors

**Never** return derived/filtered arrays directly from Zustand store methods used as selectors. This creates a new array reference on every render, causing infinite re-render loops (especially with Recharts).

**Bad** — causes infinite re-renders:
```ts
// In store
getFilteredItems: (type) => get().items.filter(i => i.type === type)

// In component — new array every render = infinite loop
const items = useAppStore((s) => s.getFilteredItems("foo"));
```

**Good** — use `useMemo` in the component:
```ts
// In component
const allItems = useAppStore((s) => s.items);
const items = useMemo(
  () => allItems.filter(i => i.type === "foo"),
  [allItems]
);
```

## Code Conventions

### Component Structure

- One component per file
- PascalCase filenames matching component name (e.g., `StatCard.tsx`)
- Feature components in `src/components/`
- Page-level components in `src/pages/`
- shadcn/ui components stay in `src/components/ui/`

### Naming

| Thing      | Convention            | Example              |
|------------|-----------------------|----------------------|
| Components | PascalCase            | `StatCard.tsx`       |
| Hooks      | `use`-prefixed camelCase | `useFilters.ts`   |
| Data files | camelCase             | `mockProjects.ts`    |
| Types      | PascalCase            | `Project`, `User`    |
| Stores     | `use`-prefixed kebab  | `use-app-store.ts`   |

### Imports

- Use path aliases (`@/`) configured by shadcn init
- Group imports: React → third-party → local components → local utils/data

## Constraints

- Must produce a static build (`dist/` folder with HTML/CSS/JS)
- No server-side runtime — no API calls, no database
- All apps use the same stack for consistency
