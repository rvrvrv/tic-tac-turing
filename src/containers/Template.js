import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toolbar from '../components/Toolbar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class Template extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Toolbar />
          <main>
            {this.props.children}
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
};
