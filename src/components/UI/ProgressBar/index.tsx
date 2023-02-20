import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import {
  setGameStatus,
  setIsTimeUp,
  setScore,
} from "../../../redux/session/sessionSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";

interface ProgressBarState {
  timeRemaining: number;
  score: number;
}

const ProgressBar = () => {
  const { chrono, status } = useSelector((state: RootState) => ({
    chrono: state.session.chrono,
    status: state.session.status,
  }));
  const dispatch = useDispatch();
  const [{ timeRemaining, score }, setProgressBarState] =
    useState<ProgressBarState>({ timeRemaining: chrono, score: 0 });

  useEffect(() => {
    if (status === "win") {
      setProgressBarState((prevState) => ({
        ...prevState,
        score: timeRemaining,
      }));
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
      setProgressBarState((prevState) => ({
        ...prevState,
        timeRemaining: prevState.timeRemaining - 1,
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemaining]);

  useEffect(() => {
    setProgressBarState((prevState) => ({
      ...prevState,
      timeRemaining: chrono,
    }));
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
