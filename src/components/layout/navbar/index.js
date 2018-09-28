import './navbar.scss';
// @flow
import * as React from 'react';
import { NavLink } from 'react-router-dom';
type Props = {};

type NavBarItem = {
	name: string,
	to: string,
	isExact: boolean
};

type State = {
	navbar: Array<NavBarItem>
};

class NavBar extends React.Component<Props, State> {
	static defaultProps: Props = {};
	state: State = {
		navbar: [
			{
				name: 'Home',
				to: '/home',
				isExact: false
			},
			{
				name: 'About me',
				to: '/aboutme',
				isExact: false
			}
		]
	};

	constructor(props: Props) {
		super(props);
	}
	componentDidMount() {}
	render() {
		// const {} = this.props;
		const { navbar } = this.state;
		return (
			<nav styleName="navbar">
				<div>
					{navbar.map((item: NavBarItem, index: number) => (
						<NavLink
							key={index}
							exact={item.isExact}
							activeClassName="navbar_navbarItem--selected"
							to={item.to}>
							{item.name}
						</NavLink>
					))}
				</div>
			</nav>
		);
	}
}

export default NavBar;
