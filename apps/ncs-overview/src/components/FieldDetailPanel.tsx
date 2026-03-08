import { useAppStore } from "@/store/use-app-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductionChart } from "./ProductionChart";
import { ProductionTable } from "./ProductionTable";
import { X } from "lucide-react";

export function FieldDetailPanel() {
  const selectedFieldId = useAppStore((s) => s.selectedFieldId);
  const fields = useAppStore((s) => s.fields);
  const selectField = useAppStore((s) => s.selectField);

  if (!selectedFieldId) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Select a field on the map to view details
      </div>
    );
  }

  const field = fields.find((f) => f.id === selectedFieldId);
  if (!field) return null;

  return (
    <Card className="h-full overflow-auto">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div>
          <CardTitle className="text-lg font-semibold">{field.name}</CardTitle>
          <CardDescription>
            {field.operator} &middot;{" "}
            <span className="capitalize">{field.status}</span>
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={() => selectField(null)}
          aria-label="Close details"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="text-sm font-medium mb-2">Production History</h3>
          <ProductionChart fieldId={selectedFieldId} />
        </section>
        <section>
          <h3 className="text-sm font-medium mb-2">Production Data</h3>
          <ProductionTable fieldId={selectedFieldId} />
        </section>
      </CardContent>
    </Card>
  );
}
