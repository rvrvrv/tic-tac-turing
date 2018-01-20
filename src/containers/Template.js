import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { blue600, blue800 } from 'material-ui/styles/colors';
import Toolbar from '../components/Toolbar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue600,
    primary2Color: blue800,
  }
});

class Template extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
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
