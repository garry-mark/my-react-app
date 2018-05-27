import React, { Component } from 'react'
import styles from './index.scss'
import logo from './logo.svg'
console.log('====================================')
console.log(logo)
console.log('====================================')
class App extends Component {
  render() {
    return (
      <div className="header">
        <img src={logo} alt="logo" />
        <h1>hello world!</h1>
      </div>
    )
  }
}

export default App
