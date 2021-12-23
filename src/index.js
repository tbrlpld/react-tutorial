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

function Board() {
    const [fields, setFields] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

    function getPlayerLabel() {
        return xIsNext ? "X" : "O"
    }

    function handleSquareClick(i) {
        // The slice is necessary because the array is mutable.
        const newfields = fields.slice()
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

    const status = `Next player: ${ getPlayerLabel() }`

    return (
      <div>
        <div className="status">{status}</div>
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
