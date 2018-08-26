import './style.scss';
// @flow
import * as React from 'react';

type Props = {
	children: Array
};

type State = {};

class Header extends React.Component<Props, State> {
	state: State = {};

	constructor(props: Props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		const { children } = this.props;
		const {} = this.state;
		return <header>{children}</header>;
	}
}

export default Header;