import type { ProductionRecord } from "@/types";

function generateProduction(
  fieldId: string,
  startYear: number,
  peakOil: number,
  peakGas: number,
  peakYear: number
): ProductionRecord[] {
  const records: ProductionRecord[] = [];
  const endYear = 2025;

  for (let year = startYear; year <= endYear; year++) {
    const yearsSincePeak = year - peakYear;
    const declineFactor =
      yearsSincePeak <= 0
        ? Math.max(0.1, 1 - Math.pow((peakYear - year) / (peakYear - startYear + 1), 1.5))
        : Math.max(0.05, Math.exp(-0.08 * yearsSincePeak));

    records.push({
      fieldId,
      year,
      oilMillionSm3: Math.round(peakOil * declineFactor * 100) / 100,
      gasMillionSm3: Math.round(peakGas * declineFactor * 100) / 100,
    });
  }
  return records;
}

export const productionData: ProductionRecord[] = [
  ...generateProduction("troll", 1995, 2.5, 28.0, 2005),
  ...generateProduction("ekofisk", 1971, 12.0, 5.5, 1978),
  ...generateProduction("johan-sverdrup", 2019, 22.0, 1.2, 2024),
  ...generateProduction("ormen-lange", 2007, 0.3, 21.0, 2012),
  ...generateProduction("snorre", 1992, 8.5, 2.8, 2001),
  ...generateProduction("gullfaks", 1986, 13.0, 3.5, 1994),
  ...generateProduction("oseberg", 1988, 11.0, 4.0, 1996),
  ...generateProduction("asgard", 1999, 6.5, 12.0, 2005),
  ...generateProduction("statfjord", 1979, 15.0, 3.0, 1988),
  ...generateProduction("valhall", 1982, 5.5, 2.0, 1998),
  ...generateProduction("frigg", 1977, 0.5, 14.0, 1980),
  ...generateProduction("martin-linge", 2021, 3.0, 2.5, 2025),
];
