import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toolbar from '../components/Toolbar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class Template extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Toolbar
            auth={this.props.route.auth}
            authenticated={this.props.viewer.user}
          />
          <main>
            {this.props.children}
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
};

export default Relay.createContainer(
  Template, {
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
