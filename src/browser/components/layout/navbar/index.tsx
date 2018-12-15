import * as React from 'react';
import { NavLink } from 'react-router-dom';
import * as style from './navbar.css';

interface NavBarItem {
  name: string;
  to: string;
  isExact: boolean;
}

interface State {
  navbar: NavBarItem[];
}

class NavBar extends React.Component<any, State> {
  public state: State = {
    navbar: [
      {
        isExact: false,
        name: 'Home',
        to: '/home'
      },
      {
        isExact: false,
        name: 'About me',
        to: '/aboutme'
      }
    ]
  };
  public render() {
    const { navbar } = this.state;
    return (
      <nav className={style.navbar}>
        <div>
          {navbar.map((item: NavBarItem, index: number) => (
            <NavLink
              key={index}
              exact={item.isExact}
              activeClassName="navbar_navbarItem--selected"
              to={item.to}
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    );
  }
}

export default NavBar;
