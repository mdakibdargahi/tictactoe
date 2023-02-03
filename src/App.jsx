import React, { useState } from 'react';
import Board from './components/Board';
import { calculateWinner } from './Helper';
import './styles/root.scss';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(false);

  const winner = calculateWinner(squares);

  const message =
    winner && winner != 'draw'
      ? `The Winner is ${winner} `
      : winner && winner === 'draw'
      ? `It is a ${winner}`
      : `Next player is ${isNext ? 'X' : 'O'}`;

  const handleSquareClick = clickedPosition => {
    if (squares[clickedPosition] || winner) {
      return;
    }

    setSquares(currentSquare => {
      return currentSquare.map((squareValue, position) => {
        if (clickedPosition === position) {
          return isNext ? 'X' : 'O';
        }
        return squareValue;
      });
    });
    setIsNext(currentSquare => !currentSquare);
  };
  const handleReset = () => {
    return setSquares(Array(9).fill(null));
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <h2>{message}</h2>
      <Board squares={squares} handleSquareClick={handleSquareClick} />
      <br />
      <button type="button" className="reset-btn" onClick={handleReset}>
        Start New Game
      </button>
    </div>
  );
};

export default App;
