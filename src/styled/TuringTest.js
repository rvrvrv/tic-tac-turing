import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';

class TuringTest extends Component {
  state = {
    open: false,
    answered: false
  };

  // Show dialog once at end of game
  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.state.answered) this.setState({ open: true, answered: true });
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
        Was your opponent an intelligent robot or completely random?
      </Dialog>
    );
  }
}

export default TuringTest;
