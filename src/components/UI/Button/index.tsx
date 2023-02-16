import styles from "./styles.module.scss";

interface ButtonProps {
  content?: string;
}

const Button = ({ content }: ButtonProps) => {
  return (
    <div className={styles.__button}>
      <button>{content}</button>
    </div>
  );
};

export default Button;
