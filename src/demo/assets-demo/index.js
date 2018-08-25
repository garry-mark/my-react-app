import React, { Component } from 'react';
import './style.scss';
import logo from './logo.svg';

class AssetsDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<section>
				<h1>资源例子</h1>
				<h2>JSX方式应用图片资源</h2>
				<img
					src={logo}
					alt="logo"
					style={{ width: '100px', height: '100px' }}
				/>
				<h2>css方式应用图片资源</h2>
				<div styleName="bgImage" />
			</section>
		);
	}
}

export default AssetsDemo;
