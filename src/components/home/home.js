import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export function HomePage(props) {
  let loginLink;
  //if (!props.loggedIn) {
    //loginLink = <Link to="/login">Login</Link>;
  //}
  return (
    <div className="home centered-container centered-text">
      <h1>Welcome to Best Memories</h1>
      <Link className="btn" to="/dashboard">Let's Start!</Link>
      {loginLink}
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HomePage);
