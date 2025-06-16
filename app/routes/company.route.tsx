import { Suspense } from "react";
import type { Route } from "./+types/company.route";
import { CompanyScreen } from "~/screens/company";
import { CompaniesApi } from "~/libs/apis/companies.api";
import { Loading } from "~/components/loading";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Company" },
    { name: "description", content: "Challenge - Tractian" },
  ];
}

type Props = {
  params: {
    id: string;
  };
};

export default function Company({ params: { id } }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <CompanyScreen companyId={id} promise={CompaniesApi.getAssets(id)} />
    </Suspense>
  );
}
