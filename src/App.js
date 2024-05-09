import { useEffect, useState } from "react";
import styles from "./App.module.css";

function formatTimer(timer) {
  const seconds = timer % 60;
  const minutes = Math.floor(timer / 60);
  const formattedMinutes = minutes.toString().padStart(1, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

function App() {
  const [timer, setTimer] = useState(0);
  const [isActive, seIsActive] = useState(false);

  function handleStart() {
    seIsActive(true);
  }

  function handleReset() {
    setTimer(0);
    seIsActive(false);
  }

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && interval !== null) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  return (
    <div className={styles.container}>
      <div className={styles.stopwatch}>
        <h1>Stopwatch</h1>
        <div className={styles.time}>Time {formatTimer(timer)} </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleStart}>
            Start
          </button>
          <button className={styles.button} onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
