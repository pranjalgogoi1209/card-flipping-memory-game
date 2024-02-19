import React, { useEffect, useState } from "react";
import styles from "./cards.module.css";
import cardFront from "./../../../assets/homePage/cards/avengers.jpg";

export default function Cards({ cards, setCards }) {
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // handle choice
  const handleChoice = card => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("cards match");
        setCards(prevCards => {
          return prevCards.map(card => {
            // it will work for both the cards, bcz src is same of choiceOne and choiceTwo
            if (card.src === choiceOne.src) {
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
