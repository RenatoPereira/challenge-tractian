import { NavLink } from "react-router";

import LogoImage from "~/assets/images/logo.svg";
import s from "./header.module.scss";
import { Nav } from "~/components/nav";
import type { Company } from "~/libs/types/companies.type";
import { Suspense } from "react";
import { Loading } from "~/components/loading";

type Props = {
  promise: Promise<Company[]>;
};

export const Header = ({ promise }: Props) => {
  return (
    <header className={s.header}>
      <NavLink to="/">
        <img src={LogoImage} alt="Logo Tractian" />
      </NavLink>

      <Suspense fallback={<Loading />}>
        <Nav promise={promise} />
      </Suspense>
    </header>
  );
};
