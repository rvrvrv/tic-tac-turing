import Relay from 'react-relay';

export default class SignInUser extends Relay.Mutation {
  getVariables() {
    return {
      auth0: {
        idToken: this.props.idToken
      }
    };
  }

  getMutation() {
    return Relay.QL`mutation{ signInUser }`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on SignInPayload {
        viewer
      }
    `;
  }

  getConfigs() {
    return [
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on SignInPayload {
              viewer {
                user {
                  id
                }
              }
            }
          `
        ]
      }
    ];
  }
}
