import React, { useEffect, useState } from "react";
import styles from "./homePage.module.css";
import { cardBackArr } from "../../data/homePage/cardBack";
import CountDown from "../../components/homePage/countDown/CountDown";
import Cards from "../../components/homePage/cards/Cards";

export default function HomePage() {
  const [cards, setCards] = useState([]);
  const [seconds, setSeconds] = useState(90);
  const [score, setScore] = useState(0);

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
    shuffleCards();
  }, []);

  return (
    <div className={styles.HomePage}>
      <button className="btn" onClick={shuffleCards}>
        New Game
      </button>
      <h2>
        <CountDown seconds={seconds} setSeconds={setSeconds} score={score} />
      </h2>
      <h2>Score : {score}</h2>

      {score === 6 || seconds === 0 ? (
        <div>
          {score === 6 && seconds > 0 ? <h2> You won</h2> : <h2>You loose</h2>}
        </div>
      ) : (
        ""
      )}

      <div>
        <Cards cards={cards} setCards={setCards} setScore={setScore} />
      </div>
    </div>
  );
}
