import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  //Implemented random number generator
  const generateRandomNumber = () => {
    return Math.round(Math.random() * 1000);
  };

  const [number, setNumber] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [testNumber, setTestNumber] = useState(generateRandomNumber());
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [guessCount, setGuessCount] = useState(0);

  const reset = () => {
    setTestNumber(generateRandomNumber());
    setCorrect(false);
    setNumber(0);
    setGuessCount(0);
    setUsedNumbers([]);
  };

  //Compare user input and testNumber
  const compare = (num, testNum) => {
    return num == testNum;
  };

  //Increase guesscount + 1
  const increment = () => {
    setGuessCount(guessCount + 1);
  };

  //Implemented useEffect to ensure page rerenders after successful game.
  useEffect(() => {
    setTimeout(() => {
      if (correct) {
        reset();
      }
    }, 3000);
  }, [correct]);

  const onClick = () => {
    if (compare(number, testNumber)) {
      increment();
      setCorrect(true);
    } else {
      console.log(testNumber);
      increment();
      setUsedNumbers([...usedNumbers, number]);
    }
  };

  const listNumbers = usedNumbers.map((element) => {
    return <div>{element}</div>;
  });

  //This method will reset the state
  const newGame = () => {
    reset();
  };

  return (
    <div className="App">
      <h1>Guess a magic number</h1>
      <h3>Enter a number between 1-1000 </h3>
      <div>
        <input
          value={number}
          type="number"
          onChange={(event) => setNumber(event.target.value)}
        />
      </div>
      <button className="button" onClick={() => onClick()}>
        Guess?
      </button>
      <button className="button" onClick={() => newGame()}>
        Reset
      </button>
      <div>
        <div>You have guessed {guessCount} times.</div>
      </div>
      {correct ? (
        <div>You win! The game will restart in a few moments. </div>
      ) : (
        <div>You lose -_- </div>
      )}
      {!correct ? <div>Used Numbers :{listNumbers}</div> : null}
    </div>
  );
}
