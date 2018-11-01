import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { clearAuth } from "../../actions/auth";
import { clearAuthToken } from "../../local-storage";
import Tooltip from "../common/tooltip";

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
        userName = (
          <Tooltip message={"Username: " + this.props.currentUser.username} position={"bottom"}>
            <div className="current-username">
              Hello: {this.props.currentUser.username}
            </div>
          </Tooltip>
        );
      }
      logInOutOption = (
        <div>
          <Link to="/" onClick={() => this.logOut()}>
            Log out |
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
      <div role="navigation" className="nav-bar">
        <div>
          <p className="logo">
            <Link to={logoLink}>BestMemories</Link>
          </p>
        </div>
        <div className="topnav-menu-right">
          {logInOutOption}
          {userName}
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
