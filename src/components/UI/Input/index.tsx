import styles from "./styles.module.scss";

const Input = () => {
  return (
    <div className={styles.__input}>
      <input type="text" placeholder="Entrez votre nom" />
    </div>
  );
};

export default Input;
