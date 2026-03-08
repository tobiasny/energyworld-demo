export interface Field {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: "producing" | "shut down" | "under development";
  operator: string;
}

export interface ProductionRecord {
  fieldId: string;
  year: number;
  oilMillionSm3: number;
  gasMillionSm3: number;
}
