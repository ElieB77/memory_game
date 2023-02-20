import Button from "../../UI/Button";
import Input from "../../UI/Input";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { rendering } from "../../../redux/render/renderSlice";
import { storeUsername } from "../../../redux/user/userSlice";
import { ChangeEvent, useState } from "react";
import { setGameStatus } from "../../../redux/session/sessionSlice";

const Home = () => {
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(storeUsername(name));
    dispatch(rendering("game"));
    dispatch(setGameStatus("on"));
  };

  return (
    <div className={styles.__home}>
      <Input
        placeholder="Entrez votre nom"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <Button content="PLAY" onClick={handleClick} />
    </div>
  );
};

export default Home;
