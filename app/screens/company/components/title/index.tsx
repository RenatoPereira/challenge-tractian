"use client";

import { useCompaniestore } from "~/stores/companies.store";

import s from "./title.module.scss";
import { useState, useEffect } from "react";

type Props = {
  companyId: string;
};

export const CompanyTitle = ({ companyId }: Props) => {
  const [isClient, setIsClient] = useState(false);

  const getCompany = useCompaniestore((store) => store.getCompany);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <span></span>;

  return (
    <div className={s.title}>
      <h2>Ativos</h2>
      {getCompany(companyId) ? (
        <>
          <span>/</span>
          <p>{getCompany(companyId)?.name}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
