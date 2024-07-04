import React, { useEffect, useRef, useState } from "react";

const formatTime = time => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + " " + ":" + " " + seconds;
};

export default function CountDown({ seconds, setSeconds, score }) {
  // const [count, setCount] = useState(seconds);
  const timerId = useRef();

  // start setInterval
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, [seconds]);

  // stop setInterval
  useEffect(() => {
    if (seconds <= 0) {
      clearInterval(timerId.current);
    }
    if (score === 6) {
      clearInterval(timerId.current);
    }
  }, [seconds]);

  return <div>{formatTime(seconds)}</div>;
}
