import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  setGameStatus,
  setIsTimeUp,
  setScore,
} from "../../../features/session/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const ProgressBar = () => {
  const chrono = useSelector((state: RootState) => state.session.chrono);
  const status = useSelector((state: RootState) => state.session.status);
  const [timeRemaining, setTimeRemaining] = useState<number>(chrono);
  const [score, setScoreState] = useState<any>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "win") {
      setScoreState(timeRemaining);
      dispatch(setScore(score));
    }
  }, [status]);

  useEffect(() => {
    if (timeRemaining === 0) {
      if (status !== "win") {
        dispatch(setIsTimeUp(true));
      }
      dispatch(setGameStatus("off"));
      return;
    }

    const timer = setTimeout(() => {
      setTimeRemaining((timeRemaining) => timeRemaining - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  useEffect(() => {
    setTimeRemaining(chrono);
  }, [chrono, status]);

  const progressPercentage = ((chrono - timeRemaining) / chrono) * 100;

  return (
    <div className={styles.__progress_bar}>
      <div
        className={styles.__stamp}
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
