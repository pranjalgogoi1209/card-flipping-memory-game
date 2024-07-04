import React from "react";
import styles from "./startGame.module.css";
import { FaPlay } from "react-icons/fa";

export default function StartGame({ setIsGameStarted }) {
  return (
    <div className={`flex-row-center ${styles.StartGame}`}>
      <div className={`flex-col-center ${styles.mainContainer}`}>
        <p>Time: 1 minute 30 seconds</p>
        <button
          onClick={() => setIsGameStarted(true)}
          className={`btn flex-row-center ${styles.playBtn}`}
        >
          <FaPlay /> PLAY
        </button>
      </div>
    </div>
  );
}
