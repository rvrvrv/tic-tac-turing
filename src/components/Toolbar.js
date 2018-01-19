import React, { Component } from 'react';
import { Link } from 'react-router';
import { AppBar, Popover, Menu, MenuItem } from 'material-ui';
import AuthButton from './AuthButton';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      logged: false
    };
  }

  handleLeftIconButtonClick = (e) => {
    e.preventDefault();
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
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
          titleStyle={{ textAlign: 'center' }}
          iconElementRight={
            <AuthButton
              auth={this.props.auth}
              authenticated={this.props.authenticated}
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
