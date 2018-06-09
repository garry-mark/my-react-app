import React, { Component } from 'react'
import styles from './index.scss'
import logo from './logo.svg'

class App extends Component {
  render() {
    return (
      <div className="header">
        <img src={logo} alt="logo" />
        <h1> world!</h1>
        <p>Tshis is Garry blog starting.</p>
        <div className="bg-image" />
      </div>
    )
  }
}
export const a = 'demo1'

export default App
