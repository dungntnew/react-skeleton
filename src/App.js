import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CommentBox from './CommentBox';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <CommentBox url="http://localhost:8181/comments" poolInterval={2000} />
      </div>
    );
  }
}

export default App;
