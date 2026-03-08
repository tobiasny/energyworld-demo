# Deployment

> Guide for deploying customer apps as static web apps.

## Build

From any customer app folder:

```bash
cd apps/<customer-name>
npm install
npm run build
```

This produces a `dist/` folder with static HTML/CSS/JS ready for deployment.

## Azure Static Web Apps (Standard)

All apps deploy to **Azure Static Web Apps** using manual CLI deploys.

### Install the CLI

```bash
npm install -g @azure/static-web-apps-cli
```

### Local Preview

Preview the production build locally before deploying:

```bash
swa start dist/
```

### Resource Group

All customer apps deploy into the same Azure resource group:

```
Resource group:  energyworld-demo
```

Use `--resource-group energyworld-demo` on every deploy command.

### Naming Convention

Each app has exactly **one** Azure Static Web App instance. The Azure app name **must** match the folder name:

```
App folder:  apps/acme-corp/
Azure name:  acme-corp
Resource group: energyworld-demo
```

This ensures redeployments update the existing instance rather than creating duplicates.

### Deploy

Always use the `--app-name` flag with the canonical name:

```bash
cd apps/<customer-name>
npm run build
swa deploy dist/ --app-name <customer-name> --resource-group energyworld-demo
```

**Important**: Always include both `--app-name` and `--resource-group`. Omitting them may create a new instance or deploy to the wrong resource group.

### Redeployment

Redeploying is identical to the initial deploy — same command, same flags. The CLI updates the existing instance in place:

```bash
cd apps/<customer-name>
npm run build
swa deploy dist/ --app-name <customer-name> --resource-group energyworld-demo
```

### Notes

- **One instance per app** — never create multiple Azure SWA instances for the same customer app
- **Naming is the folder name** — `--app-name` always equals the `apps/` subdirectory name
- Manual deploys only — no CI/CD pipelines
- Each app deploys independently — there is no monorepo build step
- Ensure `npm run build` succeeds before deploying
