import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    return (
        <button className="square" onClick={ props.onClick }>
            { props.value }
        </button>
    );
}

function computeWinner (squares) {
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let line of winningLines) {
        const [a, b, c] = line
        if (
            squares[a] != null
            && squares[a] === squares[b]
            && squares[a] === squares[c]
        ){
            return squares[a]
        }
    }
    return null
}

function Board(props) {

    function renderSquare(i) {
        return (
            <Square
                value={ props.squares[i] }
                onClick={ () => props.onSquareClick(i) }
            />
        )
    }

    return (
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    );
}

function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const current = history[history.length - 1]
    console.log(current)
    const [xIsNext, setXIsNext] = useState(true)
    const winner = computeWinner(current)

    function getPlayerLabel() {
        return xIsNext ? "X" : "O"
    }

    function getStatus() {
        if (winner != null) {
            return `Winner: ${ winner }`
        }
        return `Next player: ${ getPlayerLabel() }`
    }

    function handleSquareClick(i) {
        // The slice is necessary because the array is mutable.
        const newSquares = current.slice()

        if (newSquares[i] != null || winner != null) {
            return;
        }

        newSquares[i] = getPlayerLabel()
        const newHistory = [...history, newSquares]
        setHistory(newHistory)
        setXIsNext(!xIsNext)
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={ current } onSquareClick={ handleSquareClick }/>
        </div>
        <div className="game-info">
          <div>{ getStatus() }</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
