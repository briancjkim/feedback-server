import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payment from "./Payment";

class Header extends React.Component {
  // auth의값은 null, false,value 세가지종류이므로 renderContent로 미리 render할내용을 정할수있다
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <>
            <li>
              <a href="/auth/google">LogIn with google</a>
            </li>
            <li>
              <a href="/auth/facebook">LogIn with facebook</a>
            </li>
            <li>
              <a href="/auth/github">LogIn with github</a>
            </li>
          </>
        );
      default:
        return (
          <>
            <li>
              <Payment />
            </li>
            <li style={{ margin: "0 10px" }}>{`Credit : ${
              this.props.auth.credits
            }`}</li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
        );
    }
  }
  // Link vs a-tag Link navigates to a different route rendered by React
  // a navigates to completely different HTML page
  render() {
    const { auth } = this.props;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={auth ? "/surveys" : "/"} className="left brand-logo">
            Feedback
          </Link>
          <ul id="nav-mobile" className="right ">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps)(Header);
