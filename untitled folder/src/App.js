import React, { Component } from 'react';
import logo from './logo.svg';
import ItemList from './containers/ItemList'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <ItemList/>

      </div>
    );
  }
}

export default App;
