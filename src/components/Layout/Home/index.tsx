import Button from "../../UI/Button";
import Input from "../../UI/Input";
import styles from "./styles.module.scss";

const Home = () => {
  return (
    <div className={styles.__home}>
      <Input />
      <Button content="PLAY" />
    </div>
  );
};

export default Home;
