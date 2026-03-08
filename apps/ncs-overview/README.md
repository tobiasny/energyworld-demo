# NCS Overview — MVP

## Spec

An interactive dashboard for analysts to view oil and gas production data across all fields on the Norwegian Continental Shelf (NCS).

## Features

- Interactive map showing field locations with status indicators (producing, shut down, under development)
- Click a field to view its historical production chart (oil & gas volumes by year)
- Editable production data table per field per year
- Production data visualized with line charts (Recharts)

## Running Locally

```bash
npm install && npm run dev
```

## Deployment

```bash
npm run build
```

Deploy contents of `dist/`.
