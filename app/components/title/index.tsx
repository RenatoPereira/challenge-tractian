import s from "./title.module.scss";

type Props = {
  children: React.ReactNode;
};

export const Title = ({ children }: Props) => {
  return <h2 className={s.title}>{children}</h2>;
};
