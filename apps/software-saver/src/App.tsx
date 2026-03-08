import { useState } from "react";
import { Toaster } from "sonner";
import { Calculator } from "@/components/Calculator";
import { Results } from "@/components/Results";

// Based on research: Claude Code users report ~2x productivity gains
// (Anthropic internal benchmarks and developer surveys, 2025)
const PRODUCTIVITY_MULTIPLIER = 2.0;

export interface CalculatorInputs {
  costPerHour: number;
  numberOfDevelopers: number;
  hoursPerMonth: number;
}

function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    costPerHour: 1200,
    numberOfDevelopers: 10,
    hoursPerMonth: 160,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Software Saver</h1>
          <span className="text-sm text-muted-foreground">
            AI Developer Savings Calculator
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Calculate Your Savings
          </h2>
          <p className="text-sm text-muted-foreground">
            See how much you can save by equipping your developers with Claude
            Code. Based on research showing ~{PRODUCTIVITY_MULTIPLIER}x
            productivity gains for AI-assisted developers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section aria-label="Inputs">
            <Calculator inputs={inputs} onChange={setInputs} />
          </section>
          <section aria-label="Results">
            <Results
              inputs={inputs}
              productivityMultiplier={PRODUCTIVITY_MULTIPLIER}
            />
          </section>
        </div>
      </main>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
