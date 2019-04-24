import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="/" className="left   hide-on-med-and-down brand-logo">
            Logo
          </a>
          <ul id="nav-mobile" className="right ">
            <li>
              <a href="/auth/google">LogIn with google</a>
            </li>
            <li>
              <a href="/auth/facebook">LogIn with facebook</a>
            </li>
            <li>
              <a href="/auth/github">LogIn with github</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
