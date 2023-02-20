import styles from "./styles.module.scss";
import Button from "../../UI/Button";
import ProgressBar from "../../UI/ProgressBar";
import SuccessModal from "../../Popup/SuccessModal";
import FailModal from "../../Popup/FailModal";
import type { RootState } from "../../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { rendering } from "../../../redux/render/renderSlice";
import { useEffect, useState } from "react";
import {
  setGameStatus,
  setIsTimeUp,
} from "../../../redux/session/sessionSlice";
import Images from "../../../assets/MarioImages";
import MarioLogo from "../../../assets/images/super-mario/super-mario-logo.png";

const Game = () => {
  const { userName, isTimeUp, status, score, bestScore } = useSelector(
    (state: RootState) => ({
      userName: state.user.userName,
      isTimeUp: state.session.isTimeUp,
      chrono: state.session.chrono,
      status: state.session.status,
      score: state.session.score,
      bestScore: state.session.bestScore,
    })
  );
  const [cards, setCards] = useState<any[]>([...Images, ...Images]);
  const [activeCards, setActiveCards] = useState<any>({ images: [] });
  const [flippedCards, setFlippedCards] = useState<any>([]);
  const [pairs, setPairs] = useState<any>([]);
  const [firstChoice, setFirstChoice] = useState<any>();
  const [showFailModal, setShowFailModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTimeUp && status !== "win") setShowFailModal(true);
  }, [isTimeUp]);

  const handleClick = (index: number, image: string) => {
    setFlippedCards([...flippedCards, index]);

    if (activeCards.images.length === 0) {
      setActiveCards((prevState: { images: any[] }) => ({
        ...prevState,
        images: [{ image, index }],
      }));
      setFirstChoice(index);
    } else if (
      activeCards.images.length === 1 &&
      activeCards.images[0].image === cards[index] &&
      index !== firstChoice
    ) {
      setPairs([...pairs, index, firstChoice]);
      setActiveCards({ images: [] });
    } else {
      setActiveCards({ images: [] });
    }
  };

  useEffect(() => {
    if (status === "on") {
      const shuffledImages = cards.sort(() => 0.5 - Math.random());
      setCards(
        shuffledImages.map((image: string) => {
          return image;
        })
      );
    }
  }, [status]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
    if (pairs.length === 16) {
      dispatch(setGameStatus("win"));
      setShowSuccessModal(true);
    }
  }, [flippedCards, score]);

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
            setActiveCards({ images: [] });
            setPairs([]);
            setFlippedCards([]);
          }}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          content={`Vous avez gagné ! Score: ${score !== 0 ? score : "..."} `}
          firstBtnContent="Quitter"
          secondBtnContent="Rejouer"
          firstBtnOnCLick={() => {
            setShowSuccessModal(false);
            dispatch(rendering("home"));
          }}
          secondBtnOnClick={() => {
            setShowSuccessModal(false);
            dispatch(setGameStatus("on"));
            setActiveCards({ images: [] });
            setPairs([]);
            setFlippedCards([]);
          }}
        />
      )}

      <div className={styles.__game}>
        <div className={styles.__head}>
          <h3>
            <span>Joueur:</span> {userName}
          </h3>
          {bestScore !== 0 && (
            <>
              <p>|</p>
              <h3>
                <span>Meilleur score:</span> {bestScore}
              </h3>
            </>
          )}
        </div>
        <div className={styles.__cards_container}>
          {cards.map((image: string, index: number) => {
            return (
              <div
                key={index}
                className={`${styles.__card} ${
                  flippedCards && flippedCards.includes(index)
                    ? styles.__flip
                    : ""
                }  ${flippedCards.length === 2 ? styles.__disabled : ""} ${
                  pairs.includes(index) && status !== "win" && status !== "off"
                    ? styles.__succesful_pair
                    : ""
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
