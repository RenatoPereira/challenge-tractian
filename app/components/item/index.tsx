import s from "./item.module.scss";

type Props = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export const Item = ({ title, description, icon }: Props) => {
  return (
    <div className={s.container}>
      <h4 className={s.title}>{title}</h4>
      <p className={s.description}>
        {icon ? <span className={s.icon}>{icon}</span> : null}
        {description}
      </p>
    </div>
  );
};
