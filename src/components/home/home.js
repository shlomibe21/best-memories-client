import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

import { login, clearAuth } from "../../actions/auth";
import { clearAuthToken } from "../../local-storage";
import HomePageNavbar from "./home-navbar";
import "./home.css";

export class HomePage extends React.Component {
  handleDemo() {
    return this.props.dispatch(login("demo", "tryItNow123"));
  }

  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    let loggedInOutState;

    if (!this.props.loggedIn) {
      loggedInOutState = (
        <div>
          <div>
            <Link className="btn" to="/login">
              Login
            </Link>
            <Link className="btn" to="/register">
              Register
            </Link>
          </div>
          <div>
            <button className="btn" onClick={() => this.handleDemo()}>
              Demo
            </button>
          </div>
          <div className="scroll-down-msg">
              <p>Scroll Down to Read More!</p>
              <MdKeyboardArrowDown className="scroll-down-arrow"/>
          </div>
        </div>
      );
    } else {
      loggedInOutState = (
        <div>
          <button className="btn" to="/" onClick={() => this.logOut()}>
            Log out
          </button>
        </div>
      );
    }

    if (this.props.loggedIn) {
      if (this.props.currentUser.username === "demo") {
        return <Redirect to="/dashboard" />;
      }
    }
    return (
      <div className="home-page">
        <div className="top-image">
          <div className="centered-container centered-text content">
            <h1 className="top-image-header">Welcome to Best Memories</h1>
            <h2 className="top-image-banner">
              You've already captured your great moments, now you can easily
              keep them as your best memories forever.
            </h2>
          </div>
          <div className="buttons-bar">{loggedInOutState}</div>
        </div>
        <HomePageNavbar />
        <div className="home-page centered-container centered-text content">
          <h3>Share your great moments with others!</h3>
          <div className="row">
            <div className="col-6">
              <p>
                We all have plenty of digital photos stored somewhere on our
                hard drive, phone, or the cloud. But it is always hard to go
                back and find the pictures that we really like.
              </p>
            </div>
            <div className="col-6">
              <img
                src={require("../../images/photo-256887_640.jpg")}
                alt="images"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <img
                src={require("../../images/images-382006_640.jpg")}
                alt="images"
              />
            </div>
            <div className="col-6">
              <p>
                Best Memories is a digital photo album where users can cherry
                pick their best photos and short videos and create an online
                album that is easy to access and manage, that contains only
                their best memories.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <p>
                Users can also make personal albums for family members or
                friends for a special event or just for fun.
              </p>
            </div>
            <div className="col-6">
              <img
                src={require("../../images/photo-album-235603_640.jpg")}
                alt="images"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(HomePage);
