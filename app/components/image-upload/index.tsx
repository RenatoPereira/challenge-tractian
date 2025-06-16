import { AiOutlineInbox } from "react-icons/ai";
import s from "./image-upload.module.scss";

type Props = {
  image: string;
  alt?: string;
  action: () => void;
};

export const ImageUpload = ({ image, alt, action }: Props) => {
  const handleSubmit = () => {
    action();
  };

  return (
    <div className={s.container}>
      {image ? (
        <figure className={s.figure}>
          <img src={image} alt={alt ?? "Image"} />
        </figure>
      ) : (
        <form className={s.form} onSubmit={handleSubmit}>
          <span className={s.icon}>
            <AiOutlineInbox />
          </span>
          <p className={s.text}>Adicionar imagem do Ativo</p>
          <input type="file" className={s.input} />
        </form>
      )}
    </div>
  );
};
