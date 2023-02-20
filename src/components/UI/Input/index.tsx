import styles from "./styles.module.scss";

interface InputProps {
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ placeholder, onChange }: InputProps) => {
  return (
    <div className={styles.__input}>
      <input type="text" placeholder={placeholder} onChange={onChange} />
    </div>
  );
};

export default Input;
