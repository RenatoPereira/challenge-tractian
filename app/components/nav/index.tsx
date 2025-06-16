"use server";

import s from "./nav.module.scss";
import { use, useEffect } from "react";
import type { Company } from "~/libs/types/companies.type";
import { ButtonLink } from "~/components/button-link";
import { AiOutlineGold } from "react-icons/ai";
import { useCompaniestore } from "~/stores/companies.store";

type Props = {
  promise: Promise<Company[]>;
};

export const Nav = ({ promise }: Props) => {
  const companies = use(promise);

  const setCompanies = useCompaniestore((store) => store.setCompanies);

  useEffect(() => {
    setCompanies(companies);
  }, [companies]);

  return (
    <nav className={s.nav}>
      {companies.map((item: Company) => {
        return (
          <ButtonLink key={item.id} to={`/company/${item.id}`}>
            <span className={s.icon}>
              <AiOutlineGold />
            </span>
            {item.name} Unit
          </ButtonLink>
        );
      })}
    </nav>
  );
};
