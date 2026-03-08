# App Template

> This defines the standard structure for each customer app folder.

## Scaffolding a New App

```bash
cd apps/
npm create vite@latest <customer-name> -- --template react-ts
cd <customer-name>
npm install
npx shadcn@latest init
```

Then add Tailwind and shadcn components as needed.

## Folder Structure

```
apps/<customer-name>/
├── README.md              # Spec: what the customer asked for, what was built
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
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

## Required Scripts

Every `package.json` must include:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
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
