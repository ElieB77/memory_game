import styles from "./styles.module.scss";

interface InputProps {
  placeholder?: string;
  onChange?: any;
}

const Input = ({ placeholder, onChange }: InputProps) => {
  return (
    <div className={styles.__input}>
      <input type="text" placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Input;
