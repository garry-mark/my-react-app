import React, { Component } from 'react'
import './index.scss'
import logo from './logo.svg'

class App extends Component {
  render() {
    return (
      <div styleName="header">
        <img src={logo} alt="logo" />
        <h1> world!</h1>
        <p className="test">Tshis is Garry blog starting.</p>
        <div styleName="bgImage" />
        <div styleName="floatBox">
          <p className="test">123123</p>
        </div>
      </div>
    )
  }
}
export const a = 'demo1'

export default App
