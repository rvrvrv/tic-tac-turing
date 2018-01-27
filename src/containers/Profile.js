import React, { Component } from 'react';
import Relay from 'react-relay';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class Profile extends Component {

  get records() {
    return this.props.viewer.user.p1Games.edges.map((edge, i) => {
      // Rename node to game
      let { node: game } = edge;
      // Determine result of game based on game.winner
      let gameResult = 'Tie';
      // 'cjcxjqcw108ae016572wbct5b' is placeholder AI account
      if (game.winner === 'cjcxjqcw108ae016572wbct5b') gameResult = 'Lost';
      else if (game.winner) gameResult = 'Won!';
      // Format results
      return (
        <TableRow key={`game-${i}`}>
          <TableRowColumn>
            {gameResult}
          </TableRowColumn>
          <TableRowColumn>
            {game.p1Guess}
          </TableRowColumn>
          <TableRowColumn>
            {game.p1GuessCorrect ? 'Yes' : 'No'}
          </TableRowColumn>
          <TableRowColumn>
          {new Date(game.createdAt).toLocaleDateString()}
          </TableRowColumn>
        </TableRow>
      )
    });
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h3>{this.props.viewer.user.email}</h3>
        <Paper
          style={{
            width: '95vw',
            margin: '0 auto'
          }}
          zDepth={3}
        >
          <Table style={{ maxHeight: '70vh' }}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Result</TableHeaderColumn>
                <TableHeaderColumn>Guess</TableHeaderColumn>
                <TableHeaderColumn>Correct?</TableHeaderColumn>
                <TableHeaderColumn>Date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              stripedRows={true}
            >
              {this.records}
            </TableBody>
          </Table>
          </Paper>
      </div>
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
