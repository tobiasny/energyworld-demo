# App Template

> This defines the standard structure for each customer app folder.

## Scaffolding a New App

```bash
cd apps/
npm create vite@latest <customer-name> -- --template react-ts
cd <customer-name>
npm install
```

### Install Tailwind CSS v4

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Add the Tailwind Vite plugin and `@` path alias to `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Configure path aliases for TypeScript

Add `baseUrl` and `paths` to **both** `tsconfig.json` and `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

> **Important**: shadcn init will fail if the `@/*` alias is missing from the root `tsconfig.json`.

### Set up Tailwind CSS entry point

Replace the contents of `src/index.css` with:

```css
@import "tailwindcss";
```

### Initialize shadcn/ui

```bash
npx shadcn@latest init --defaults
```

> **Important**: Tailwind CSS, the CSS import, and the path alias must all be in place **before** running `shadcn init`, or it will fail.

### Post-init: Replace font with Inter

shadcn v4 defaults to the Geist font. Replace it with Inter per the design system:

1. In `src/index.css`, replace `@import "@fontsource-variable/geist"` with:
   ```css
   @import "@fontsource/inter/400.css";
   @import "@fontsource/inter/500.css";
   @import "@fontsource/inter/600.css";
   @import "@fontsource/inter/700.css";
   ```

2. In the `@theme inline` block in `src/index.css`, replace:
   ```css
   --font-sans: 'Geist Variable', sans-serif;
   ```
   with:
   ```css
   --font-sans: 'Inter', system-ui, sans-serif;
   ```

### Post-init: Clean up Vite boilerplate

Remove the default Vite starter files:

```bash
rm -f src/App.css src/assets/react.svg public/vite.svg
```

### Post-init: Set up main.tsx

Replace `src/main.tsx` with:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

## Folder Structure

```
apps/<customer-name>/
├── INTERVIEW.md           # Customer interview notes
├── README.md              # Spec: what the customer asked for, what was built
├── package.json
├── tsconfig.json
├── vite.config.ts
├── components.json        # shadcn/ui config
├── index.html
├── src/
│   ├── main.tsx           # App entry
│   ├── App.tsx            # Root component
│   ├── index.css          # Tailwind directives + global styles
│   ├── components/
│   │   └── ui/            # shadcn/ui components (auto-generated)
│   ├── pages/             # Page-level components (if multi-view)
│   ├── hooks/             # Custom React hooks
│   ├── types/             # Shared TypeScript types/interfaces
│   ├── store/             # Zustand stores (see TECH_STACK.md)
│   ├── data/              # Mock data as TypeScript modules
│   ├── lib/
│   │   └── utils.ts       # cn() helper (added by shadcn init)
│   └── assets/            # Images, fonts, static files
└── public/                # Static files copied as-is to build output
```

> **Note**: Tailwind v4 uses CSS-based configuration (inside `src/index.css`). There is no `tailwind.config.ts` file.

## Required Scripts

Every `package.json` must include:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

## Customer README Template

Each app's `README.md` should contain:

```markdown
# <Customer Name> — MVP

## Spec
<What the customer asked for>

## Features
- <Feature 1>
- <Feature 2>

## Running Locally
npm install && npm run dev

## Deployment
npm run build → deploy contents of dist/
```
