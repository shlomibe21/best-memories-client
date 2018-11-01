import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import LoginForm from "./login-form";

import "./login-page.css";

export function LoginPage(props) {
  // If user is logged in redirect straight to the dashboard
  if (props.loggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login">
      <div className="top-image">
        <div className="centered-container centered-text content">
          <h1 className="top-image-header">Welcome to Best Memories</h1>
        </div>
      </div>
      <LoginForm />
      <div className="centered-text">
        <p>
          Not registered?
          <Link to="/register"> Create an account</Link>
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
