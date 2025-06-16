import { create } from "zustand";

interface SearchState {
  search: string;
  searchBy: (by: string) => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  search: "",
  searchBy: (by) => set((state) => ({ search: by })),
}));
