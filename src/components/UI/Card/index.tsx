import styles from "./styles.module.scss";

interface CardProps {
  frontImg?: string;
  backImg?: string;
  onClick?: any;
  className?: any;
}

const Card = ({ frontImg, backImg, onClick, className }: CardProps) => {
  return (
    <div className={`${styles.__card} ${className}`} onClick={onClick}>
      <>
        <div className={styles.__front}>
          <img src={frontImg} alt="logo" />
        </div>
        <div className={styles.__back}>
          <img src={backImg} alt="character" />
        </div>
      </>
    </div>
  );
};

export default Card;
