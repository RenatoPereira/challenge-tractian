import { create } from "zustand";
import type { Asset } from "~/libs/types/companies.type";

interface AssetState {
  asset: Asset | null;
  setAsset: (item: Asset | null) => void;
}

export const useAssetStore = create<AssetState>()((set) => ({
  asset: null,
  setAsset: (item) => set((state) => ({ asset: item })),
}));
