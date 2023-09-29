import './App.css';
import React, { useState } from "react";
import Confetti from "react-confetti";

export default function App() {
  const [userGuess, setUserGuess] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [userGuesses, setUserGuesses] = useState([]);
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [lowOrHigh, setLowOrHigh] = useState("");
  const [outOfRange, setOutOfRange] = useState("");

  const handleValueChange = (e) => {
    setUserGuess(e.target.value);
  };

  const makeControl = () => {
    if (userGuess === "") {
      setOutOfRange("Please write a number");
      setUserGuess("");
    } else if (userGuess < 1 || userGuess > 100) {
      setOutOfRange("Number is out of range!");
      setUserGuess("");
    } else {
      setOutOfRange(null);
      setUserCount(userCount + 1);
      setUserGuesses([...userGuesses, userGuess]);

      if (randomNumber === Number(userGuess)) {
        setMessage("Congratulations!!");
        setDisabled(true);
        setLowOrHigh("");
      } else {
        setMessage("Oopsie, wrong guess!");
        if (randomNumber < Number(userGuess)) {
          setLowOrHigh("Try a smaller number!");
        }
        if (randomNumber > Number(userGuess)) {
          setLowOrHigh("Try a larger number!");
        }
      }
      if (userCount === 9) {
        setMessage("Game over, you only had 10 tries!");
        setDisabled(true);
        setLowOrHigh("");
      }
    }
  };

  const restartGame = () => {
    setDisabled(false);
    setMessage("");
    setUserGuesses([]);
    setUserCount(0);
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setUserGuess("");
    setLowOrHigh("");
  };

  return (
    <>
      <div className="box">
        <div className="title">
          <h1>Number Guessing Game</h1>
          <h4 className="guess">Guess a number between 1 and 100</h4>
        </div>
        <input disabled={disabled} type="number" value={userGuess} onChange={handleValueChange} className="userInput" />
        {message === "Congratulations!!" && <Confetti />}
        <h4 className="title">{message}</h4>

        <button disabled={disabled} className="makeControl" onClick={makeControl}>
          Try
        </button>
        {disabled && <button className="restartGame" onClick={restartGame}>Restart Game</button>}
        <h4 className="title">{lowOrHigh}</h4>
        <h4 className="title">You tried {userCount} times. </h4>
        {/* <h4 className="title">Random Number: {randomNumber}</h4> */}
        <h4 className="guesses">
          Your guesses:
          {userGuesses?.map((item, index) => {
            return (
              <span key={index}>
                {" "}
                {item},{" "}
              </span>
            );
          })}
        </h4>
        {outOfRange && <h4 className="title">{outOfRange}</h4>}
      </div>
    </>
  );
}
