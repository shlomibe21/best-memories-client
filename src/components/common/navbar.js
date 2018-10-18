import React from "react";
import { connect } from "react-redux";
import { clearAuth } from "../../actions/auth";
import { clearAuthToken } from "../../local-storage";
import { Link } from "react-router-dom";

import "./navbar.css";

export class NavBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Render either log-in or log-out on nav-bar according to the state
    let logInOutOption;
    let userName = "";
    let logoLink;

    if (this.props.loggedIn) {
      logoLink = "/dashboard";
      if (this.props.currentUser) {
        userName = <div>User: {this.props.currentUser.username} | </div>;
      }
      logInOutOption = (
        <div>
          <Link to="/" onClick={() => this.logOut()}>
            Log out
          </Link>
        </div>
      );
    } else {
        logoLink = "/";
      logInOutOption = (
        <div>
          <Link to="/login">Login</Link>
        </div>
      );
    }

    return (
      <div className="nav-bar">
        <div>
          <p className="logo">
            <Link to={logoLink}>BestMemories</Link>
          </p>
        </div>
        <div className="topnav-menu-right">
          {userName}
          {logInOutOption}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    loggedIn: state.auth.currentUser !== null
  };
};

export default connect(mapStateToProps)(NavBar);
