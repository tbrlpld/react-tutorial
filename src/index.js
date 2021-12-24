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
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
        xIsNext: true,
    }])

    const current = history[history.length - 1]
    const winner = computeWinner(current.squares)
    const playerLabel = current.xIsNext ? "X" : "O"

    let status = undefined
    if (winner) {
        status = `Winner: ${ winner }`
    } else if (current.squares.indexOf(null) === -1) {
        status = "Draw"
    } else {
        status = `Next player: ${ playerLabel }`
    }

    function handleSquareClick(i) {
        // The slice is necessary because the array is mutable.
        const newSquares = current.squares.slice()

        if (newSquares[i] != null || winner != null) {
            return;
        }

        newSquares[i] = playerLabel
        const newHistory = [
            ...history,
            {
                squares: newSquares,
                xIsNext: !current.xIsNext,
            },
        ]
        setHistory(newHistory)
    }

    function handleTravelClick(historyIndex) {
        const newHistory = history.slice(0, historyIndex + 1)
        setHistory(newHistory)
    }

    const travelButtons = history.map((value, index) => {
        return <li key={ value.squares }><button onClick={ () => handleTravelClick(index) }>Go to #{ index }</button></li>
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={ current.squares } onSquareClick={ handleSquareClick }/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ travelButtons }</ol>
        </div>
      </div>
    );
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
