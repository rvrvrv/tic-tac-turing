import React from 'react';
import { Layer, Line, Text } from 'react-konva';
import { blue800, green700 } from 'material-ui/styles/colors';

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

export const Squares = ({ unit, coords, gameState, win, gameOver, yourTurn, ownMark, move, showSnackbar }) => {

  const handleClickOrTap = (e, illegal) => {
    if (illegal) return showSnackbar(illegal);
    let index = e.target.index;
    move(ownMark, index);
  }

  // Generate array of squares
  let squares = coords.map((position, i) => {
    let mark = gameState[i];
    let fill = blue800;
    let illegal = false;

    // If win occurs, highlight winning squares
    if (win && win.includes(i)) fill = green700;

    // Prevent illegal moves
    if (gameOver) illegal = 'gameOver';
    else if (!yourTurn) illegal = 'It\'s not your turn!';
    else if (mark) illegal = 'That space is already occupied.'

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
        onClick={e => handleClickOrTap(e, illegal)}
        onTap={e => handleClickOrTap(e, illegal)}
      />
    )
  })
  return (
    <Layer>
      {squares}
    </Layer>
  );
};
