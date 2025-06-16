import s from "./button.module.scss";

type Props = {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  disabled?: boolean;
  active?: boolean;
};

export const Button = ({ icon, label, action, disabled, active }: Props) => {
  return (
    <button
      onClick={!active || !disabled ? action : undefined}
      className={`${s.button} ${active ? s.active : ""} ${
        disabled ? s.disabled : ""
      }`}
    >
      <span className={s.icon}>{icon}</span>
      {label}
    </button>
  );
};
