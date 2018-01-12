import React, { Component } from 'react';

export default class Template extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Tic-Tac-Turing</h1>
        </header>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
};
