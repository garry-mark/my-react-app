import './details.scss';
// @flow
import * as React from 'react';

type Props = {};

type State = {};

class AboutMe extends React.Component<Props, State> {
	static defaultProps: Props = {};
	state: State = {};

	constructor(props: Props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		return <section />;
	}
}

export default AboutMe;
