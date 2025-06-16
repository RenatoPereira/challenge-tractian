import s from "./loading.module.scss";

export const Loading = () => {
  return (
    <section className={s.container}>
      <p className={s.text}>Loading...</p>
    </section>
  );
};
