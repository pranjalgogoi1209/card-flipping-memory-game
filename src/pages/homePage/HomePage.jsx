import React, { useEffect, useState } from "react";
import styles from "./homePage.module.css";
import { cardBackArr } from "../../data/homePage/cardBack";
import CountDown from "../../components/homePage/countDown/CountDown";
import Cards from "../../components/homePage/cards/Cards";
import StartGame from "../../components/startGameModal/StartGame";
import GameResult from "../../components/gameResultModal/GameResult";

export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [seconds, setSeconds] = useState(90);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameNo, setGameNo] = useState(0);

  // shuffle cards at the time of newgame
  const shuffleCards = () => {
    console.log("Starting a New Game");
    const shuffledCards = [...cardBackArr, ...cardBackArr]
      .sort(
        // Math.random() - 0.5 sometimes give positive and sometimes give negative no.
        // negative => same order, positive => reverse order
        () => Math.random() - 0.5
      )
      .map(card => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    cards && console.log(cards);

    // restart timing
    setSeconds(90);

    // restart score
    setScore(0);
  };

  // this homePage function is rendering in every second because of countDown, that'swhy write anything you want inside this useEffect
  useEffect(() => {
    setShowResult(false);
    shuffleCards();
  }, [isGameStarted, gameNo]);

  useEffect(() => {
    if (score === 6 || seconds === 0) {
      setTimeout(() => {
        setShowResult(true);
      }, 1000);
    }
  }, [seconds, score]);

  return (
    <div className={`flex-col-center ${styles.HomePage}`}>
      <div className={`flex-row-center ${styles.header}`}>
        <h2>Score : {score}</h2>

        {isGameStarted && (
          <h2 className="flex-row-center">
            <CountDown
              seconds={seconds}
              setSeconds={setSeconds}
              score={score}
            />
          </h2>
        )}

        {showResult && (
          <GameResult
            score={score}
            seconds={seconds}
            setIsGameStarted={setIsGameStarted}
            setGameNo={setGameNo}
            setShowResult={setShowResult}
            shuffleCards={shuffleCards}
          />
        )}

        <button className="btn" onClick={shuffleCards}>
          New Game
        </button>
      </div>

      <div className={styles.cardsContainer}>
        <Cards cards={cards} setCards={setCards} setScore={setScore} />
      </div>

      {!isGameStarted && gameNo === 0 && (
        <StartGame setIsGameStarted={setIsGameStarted} />
      )}
    </div>
  );
}
