import React, { Component } from 'react';
import Relay from 'react-relay';
import { Stage } from 'react-konva';
import { Board, Squares } from '../components/Game';

class TicTacToe extends Component {

  constructor(props) {
    super(props);
    // Array of winning lines
    this.winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    this.state = {
        rows: 3,
        gameState: new Array(9).fill(false),
        ownMark: 'X',
        oppMark: 'O',
        gameOver: false,
        yourTurn: true,
        winner: false
    };
  }

  componentWillMount() {
    this.resizeBoard();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeBoard);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeBoard);
  }

  resizeBoard = () => {
    /* Initialize board variables */
    // Size of board is 80% of window width or height (whichever is smaller)
    let size = Math.floor(Math.min(window.innerWidth, window.innerHeight) * .8);
    // Get rows from state
    let rows = this.state.rows;
    // Determine unit from size and rows
    let unit = size / rows;
    // Generate array of coordinates for squares
    let coords = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < rows; x++) {
        coords.push([x * unit, y * unit]);
      }
    }
    // Set state based on new variables
    this.setState({ size, rows, unit, coords });
  }

  move = (marker, i) => {
    this.setState((prevState, props) => {
      let { gameState, yourTurn, gameOver, winner } = prevState;
      // Insert player's marker
      gameState.splice(i, 1, marker)
      // Change turn
      yourTurn = !yourTurn;
      // Check for winner
      let foundWin = this.winCheck(gameState);
      if (foundWin) winner = gameState[foundWin[0]];
      // Check for end of game
      if (foundWin || !gameState.includes(false)) gameOver = true;
      // If game isn't over, make AI move with brief delay
      if (!yourTurn && !gameOver) setTimeout(() => this.aiMove(gameState), 500);
      // Return new state
      return {
        gameState,
        yourTurn,
        gameOver,
        winner,
        win: foundWin || false
      }
    });
  }

  aiMove = () => {
    // Find all open squares
    let openSquares = [];
    this.state.gameState.forEach((square, i) => { if (!square) openSquares.push(i) });
    // Random AI move
    let randomAiMove = openSquares[this.random(0, openSquares.length)]
    this.move(this.state.oppMark, randomAiMove);
  }

  // Generate random number within range
  random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Check for winner
  winCheck = (gameState) => {
    return this.winLines.find(line => {
      let [a, b, c] = line;
      return (gameState[a]
        && gameState[a] === gameState[b]
        && gameState[a] === gameState[c])
    });
  }

  turingTest = () => {

  }

  recordGame = () => {

  }

  render() {
    let { unit, size, rows, coords, gameState, win, gameOver, yourTurn, ownMark } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        <Stage
          width={size}
          height={size}
          style={{display: 'inline-block', textAlign: 'left', marginTop: '5vh'}}
        >
          <Board
            size={size}
            rows={rows}
            unit={unit}
          />
          <Squares
            unit={unit}
            coords={coords}
            gameState={gameState}
            win={win}
            gameOver={gameOver}
            yourTurn={yourTurn}
            ownMark={ownMark}
            move={this.move}
          />
        </Stage>
      </div>
    )
  }
};

export default Relay.createContainer(
  TicTacToe, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
          }
        }
      `
    }
  }
);
