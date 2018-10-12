import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export function HomePage(props) {
  let loginLink;
  if (!props.loggedIn) {
    loginLink = <Link to="/login">Login</Link>;
  }
  return (
    <div className="home centered-container">
      <h2>Welcome to Best Memories</h2>
      <Link to="/dashboard">Dashboard</Link>
      {loginLink}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HomePage);
