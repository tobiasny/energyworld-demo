# Claude Code Instructions

## Project Purpose

This project demonstrates Claude Code building small MVP single-page applications for different customers. Each customer app is self-contained and deployable as a static web app.

## Key Rules

1. **Isolation**: Each customer app lives in `apps/<customer-name>/` and must be fully self-contained — its own dependencies, config, and build setup.
2. **Tech stack**: Follow the approved stack defined in `docs/TECH_STACK.md`. Do not deviate without explicit approval.
3. **Template**: When creating a new customer app, follow the structure in `docs/APP_TEMPLATE.md`.
4. **No shared runtime dependencies**: The `shared/` folder is only for static assets. Each app must build and run independently.
5. **Static output**: Every app must produce a static build (HTML/CSS/JS) suitable for deployment to any static hosting service.
6. **Spec-driven**: Each customer app should have a `README.md` in its folder documenting what was requested and what was built.
7. **No backend**: All data is mocked and managed in memory on the client side. No API calls, no database. Mock data lives in `src/data/`.

## Workflow

- When asked to create a new customer app, first confirm the spec, then scaffold from the template.
- When asked to modify an existing app, read its README.md and source first.
- Always ensure `npm run dev` works locally and `npm run build` produces deployable static output.

## Design & Quality

- **Visual design**: Follow `docs/DESIGN_SYSTEM.md` for colors, typography, spacing, and shadcn/ui config.
- **UI patterns**: Follow `docs/UI_PATTERNS.md` for layouts, responsive design, UI states, and accessibility.
- **Code conventions**: Follow the conventions in `docs/TECH_STACK.md` for naming, component structure, state management, and approved libraries.
- **Deployment**: Follow `docs/DEPLOYMENT.md` for Azure Static Web Apps deployment.

## Quality Checklist

Before considering an app complete, verify:

- [ ] `npm run build` completes with no errors
- [ ] Responsive at 375px (mobile), 768px (tablet), and 1280px (desktop)
- [ ] UI states handled: loading (Skeleton), empty, error (Alert), success (toast)
- [ ] No hardcoded colors — all colors use CSS custom properties / shadcn theme
- [ ] Semantic HTML: `<header>`, `<main>`, `<nav>`, `<section>` landmarks used
- [ ] All form inputs have associated labels
- [ ] Keyboard navigation works for all interactive elements
