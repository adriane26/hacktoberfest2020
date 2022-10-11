import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [ghostIsNext, setGhostisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const player = ghostIsNext ? "g" : "p";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = player;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setGhostisNext(!ghostIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setGhostisNext(step % 2 === 0);
  };

  const playAgain = () => {
    setHistory([Array(9).fill(null)]);
    jumpTo(0);
    renderMoves();
  }

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>Spooky Tic Tac Toe</h1>
      {winner && (<div><h1>{winner} won!</h1> <button className="play-again" onClick={() => playAgain()}>play again</button></div>)}
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {renderMoves()}
        </div>
        {!winner && <h3>{player}'s turn</h3>}
      </div>
    </>
  );
};

export default Game;