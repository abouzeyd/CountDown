import React, { useState, useEffect, useRef } from "react";
import Blink from "react-blink-text";
// https://stackoverflow.com/questions/40885923/countdown-timer-in-react?answertab=votes#tab-top
const blink = (
  <Blink color="red" fontSize="20" text="you are 10 seconde of the end!" />
);
const STATUS = {
  STARTED: "",
  TWENTY_SECONDS: "you are 20 seconds from the end",
  STOP: "stop",
  BLINKING_TEXT: blink,
  TIME_UP: "Time's up!",
  HIGHT_TIME: "this time is not valid",
  NEGATIVE_TIME: "time not approved",
  HALF_THE_TIME: "More than halfway there !",
};

const INITIAL_COUNT = 0;

export default function CountdownApp() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOP);
  const [half, setHalf] = useState(0);
  const isRan =
    status === STATUS.STARTED ||
    status === STATUS.TWENTY_SECONDS ||
    status === STATUS.BLINKING_TEXT ||
    status === STATUS.TIME_UP ||
    status === STATUS.HALF_THE_TIME
      ? 1000
      : null;

  const secondsToDisplay = secondsRemaining % 60;
  const minutesToDisplay = (secondsRemaining - secondsToDisplay) / 60;

  console.log(secondsRemaining);

  const handleChange = (e) => {
    setSecondsRemaining(e.target.value * 60);
    const convertToSeconds = e.target.value / 2;
    setHalf(convertToSeconds * 60);
  };

  const handleStart = () => {
    setStatus(STATUS.STARTED);
  };
  const handleStop = () => {
    setStatus(STATUS.STOP);
  };

  const countDown = () => {
    if (secondsRemaining > 0) {
      setSecondsRemaining(secondsRemaining - 1);
    }
    if (minutesToDisplay === 0 && secondsToDisplay === 20) {
      setStatus(STATUS.TWENTY_SECONDS);
    } else if (minutesToDisplay === 0 && secondsToDisplay === 10) {
      setStatus(STATUS.BLINKING_TEXT);
    } else if (minutesToDisplay === 0 && secondsToDisplay === 0) {
      setStatus(STATUS.TIME_UP);
    } else if (secondsRemaining < 0) {
      setStatus(STATUS.NEGATIVE_TIME);
    } else if (half === secondsRemaining) {
      setStatus(STATUS.HALF_THE_TIME);
      // }
    }
  };
  // passing null stops the interval
  useInterval(() => {
    countDown();
  }, isRan);

  return (
    <div className="App">
      <div style={{ textAlign: "center", padding: 20 }}>
        <label>Countdown:</label>{" "}
        <input
          type="text"
          placeholder={"(Min)"}
          onChange={handleChange}
          style={{ padding: 5 }}
        />
        <button
          onClick={handleStart}
          type="button"
          style={{
            color: "white",
            backgroundColor: "green",
            marginLeft: 10,
            padding: 5,
          }}
        >
          START
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            color: `${
              status === STATUS.TWENTY_SECONDS
                ? "red"
                : "black" || (status === STATUS.BLINKING_TEXT ? "red" : "")
            }`,
          }}
        >
          {status}
        </span>
      </div>

      <div
        style={{
          fontSize: 50,
          textAlign: "center",
          padding: 20,
          display: "flex",

          justifyContent: "center",
        }}
      >
        {twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
        <div style={{ marginLeft: 12, alignItems: "center", display: "flex" }}>
          <button onClick={handleStop} type="button">
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, "0");
