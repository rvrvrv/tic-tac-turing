import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class AuthButton extends Component {
  static muiName = 'FlatButton';

  render() {
    if (this.props.authenticated) {
      return (
        <FlatButton
          style={this.props.style}
          label='Log Out'
          onTouchTap={this.props.auth.logout}
          secondary
        />
      );
    } else {
      return (
        <FlatButton
          style={this.props.style}
          label='Log In'
          onTouchTap={this.props.auth.showLock}
          primary
        />
      );
    }
  }
}


