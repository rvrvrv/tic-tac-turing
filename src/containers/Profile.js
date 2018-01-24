import React, { Component } from 'react';
import Relay from 'react-relay';
import { Container, Name, GameListHeader, GameList, GameRecord, ColumnLabels, Column } from '../styled/Profile';

class Profile extends Component {

  get records() {
    return this.props.viewer.user.p1Games.edges.map((edge, i) => {
      // Rename node to game
      let { node: game } = edge;
      // Format results
      return (
        <GameRecord
          key={`game-${i}`}
          index={i}
        >
          <Column>
            {game.winner ? 'Won!' : 'Lost'}
          </Column>
          <Column>
            {game.p1Guess}
          </Column>
          <Column>
            {game.p1GuessCorrect ? 'Yes' : 'No'}
          </Column>
          <Column>
          {new Date(game.createdAt).toLocaleDateString()}
          </Column>
        </GameRecord>
      )
    });
  }

  render() {
    return (
      <Container>
        <Name>
          {this.props.viewer.user.email}
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

export default Relay.createContainer(
  Profile, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
            email
            p1Games (last: 10) {
              edges {
                node {
                  id
                  createdAt
                  winner {
                    id
                  }
                  p1Guess
                  p1GuessCorrect
                }
              }
            }
          }
        }
      `
    }
  }
);
