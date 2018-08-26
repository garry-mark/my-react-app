import './style.scss';
// @flow
import * as React from 'react';

type Props = {
	children: Array
};

type State = {};

class Main extends React.Component<Props, State> {
	static defaultProps: Props = {};
	state: State = {};

	constructor(props: Props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		const { children } = this.props;
		const {} = this.state;
		return <main styleName="main">{children}</main>;
	}
}

export default Main;
