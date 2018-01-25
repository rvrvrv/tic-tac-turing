import React, { Component } from 'react';
import { Link } from 'react-router';
import { AppBar, Popover, Menu, MenuItem } from 'material-ui';
import AuthButton from './AuthButton';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      logged: false,
      blink: false
    };
  }

  handleLeftIconButtonClick = (e) => {
    e.preventDefault();
    // Open menu for authenticated user
    if (this.props.authenticated) {
      this.setState({
        open: true,
        anchorEl: e.currentTarget,
      });
    } else {
      // Blink AuthButton for unauthenticated user
      this.setState({ blink: true },
        () => setTimeout(
          () => this.setState({ blink: false }), 1500));
    }
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <div>
        <AppBar
          title="Tic-Tac-Turing"
          titleStyle={{
            paddingLeft: '1.7em',
            textAlign: 'center'
          }}
          className="title"
          zDepth={2}
          iconElementRight={
            <AuthButton
              auth={this.props.auth}
              authenticated={this.props.authenticated}
              blink={this.state.blink}
            />
          }
          onLeftIconButtonClick={this.handleLeftIconButtonClick}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          zDepth={3}
        >
          <Menu>
            <Link to={'/'} style={{ textDecoration: 'none' }}>
              <MenuItem
                onTouchTap={this.handleRequestClose}
                primaryText="Play Game" />
            </Link>
            <Link to={'/profile'} style={{ textDecoration: 'none' }}>
              <MenuItem
                onTouchTap={this.handleRequestClose}
                primaryText="Profile" />
            </Link>
          </Menu>
        </Popover>
      </div>
    );
  }
  }
