import { NavLink } from "react-router";

import s from "./button-link.module.scss";

type Props = {
  to: string;
  children: React.ReactNode;
};

export const ButtonLink = ({ to, children }: Props) => {
  return (
    <NavLink className={s.link} to={to}>
      {children}
    </NavLink>
  );
};
