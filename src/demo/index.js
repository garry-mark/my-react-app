import React, { Component } from 'react';
import AssetsDemo from './assets-demo';
import EventHandleDemo from './event-handle-demo';
import PropTypesDemo from './prop-types-demo';
import StyleDemo from './style-demo';
import FlowDemo from './flow-demo';

class Demo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<section>
				<AssetsDemo />
				<EventHandleDemo />
				<PropTypesDemo text={'123'} />
				<StyleDemo />
				<FlowDemo />
			</section>
		);
	}
}
export default Demo;
