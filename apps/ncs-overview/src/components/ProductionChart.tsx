import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";
import { useAppStore } from "@/store/use-app-store";

interface Props {
  fieldId: string;
}

export function ProductionChart({ fieldId }: Props) {
  const allProduction = useAppStore((s) => s.production);
  const production = useMemo(
    () => allProduction.filter((r) => r.fieldId === fieldId).sort((a, b) => a.year - b.year),
    [allProduction, fieldId]
  );

  if (production.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No production data available.</p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={production}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="oilMillionSm3"
          name="Oil (MSm3)"
          stroke="#22c55e"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="gasMillionSm3"
          name="Gas (MSm3)"
          stroke="#3b82f6"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
