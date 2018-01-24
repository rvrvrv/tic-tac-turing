import Relay, { Mutation } from 'react-relay'

export default class CreateGame extends Mutation {

  getVariables() {
    return {
      p1PlayerId: this.props.user.id,
      winnerId: this.props.winnerId,
      p1Guess: this.props.guess,
      p1GuessCorrect: this.props.guessCorrect
    };
  }

  getMutation() {
    return Relay.QL`mutation{createGame}`
  }

  getFatQuery() {
    return Relay.QL`
      fragment on CreateGamePayload {
        p1Player
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'RANGE_ADD',
        parentName: 'p1Player',
        parentID: this.props.user.id,
        connectionName: 'p1Games',
        edgeName: 'edge',
        rangeBehaviors: {
          '': 'append'
        }
      },
    ];
  }
}
