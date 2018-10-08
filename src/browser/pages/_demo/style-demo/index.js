import React, { Component } from 'react';
import './index.scss';

class StyleDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<section styleName="demo">
				<h1>样式例子</h1>
				<h2>全局样式的使用和覆盖</h2>
				<p className="test">引用全局样式</p>
				<p styleName="unUseGlobal" className="test">
					覆盖全局样式
				</p>
				<h2>工具class的使用</h2>
				<div styleName="floatBox">
					<p>引用工具样式clearfix</p>
				</div>
				<h2>测试autoprefix</h2>
				<div styleName="flexBox">
					<span>flexBox1</span>
					<span>flexBox2</span>
				</div>
			</section>
		);
	}
}

export default StyleDemo;
