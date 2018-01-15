import React from 'react';
import { Layer, Line, Text } from 'react-konva';

export const Board = ({ size, rows, unit }) => {
  let grid = [];
  let stroke = '#eee';
  let strokeWidth = 10;
  // Generate 4 lines for tic-tac-toe board
  for (let i = 1; i < rows; i++) {
    let position = unit * i;
    grid.push(
      <Line
        points={[position, 0, position, size]}
        stroke={stroke}
        strokeWidth={strokeWidth}
        key={`v-${i}`}
      />
    );
    grid.push(
      <Line
        points={[0, position, size, position]}
        stroke={stroke}
        strokeWidth={strokeWidth}
        key={`h-${i}`}
      />
    );
  }

  return (
    <Layer>
      {grid}
    </Layer>
  );
};

export const Squares = ({ unit, coords, gameState, win, gameOver, yourTurn, ownMark, move }) => {
  // Generate array of squares
  let squares = coords.map((position, i) => {
    let mark = gameState[i];
    let makeMove = move;
    let fill = '#044';
    // If win occurs, highlight winning square
    if (win && win.includes(i)) fill = '#0bb';
    // Prevent illegal moves
    if (gameOver || !yourTurn || mark) makeMove = () => console.log('Not your turn');
    return (
      <Text
        x={position[0]}
        y={position[1]}
        text={mark}
        fontSize={unit}
        width={unit}
        fill={fill}
        fontFamily={'Helvetica'}
        align={'center'}
        index={i}
        key={i}
        onClick={(e) => {
          let index = e.target.index;
          makeMove(index, ownMark);
        }}
      />
    )
  })
  return (
    <Layer>
      {squares}
    </Layer>
  );
};
