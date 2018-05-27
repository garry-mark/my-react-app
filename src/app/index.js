import React, { Component } from 'react'
import styles from './index.scss'
import logo from './logo.svg'

class App extends Component {
  render() {
    return (
      <div className="header">
        <img src={logo} alt="logo" />
        <h1>Hello world!</h1>
        <p>This is Garry blog starting.</p>
      </div>
    )
  }
}

export default App
