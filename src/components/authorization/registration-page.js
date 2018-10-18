import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import RegistrationForm from "./registration-form";

import "./registration-page.css";

export function RegistrationPage(props) {
  // If we are logged in (which happens automatically when registration
  // is successful) redirect to the dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="registration">
      <div className="registration-page centered-text">
      <h1>Welcome to Best Memories</h1>
      </div>
      <RegistrationForm />
      <div className="centered-text">
        <p>Already registered?
          <Link to="/login">  Sign In</Link>
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);
