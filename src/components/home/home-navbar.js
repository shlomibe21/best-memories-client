import React from "react";
import { Link } from "react-router-dom";

import "./home-navbar.css";

export default class HomePageNavbar extends React.Component {
  componentDidMount() {
    var navbar = document.getElementById("navbar");
    var sticky = navbar.offsetTop;
    window.onscroll = navbarMode;

    function navbarMode() {
      if (window.pageYOffset > sticky) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    }
  }

  render() {
    return (
      <div className="navbar" id="navbar">
        <div className="logo">
          <h2>Best Memories</h2>
        </div>
        <Link className="btn" to="/dashboard">
          Let's Start!
        </Link>
      </div>
    );
  }
}
