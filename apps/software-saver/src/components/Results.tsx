import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingDown, Users, Calculator, Sparkles } from "lucide-react";
import type { CalculatorInputs } from "@/App";

interface Props {
  inputs: CalculatorInputs;
  productivityMultiplier: number;
}

function formatNOK(value: number): string {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(value);
}

export function Results({ inputs, productivityMultiplier }: Props) {
  const { costPerHour, numberOfDevelopers, hoursPerMonth } = inputs;

  const currentMonthlyCost = costPerHour * numberOfDevelopers * hoursPerMonth;
  const currentAnnualCost = currentMonthlyCost * 12;

  // With AI, each developer is productivityMultiplier times more productive
  // So you need fewer developers for the same output
  const aiDevelopersNeeded = Math.ceil(
    numberOfDevelopers / productivityMultiplier
  );
  const developersReduced = numberOfDevelopers - aiDevelopersNeeded;

  const aiMonthlyCost = costPerHour * aiDevelopersNeeded * hoursPerMonth;
  const aiAnnualCost = aiMonthlyCost * 12;

  const monthlySavings = currentMonthlyCost - aiMonthlyCost;
  const annualSavings = currentAnnualCost - aiAnnualCost;
  const savingsPercent =
    currentAnnualCost > 0
      ? ((annualSavings / currentAnnualCost) * 100).toFixed(0)
      : "0";

  return (
    <div className="space-y-4">
      <Card className="border-primary/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Potential Savings
          </CardTitle>
          <CardDescription>
            With {productivityMultiplier}x productivity from Claude Code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold tracking-tight">
            {formatNOK(annualSavings)}
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            per year ({savingsPercent}% reduction)
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Team Size</p>
            </div>
            <p className="text-2xl font-bold">{aiDevelopersNeeded}</p>
            <p className="text-xs text-muted-foreground">
              down from {numberOfDevelopers} ({developersReduced} fewer)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Monthly Savings</p>
            </div>
            <p className="text-2xl font-bold">{formatNOK(monthlySavings)}</p>
            <p className="text-xs text-muted-foreground">per month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Current Cost</p>
            </div>
            <p className="text-2xl font-bold">{formatNOK(currentAnnualCost)}</p>
            <p className="text-xs text-muted-foreground">per year</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
