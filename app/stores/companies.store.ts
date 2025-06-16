import { create } from "zustand";
import type { Company } from "~/libs/types/companies.type";

interface CompaniesState {
  companies: Company[];
  setCompanies: (companies: Company[]) => void;
  getCompany: (id: string) => Company | undefined;
}

export const useCompaniestore = create<CompaniesState>()((set, get) => ({
  companies: [],
  setCompanies: (companies) => set((state) => ({ companies })),
  getCompany: (id) => get().companies.find((company) => company.id === id),
}));
