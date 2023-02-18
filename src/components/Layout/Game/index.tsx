import Button from "../../UI/Button";
import Card from "../../UI/Card";
import ProgressBar from "../../UI/ProgressBar";
import styles from "./styles.module.scss";
import type { RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { rendering } from "../../../features/render/renderSlice";
import Images from "../../../assets/MarioImages";

import MarioLogo from "../../../assets/images/super-mario/super-mario-logo.png";
import { useEffect, useRef, useState } from "react";
import FailModal from "../../Popup/FailModal";
import {
  setGameStatus,
  setIsTimeUp,
} from "../../../features/session/sessionSlice";
import SuccessModal from "../../Popup/SuccessModal";

const Game = () => {
  const userName = useSelector((state: RootState) => state.user.userName);
  const isTimeUp = useSelector((state: RootState) => state.session.isTimeUp);
  const chrono = useSelector((state: RootState) => state.session.chrono);
  const status = useSelector((state: RootState) => state.session.status);
  const score = useSelector((state: RootState) => state.session.score);
  const bestScore = useSelector((state: RootState) => state.session.bestScore);
  const [cards, setCards] = useState<any>([...Images, ...Images]);
  const [active, setActive] = useState<any>({ images: [] });
  const [flippedIndex, setFlippedIndex] = useState<any>([]);
  const [pairs, setPairs] = useState<any>([]);
  const [firstChoice, setFirstChoice] = useState<any>();
  const [showFailModal, setShowFailModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTimeUp && status !== "win") setShowFailModal(true);
  }, [isTimeUp]);

  const handleClick = (index: number, image: string) => {
    setFlippedIndex([...flippedIndex, index]);
    if (flippedIndex.length === 2) {
      setFlippedIndex([]);
    }

    if (active.images.length === 0) {
      setActive((prevState: { images: any[] }) => ({
        ...prevState,
        images: [{ image, index }],
      }));
      setFirstChoice(index);
    } else if (
      active.images.length === 1 &&
      active.images[0].image === cards[index]
    ) {
      if (index !== firstChoice) {
        setPairs([...pairs, index, firstChoice]);
        setActive({ images: [] });
      }
    } else {
      setActive({ images: [] });
    }
  };

  useEffect(() => {
    const shuffledImages = cards.sort(() => 0.5 - Math.random());

    setCards(
      shuffledImages.map((image: string) => {
        return image;
      })
    );
  }, []);

  useEffect(() => {
    if (flippedIndex.length === 2) {
      setTimeout(() => {
        setFlippedIndex([]);
      }, 1000);
    }
    if (pairs.length === 16) {
      dispatch(setGameStatus("win"));
      setShowSuccessModal(true);
    }
  }, [flippedIndex, score]);

  return (
    <>
      {showFailModal && (
        <FailModal
          content="Le temps est ecoulé.."
          firstBtnContent="Quitter"
          secondBtnContent="Rejouer"
          firstBtnOnCLick={() => {
            setShowFailModal(false);
            dispatch(rendering("home"));
            dispatch(setIsTimeUp(false));
          }}
          secondBtnOnClick={() => {
            setShowFailModal(false);
            dispatch(setGameStatus("on"));
            dispatch(setIsTimeUp(false));
            setActive({ images: [] });
            setPairs([]);
            setFlippedIndex([]);
          }}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          content={`Vous avez gagné ! Votre score est de ${score} `}
          firstBtnContent="Quitter"
          secondBtnContent="Rejouer"
          firstBtnOnCLick={() => {
            setShowSuccessModal(false);
            dispatch(rendering("home"));
          }}
          secondBtnOnClick={() => {
            setShowSuccessModal(false);
            dispatch(setGameStatus("on"));
            setActive({ images: [] });
            setPairs([]);
            setFlippedIndex([]);
          }}
        />
      )}

      <div className={styles.__game}>
        <h1>
          {userName}
          {bestScore !== 0 && <h6>Meilleur score: {bestScore}</h6>}
        </h1>
        <div className={styles.__cards_container}>
          {cards.map((image: string, index: number) => {
            return (
              <div
                key={index}
                className={`${styles.__card} ${
                  flippedIndex && flippedIndex.includes(index)
                    ? styles.__flip
                    : ""
                }  ${flippedIndex.length === 2 ? styles.__disabled : ""} ${
                  pairs.includes(index) ? styles.__succesful_pair : ""
                }  `}
                onClick={() => handleClick(index, image)}
              >
                <>
                  <div className={styles.__front}>
                    <img src={MarioLogo} alt="logo" />
                  </div>
                  <div
                    className={`${styles.__back} ${
                      pairs.includes(index) ? styles.__succesful_pair : ""
                    }`}
                  >
                    <img src={image} alt="character" />
                  </div>
                </>
              </div>
            );
          })}
        </div>
        <div className={styles.__info}>
          <ProgressBar />
          <Button
            content="Quitter la partie"
            onClick={() => {
              dispatch(rendering("home"));
              dispatch(setGameStatus("off"));
            }}
            small
          />
        </div>
      </div>
    </>
  );
};

export default Game;
