import React, { useState, useEffect } from "react";
import "./App.css";

export default function StopWatch() {
  const formatNowToTime = () => {
    const [, time] = new Date().toLocaleString("en-US").split(", ");
    return time;
  };
  const [timer, setTimer] = useState(0);
  const [time, setTime] = useState(formatNowToTime());
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTimer(timer + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timer]);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const currentTime = formatNowToTime();
      setTime(currentTime);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  const hours = Math.floor(timer / 360000);
  const minutes = Math.floor((timer % 360000) / 6000);
  const seconds = Math.floor((timer % 6000) / 100);
  const milliseconds = timer % 100;

  return (
    <div className="stopwatch-container">
      <div className="time">
        <p>Time - &nbsp;</p>
        <p>{time}</p>
      </div>

      <div className="time">
        <p>StopWatch - &nbsp;</p>
        <p>
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
      </div>
      <div className="stopwatch-buttons">
        <button
          className="stopwatch-button"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="stopwatch-button" onClick={() => setTimer(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}
