import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo } from "react";
import { useAppStore } from "@/store/use-app-store";
import { Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  fieldId: string;
}

export function ProductionTable({ fieldId }: Props) {
  const allProduction = useAppStore((s) => s.production);
  const production = useMemo(
    () => allProduction.filter((r) => r.fieldId === fieldId).sort((a, b) => a.year - b.year),
    [allProduction, fieldId]
  );
  const updateProduction = useAppStore((s) => s.updateProduction);
  const [editingYear, setEditingYear] = useState<number | null>(null);
  const [editOil, setEditOil] = useState("");
  const [editGas, setEditGas] = useState("");

  const startEdit = (year: number, oil: number, gas: number) => {
    setEditingYear(year);
    setEditOil(String(oil));
    setEditGas(String(gas));
  };

  const cancelEdit = () => {
    setEditingYear(null);
  };

  const saveEdit = () => {
    if (editingYear === null) return;
    const oil = parseFloat(editOil);
    const gas = parseFloat(editGas);
    if (isNaN(oil) || isNaN(gas) || oil < 0 || gas < 0) {
      toast.error("Values must be non-negative numbers");
      return;
    }
    updateProduction(fieldId, editingYear, oil, gas);
    setEditingYear(null);
    toast.success(`Updated production for ${editingYear}`);
  };

  return (
    <div className="max-h-64 overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Oil (MSm3)</TableHead>
            <TableHead>Gas (MSm3)</TableHead>
            <TableHead className="w-20"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {production.map((r) => (
            <TableRow key={r.year}>
              <TableCell className="font-medium">{r.year}</TableCell>
              {editingYear === r.year ? (
                <>
                  <TableCell>
                    <Input
                      type="number"
                      value={editOil}
                      onChange={(e) => setEditOil(e.target.value)}
                      className="h-8 w-24"
                      min={0}
                      step={0.01}
                      aria-label="Oil production"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={editGas}
                      onChange={(e) => setEditGas(e.target.value)}
                      className="h-8 w-24"
                      min={0}
                      step={0.01}
                      aria-label="Gas production"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={saveEdit}
                        aria-label="Save"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={cancelEdit}
                        aria-label="Cancel"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{r.oilMillionSm3}</TableCell>
                  <TableCell>{r.gasMillionSm3}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() =>
                        startEdit(r.year, r.oilMillionSm3, r.gasMillionSm3)
                      }
                      aria-label={`Edit ${r.year}`}
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
