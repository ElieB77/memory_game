import Button from "../../UI/Button";
import styles from "./styles.module.scss";

interface SuccessModalProps {
  content?: string;
  firstBtnContent?: string;
  secondBtnContent?: string;
  firstBtnOnCLick?: React.MouseEventHandler<HTMLButtonElement>;
  secondBtnOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SuccessModal = ({
  content,
  firstBtnContent,
  secondBtnContent,
  firstBtnOnCLick,
  secondBtnOnClick,
}: SuccessModalProps) => {
  return (
    <div className={styles.__overlay}>
      <div className={styles.__modal}>
        <h1>{content}</h1>
        <div className={styles.__buttons}>
          <Button content={firstBtnContent} small onClick={firstBtnOnCLick} />
          <Button content={secondBtnContent} small onClick={secondBtnOnClick} />
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
