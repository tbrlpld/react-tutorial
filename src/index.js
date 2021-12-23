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

function Board() {
    const [fields, setFields] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

    const winner = computeWinner(fields)

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
        const newfields = fields.slice()

        if (newfields[i] != null || winner != null) {
            return;
        }

        newfields[i] = getPlayerLabel()
        setFields(newfields)
        setXIsNext(!xIsNext)
    }

    function renderSquare(i) {
        return (
            <Square
                value={ fields[i] }
                onClick={ () => handleSquareClick(i) }
            />
        )
    }


    return (
      <div>
        <div className="status">{ getStatus() }</div>
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
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
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
