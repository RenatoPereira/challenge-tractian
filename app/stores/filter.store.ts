import { create } from "zustand";
import type { AssetSensorType } from "~/libs/types/companies.type";

interface FilterState {
  filter: AssetSensorType | null;
  filterBy: (by: AssetSensorType | null) => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
  filter: null,
  filterBy: (by) => set((state) => ({ filter: by })),
}));
