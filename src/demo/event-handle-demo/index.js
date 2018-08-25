import React, { Component } from 'react';

class EventHandleDemo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	getThis = () => {
		console.log(this);
	};
	render() {
		return (
			<section>
				<h1>事件绑定</h1>
				<button onClick={this.getThis}>点击</button>
			</section>
		);
	}
}

export default EventHandleDemo;
