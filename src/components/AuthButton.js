import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import LockIcon from 'material-ui/svg-icons/action/lock-open';
import { grey800, grey900 } from 'material-ui/styles/colors';

export default class AuthButton extends Component {
  static muiName = 'FlatButton';

  render() {
    if (this.props.authenticated) {
      return (
        <FlatButton
          style={this.props.style}
          backgroundColor={grey800}
          hoverColor={grey900}
          label="Log Out"
          onTouchTap={this.props.auth.logout}
        />
      );
    } else {
      return (
        <FlatButton
          style={this.props.style}
          label="Log In"
          icon={<LockIcon />}
          onTouchTap={this.props.auth.showLock}
        />
      );
    }
  }
}


