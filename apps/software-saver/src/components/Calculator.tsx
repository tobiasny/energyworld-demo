import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { CalculatorInputs } from "@/App";

interface Props {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
}

export function Calculator({ inputs, onChange }: Props) {
  const update = (field: keyof CalculatorInputs, value: number) => {
    onChange({ ...inputs, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Your Team</CardTitle>
        <CardDescription>
          Enter your current developer team details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="costPerHour">Cost per developer per hour (NOK)</Label>
          <Input
            id="costPerHour"
            type="number"
            min={0}
            step={50}
            value={inputs.costPerHour}
            onChange={(e) => update("costPerHour", Number(e.target.value))}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="numberOfDevelopers">Number of developers</Label>
            <span className="text-2xl font-bold">{inputs.numberOfDevelopers}</span>
          </div>
          <Slider
            id="numberOfDevelopers"
            min={1}
            max={100}
            step={1}
            value={[inputs.numberOfDevelopers]}
            onValueChange={(v) => update("numberOfDevelopers", Array.isArray(v) ? v[0] : v)}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>100</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="hoursPerMonth">Hours per month</Label>
          <Input
            id="hoursPerMonth"
            type="number"
            min={0}
            step={8}
            value={inputs.hoursPerMonth}
            onChange={(e) => update("hoursPerMonth", Number(e.target.value))}
          />
        </div>
      </CardContent>
    </Card>
  );
}
