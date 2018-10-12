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
    if (this.props.loggedIn) {
      logInOutOption = (
        <Link to="/" onClick={() => this.logOut()}>
          Log out
        </Link>
      );
    } else {
      logInOutOption = <Link to="/login">Login</Link>;
    }

    return (
      <div className="nav-bar">
        <p className="logo">
          <a href="/">BestMemories</a>
          {logInOutOption}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(NavBar);
