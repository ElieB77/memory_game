import Button from "../../UI/Button";
import Input from "../../UI/Input";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { rendering } from "../../../features/render/renderSlice";
import { storeUsername } from "../../../features/user/userSlice";
import { useState } from "react";
import { setGameStatus } from "../../../features/session/sessionSlice";

const Home = () => {
  const [name, setName] = useState<string>();
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
        onChange={(e: any) => setName(e.target.value)}
      />
      <Button content="PLAY" onClick={handleClick} />
    </div>
  );
};

export default Home;
