import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PropTypesDemo extends Component {
	static defaultProps = {
		text: 'default string'
	};
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { text } = this.props;
		return (
			<section>
				<h1>PropTypes例子</h1>
				<p>默认值以及prop类型：{text}</p>
			</section>
		);
	}
}

PropTypesDemo.propTypes = {
	text: PropTypes.string
};

export default PropTypesDemo;
