# Deployment

> Guide for deploying customer apps as Azure Static Web Apps — fully non-interactive.

## Prerequisites

Two CLIs must be installed globally:

- **Azure CLI** (`az`): `brew install azure-cli`
- **SWA CLI** (`swa`): `sudo npm install -g @azure/static-web-apps-cli`

The user must be logged in via `az login` before deploying.

> **Note**: The `az` binary may not be on the default PATH in non-interactive shells. Use the full path `/opt/homebrew/bin/az` if `az` is not found.

## Azure Configuration

```
Subscription:    Microsoft Partner Network (ecdaba29-609e-4dd1-84f7-ec7c2deec4b0)
Resource group:  energyworld-demo
Location:        westus2
SKU:             Free
```

## Naming Convention

Each app has exactly **one** Azure Static Web App instance. The Azure app name **must** match the folder name:

```
App folder:  apps/acme-corp/
Azure name:  acme-corp
```

## Deploy Steps (Non-Interactive)

All commands below are non-interactive and safe to run from Claude Code.

### 1. Build

```bash
cd apps/<customer-name>
npm install
npm run build
```

### 2. Check if the SWA resource already exists

```bash
/opt/homebrew/bin/az staticwebapp show \
  --name <customer-name> \
  --resource-group energyworld-demo 2>&1
```

If the resource does **not** exist, create it:

```bash
/opt/homebrew/bin/az staticwebapp create \
  --name <customer-name> \
  --resource-group energyworld-demo \
  --location westus2 \
  --sku Free
```

### 3. Get the deployment token

```bash
DEPLOY_TOKEN=$(/opt/homebrew/bin/az staticwebapp secrets list \
  --name <customer-name> \
  --resource-group energyworld-demo \
  --query "properties.apiKey" -o tsv)
```

### 4. Deploy with the token

```bash
swa deploy dist/ --deployment-token "$DEPLOY_TOKEN" --env production
```

This skips all interactive prompts (login, project creation, naming).

### Combined one-liner

For convenience, steps 3–4 as a single command:

```bash
swa deploy dist/ \
  --deployment-token "$(/opt/homebrew/bin/az staticwebapp secrets list \
    --name <customer-name> \
    --resource-group energyworld-demo \
    --query 'properties.apiKey' -o tsv)" \
  --env production
```

## Redeployment

Redeploying is identical — same commands. The token remains valid, and the deploy updates the existing instance in place.

## Deployed App URL

After deployment, the app URL can be found with:

```bash
/opt/homebrew/bin/az staticwebapp show \
  --name <customer-name> \
  --resource-group energyworld-demo \
  --query "defaultHostname" -o tsv
```

## Notes

- **One instance per app** — never create multiple Azure SWA instances for the same customer app
- **Token-based deploy** — always use `--deployment-token` to avoid interactive prompts
- **No CI/CD** — manual deploys only
- Each app deploys independently
- Ensure `npm run build` succeeds before deploying
