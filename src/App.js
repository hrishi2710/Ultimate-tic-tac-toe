import React, { Component } from 'react';
import classes from './App.css';
import Board from '../src/Containers/Board/Board';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Board/>
      </div>
    );
  }
}

export default App;
