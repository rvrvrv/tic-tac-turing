import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';

class TuringTest extends Component {
  state = {
    open: false
  };

  // Show dialog once at end of game
  componentWillReceiveProps(nextProps) {
    if (nextProps.open) setTimeout(() => this.setState({ open: true }), 500);
  }

  // Record user's answer and close the dialog
  recordAndClose = answer => {
    this.props.recordGame(answer);
    this.setState({ open: false });
  };

  render() {
    const actions = [
      <RaisedButton
        label="Robot"
        onTouchTap={() => this.recordAndClose('Robot')}
      />,
      <RaisedButton
        label="Random"
        onTouchTap={() => this.recordAndClose('Random')}
      />
    ];

    return (
      <Dialog
        title="Robot or Random?"
        actions={actions}
        modal={true}
        open={this.state.open}
      >
        {this.props.winner
          ? `${this.props.winner} won!`
          : 'It\'s a tie!'}
        <br /><br />
        Was your opponent an intelligent robot or completely random?
      </Dialog>
    );
  }
}

export default TuringTest;
