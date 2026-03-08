import { create } from "zustand";
import type { Field, ProductionRecord } from "@/types";
import { fields as initialFields } from "@/data/fields";
import { productionData as initialProduction } from "@/data/production";

interface AppState {
  fields: Field[];
  production: ProductionRecord[];
  selectedFieldId: string | null;
  selectField: (id: string | null) => void;
  updateProduction: (
    fieldId: string,
    year: number,
    oilMillionSm3: number,
    gasMillionSm3: number
  ) => void;
  getFieldProduction: (fieldId: string) => ProductionRecord[];
}

export const useAppStore = create<AppState>((set, get) => ({
  fields: initialFields,
  production: initialProduction,
  selectedFieldId: null,

  selectField: (id) => set({ selectedFieldId: id }),

  updateProduction: (fieldId, year, oilMillionSm3, gasMillionSm3) =>
    set((state) => ({
      production: state.production.map((r) =>
        r.fieldId === fieldId && r.year === year
          ? { ...r, oilMillionSm3, gasMillionSm3 }
          : r
      ),
    })),

  getFieldProduction: (fieldId) =>
    get()
      .production.filter((r) => r.fieldId === fieldId)
      .sort((a, b) => a.year - b.year),
}));
