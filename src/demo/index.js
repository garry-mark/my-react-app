import React, { Component } from 'react'
import './index.scss'
import logo from './logo.svg'

class Demo extends Component {
  render() {
    return (
      <section styleName="demo">
        <h1>样式例子</h1>
        <p className="test">引用全局样式</p>
        <p styleName="unUseGlobal" className="test">
          覆盖全局样式
        </p>

        <div styleName="floatBox">
          <p>引用工具样式clearfix</p>
        </div>

        <div styleName="flexBox">
          <span>flexBox1</span>
          <span>flexBox2</span>
        </div>

        <hr />

        <h1>资源例子</h1>
        <img
          src={logo}
          alt="logo"
          style={{ width: '100px', height: '100px' }}
        />
        <div styleName="bgImage" />
      </section>
    )
  }
}

export default Demo
