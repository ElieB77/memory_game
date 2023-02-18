import styles from "./styles.module.scss";
import PlayIcon from "../../../assets/images/play-icon.svg";

interface ButtonProps {
  content?: string;
  onClick?: any;
  small?: boolean;
}

const Button = ({ content, onClick, small }: ButtonProps) => {
  return (
    <div className={`${styles.__button} ${small ? styles.__small : ""}`}>
      <button onClick={onClick}>
        <img src={PlayIcon} alt="play icon" />
        {content}
      </button>
    </div>
  );
};

export default Button;
