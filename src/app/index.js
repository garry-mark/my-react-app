import React, { Component } from 'react'
import styles from './index.scss'
import logo from './logo.svg'

class App extends Component {
  render() {
    return (
      <div className={styles.header}>
        <img src={logo} alt="logo" />
        <h1> world!</h1>
        <p>Tshis is Garry blog starting.</p>
        <div className={styles.bgImage} />
        <div className={styles.floatBox}>
          <p>123123</p>
        </div>
      </div>
    )
  }
}
export const a = 'demo1'

export default App
