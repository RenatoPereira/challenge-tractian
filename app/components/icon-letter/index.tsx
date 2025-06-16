import s from "./icon-letter.module.scss";

type Props = {
  word: string;
};

export const IconLetter = ({ word }: Props) => {
  return <span className={s.letter}>{word.substring(0, 1)}</span>;
};
