import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "@/store/use-app-store";
import { ProductionChart } from "@/components/ProductionChart";
import { ProductionTable } from "@/components/ProductionTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function FieldDetailPage() {
  const { fieldId } = useParams<{ fieldId: string }>();
  const fields = useAppStore((s) => s.fields);
  const navigate = useNavigate();
  const field = fields.find((f) => f.id === fieldId);

  if (!field) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        Field not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          aria-label="Back to map"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{field.name}</h2>
          <p className="text-sm text-muted-foreground">
            {field.operator} &middot;{" "}
            <span className="capitalize">{field.status}</span>
          </p>
        </div>
      </div>

      <section>
        <h3 className="text-lg font-semibold mb-3">Production History</h3>
        <ProductionChart fieldId={field.id} />
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3">Production Data</h3>
        <ProductionTable fieldId={field.id} />
      </section>
    </div>
  );
}
