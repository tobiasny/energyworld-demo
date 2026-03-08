import { useMemo } from "react";
import { useAppStore } from "@/store/use-app-store";
import type { Field } from "@/types";

interface Props {
  hoveredField: Field | null;
}

export function MapKPIs({ hoveredField }: Props) {
  const fields = useAppStore((s) => s.fields);
  const production = useAppStore((s) => s.production);

  const totals = useMemo(() => {
    const latestYear = Math.max(...production.map((r) => r.year));
    const latestRecords = production.filter((r) => r.year === latestYear);
    const totalOil = latestRecords.reduce((sum, r) => sum + r.oilMillionSm3, 0);
    const totalGas = latestRecords.reduce((sum, r) => sum + r.gasMillionSm3, 0);
    return { totalOil, totalGas, latestYear };
  }, [production]);

  const fieldStats = useMemo(() => {
    if (!hoveredField) return null;
    const latestYear = Math.max(
      ...production.filter((r) => r.fieldId === hoveredField.id).map((r) => r.year)
    );
    const latest = production.find(
      (r) => r.fieldId === hoveredField.id && r.year === latestYear
    );
    return latest ? { oil: latest.oilMillionSm3, gas: latest.gasMillionSm3, year: latestYear } : null;
  }, [production, hoveredField]);

  const label = hoveredField ? hoveredField.name : "All Fields";
  const oil = fieldStats ? fieldStats.oil : totals.totalOil;
  const gas = fieldStats ? fieldStats.gas : totals.totalGas;
  const year = fieldStats ? fieldStats.year : totals.latestYear;

  return (
    <div className="absolute top-4 left-14 z-[1000] flex gap-3">
      <div className="bg-card/90 backdrop-blur border rounded-lg px-4 py-3 shadow-md">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold">{oil.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">MSm3 oil</span></p>
        <p className="text-xs text-muted-foreground">{year}</p>
      </div>
      <div className="bg-card/90 backdrop-blur border rounded-lg px-4 py-3 shadow-md">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-xl font-bold">{gas.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">MSm3 gas</span></p>
        <p className="text-xs text-muted-foreground">{year}</p>
      </div>
      {!hoveredField && (
        <div className="bg-card/90 backdrop-blur border rounded-lg px-4 py-3 shadow-md">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-xl font-bold">{fields.length} <span className="text-sm font-normal text-muted-foreground">fields</span></p>
          <p className="text-xs text-muted-foreground">{fields.filter((f) => f.status === "producing").length} producing</p>
        </div>
      )}
    </div>
  );
}
