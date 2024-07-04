import React, { useEffect, useState } from "react";
import styles from "./cards.module.css";
import cardFront from "./../../../assets/homePage/cards/avengers.png";

export default function Cards({ cards, setCards, setScore }) {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [isClickable, setIsClickable] = useState(true);

  // handle choice
  const handleChoice = card => {
    console.log(card);
    if (isClickable) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setIsClickable(false);
      console.log("clickable => false");
      if (choiceOne.name === choiceTwo.name) {
        console.log("cards match");

        // score increase by 1
        setScore(prev => prev + 1);

        setCards(prevCards => {
          return prevCards.map(card => {
            // it will work for both the cards, bcz src is same of choiceOne and choiceTwo
            if (card.name === choiceOne.name) {
              console.log("card is updated");
              const updatedCard = { ...card, isMatched: true };
              console.log(cards);
              return updatedCard;
            } else {
              return card;
            }
          });
        });
      } else {
        console.log("cards not match");
      }

      // reset choices after 500 ms
      setTimeout(() => {
        resetChoices();
      }, 500);
    }
  }, [choiceOne, choiceTwo]);

  // reset choices
  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setIsClickable(true);
    console.log("clickable => true");
  };

  return (
    <div className={styles.Cards}>
      {cards &&
        cards.map(card => (
          <div key={card.id} className={styles.cardContainer}>
            <div
              className={`${styles.imgContainer} ${
                card === choiceOne ||
                card === choiceTwo ||
                card.isMatched === true
                  ? styles.flipped
                  : ""
              }`}
            >
              <img
                src={cardFront}
                alt="cardFront"
                className={styles.cardFront}
                onClick={() => handleChoice(card)}
              />
              <img src={card.src} alt="card" className={styles.cardBack} />
            </div>
          </div>
        ))}
    </div>
  );
}
