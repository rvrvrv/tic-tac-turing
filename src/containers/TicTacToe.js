import React, { Component } from 'react';
import Relay from 'react-relay';
import { GameContainer } from '../styled/TicTacToe';
import Snackbar from 'material-ui/Snackbar';
import { Stage } from 'react-konva';
import { Board, Squares } from '../components/Game';
import TuringTest from '../styled/TuringTest';
import CreateGame from '../mutations/CreateGame';
import AI from 'tic-tac-toe-ai-engine';
let smartAI;

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
      winner: false,
      snackbarOpen: false,
      snackbarMessage: 'Illegal move'
    };
  }

  componentWillMount() {
    this.resizeBoard();
    this.resetAI();
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

  // Reset smartAI variable. 1 = smart (robot), 0 = dumb (random)
  resetAI = () => smartAI = Math.round(Math.random());

  move = (marker, i) => {
    this.setState((prevState, props) => {
      let { gameState, yourTurn, gameOver, winner, snackbarMessage } = prevState;
      // Insert player's marker
      gameState.splice(i, 1, marker)
      // Change turn
      yourTurn = !yourTurn;
      // Check for winner
      let foundWin = this.winCheck(gameState);
      if (foundWin) {
        winner = gameState[foundWin[0]];
        snackbarMessage = `${winner} wins the game!`;
        gameOver = true;
      }
      // Check for tie game
      if (!foundWin && !gameState.includes(false)) {
        snackbarMessage = 'It\'s a tie!';
        gameOver = true;
      }
      // If game isn't over, make AI move with brief delay
      if (!yourTurn && !gameOver) setTimeout(() => this.aiMove(gameState), 500);
      // Return new state
      return {
        gameState,
        yourTurn,
        gameOver,
        winner,
        win: foundWin || false,
        snackbarMessage,
        snackbarOpen: gameOver || false,
      }
    });
  }

  aiMove = () => {
    // If smartAI, use AI to make the best move
    if (smartAI) {
      // Format board for AI engine
      let board = [...this.state.gameState].map(square => !square ? '' : square);
      // Get next move (represented by entire board)
      let nextBoard = AI.computeMove(board).nextBestGameState;
      // Compare board and nextBoard to determine the difference
      let bestSquare;
      for (let i = 0; i < 9; i++) {
        if (board[i] !== nextBoard[i]) bestSquare = i;
      }
      // Execute AI move
      this.move(this.state.oppMark, bestSquare);
    } else {
      // Otherwise, make a random move
      let openSquares = [];
      // Find all open squares
      this.state.gameState.forEach((square, i) => { if (!square) openSquares.push(i) });
      // Choose an open square at random
      let randomSquare = openSquares[Math.floor(Math.random() * openSquares.length)]
      // Execute random move
      this.move(this.state.oppMark, randomSquare);
    }
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

  // Analyze the user's guess and return the result (true = correct, false = wrong)
  analyzeGuess = (guess) => ((smartAI && guess === 'Robot') || (!smartAI && guess === 'Random'));

  // Record the results of the game (from TuringTest component)
  recordGame = (guess) => {
    let { user } = this.props.viewer;
    let { relay } = this.props;
    let { winner, ownMark } = this.state;
    // If authenticated, check result and record game
    if (user) {
      // If user won, store their name (user.id) as winnerId for Relay
      let winnerId = (winner === ownMark) ? user.id : undefined;
      // Determine if robot/random guess is correct
      let guessCorrect = this.analyzeGuess(guess);
      // Mutation
      relay.commitUpdate(
        new CreateGame({
          user,
          winnerId,
          guess,
          guessCorrect
        })
      );
    }
    // Reset the game
    this.setState({
      gameState: new Array(9).fill(false),
      gameOver: false,
      yourTurn: true,
      winner: false,
      win: false
    });
    this.resetAI();
  }

  showSnackbar = (msg) => {
    if (msg !== 'gameOver') this.setState({ snackbarOpen: true, snackbarMessage: msg });
  }

  handleRequestClose = () => {
    this.setState({ snackbarOpen: false });
  }

  render() {
    let { unit, size, rows, coords, gameState, win, gameOver, yourTurn, ownMark } = this.state;
    return (
      <GameContainer>
        <Stage
          width={size}
          height={size}
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
            showSnackbar={this.showSnackbar}
          />
        </Stage>
        <TuringTest
          open={this.state.gameOver}
          recordGame={this.recordGame}
          winner={this.state.winner}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
          onRequestClose={this.handleRequestClose}
          autoHideDuration={this.state.gameOver ? 10000 : 1500}
          contentStyle={{
            fontSize: `${this.state.gameOver ? 2 : 1.2}em`,
            textAlign: 'center'
          }}
        />
      </GameContainer>
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
