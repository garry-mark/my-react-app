import * as React from 'react';

class Header extends React.Component<any, any> {
	public render() {
		const { children, orther } = this.props;
		return <header {...orther}>{children}</header>;
	}
}

export default Header;
