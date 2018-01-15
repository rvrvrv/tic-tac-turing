import React, { Component } from 'react';
import { Stage } from 'react-konva';

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
    let size = Math.floor(Math.min(window.innerWidth, window.innerHeight) * 0.75);
    // Get rows from state
    let rows = this.state.rows;
    // Determine unit from size and rows
    let unit = size / rows;
    // Set state
    this.setState({ size, rows, unit });
  }

  move = () => {

  }

  aiMove = () => {

  }

  turingTest = () => {

  }

  recordGame = () => {

  }

  render() {
    return (
      <div>
        <Stage
          width={this.state.size}
          height={this.state.size}
        >
          {/* <Board /> */}
          {/* <Squares /> */}
        </Stage>
      </div>
    )
  }
};
