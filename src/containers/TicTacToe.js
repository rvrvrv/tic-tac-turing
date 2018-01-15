import React, { Component } from 'react';
import { Stage } from 'react-konva';
import { Board, Squares } from '../styled/TicTacToe';

export default class TicTacToe extends Component {
  state = {
    rows: 3,
    gameState: new Array(9).fill(false),
    ownMark: 'X',
    oppMark: 'O',
    gameOver: false,
    yourTurn: true,
    winner: false
  }

  componentWillMount() {
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
    console.log('Move made:', marker, i);
  }

  aiMove = () => {

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
          style={{display: 'inline-block', textAlign: 'left'}}
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
