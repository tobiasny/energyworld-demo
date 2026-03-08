# EnergyWorld Demo

A demonstration project showcasing Claude Code's ability to rapidly build small MVP single-page applications.

Each customer gets an isolated app folder with everything needed to run locally and deploy as a static web app.

## Project Structure

```
energyworld-demo/
├── README.md
├── CLAUDE.md              # Instructions for Claude Code
├── docs/
│   ├── TECH_STACK.md      # Approved tech stack and conventions
│   ├── APP_TEMPLATE.md    # Template structure for new customer apps
│   └── DEPLOYMENT.md      # Deployment guide for static hosting
├── apps/
│   └── <customer-name>/   # One folder per customer MVP
│       ├── README.md      # Customer-specific spec and notes
│       ├── index.html
│       ├── src/
│       └── ...
└── shared/                # Optional shared assets (fonts, icons, etc.)
```

## Quick Start

1. Ask Claude Code to create a new customer app: *"Create a new app for [customer] based on [spec]"*
2. Run locally: `cd apps/<customer-name> && npm run dev`
3. Deploy: follow instructions in `docs/DEPLOYMENT.md`
