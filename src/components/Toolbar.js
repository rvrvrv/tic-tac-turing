import React, { Component } from 'react';
import { AppBar, Popover, Menu, MenuItem } from 'material-ui';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = (e) => {
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
          titleStyle={{textAlign: 'center'}}
          onLeftIconButtonClick={this.handleClick}
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
            <MenuItem primaryText="Play Game" />
            <MenuItem primaryText="Profile" />
          </Menu>
        </Popover>
      </div>
    );
  }
  }
