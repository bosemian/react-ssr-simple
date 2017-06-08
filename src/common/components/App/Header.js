import React, { Component } from 'react';
import { Link } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="nav has-shadow">
          <div className="container">
            <div className="nav-left">
              <Link to={{ pathname: '/'}} className="nav-item is-tab is-hidden-mobile">Home</Link>
            </div>
            <div className="nav-right nav-menu">
              <a className="nav-item is-tab">Posts</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;