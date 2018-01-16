import React, { Component } from 'react';
import { Container, Name, GameListHeader, GameList, GameRecord, ColumnLabels, Column } from '../styled/Profile';

export default class Profile extends Component {
  static defaultProps = {
    user: {
      email: 'USER_EMAIL',
      games: [
        {
          winner: true,
          createdAt: '1/2/2018',
          id: '0001'
        },
        {
          winner: false,
          createdAt: '1/5/2018',
          id: '0002'
        },
        {
          winner: true,
          createdAt: '1/2/2018',
          id: '0003'
        },
      ]
    }
  };

  get records() {
    return this.props.user.games.map((game, i) => {
      return (
        <GameRecord
          key={`game-${i}`}
          index={i}
        >
          <Column>
            {(game.winner) ? 'Won!' : 'Lost'}
          </Column>
          <Column>
            Robot
          </Column>
          <Column>
            No
          </Column>
          <Column>
          {game.createdAt}
          </Column>
        </GameRecord>
      )
    });
  }

  render() {
    return (
      <Container>
        <Name>
          {this.props.user.email}
        </Name>
        <GameList>
          <GameListHeader>
            My Games
          </GameListHeader>
        <ColumnLabels>
          <Column>
            Result
          </Column>
          <Column>
            Guess
          </Column>
          <Column>
            Correct?
          </Column>
          <Column>
            Date
          </Column>
          </ColumnLabels>
          {this.records}
        </GameList>
      </Container>
    )
  }
};
