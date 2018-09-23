import React from "react";
import AlbumTile from "./album-tile";

import "./dashboard.css";

import { FaSearch } from "react-icons/fa";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [
        {
          name: "Art Trip",
          mediaFile: "./images/ATT-OCTET-ST1.JPG"
        },
        {
          name: "Summer Getaway and a lot of more text to",
          mediaFile: "./images/pic_the_scream.png"
        },
        {
          name: "My Spring Vacation",
          mediaFile: "/images/ATT-OCTET-ST2.JPG"
        },
        {
          name: "Beautiful Places",
          mediaFile: "/images/ATT-OCTET-ST3.JPG"
        },
        {
          name: "My Spring Vacation",
          mediaFile: "/images/pic_the_scream.png"
        },
        {
          name: "Art Trip",
          mediaFile: "./images/woman-1459220_1280.png"
        },
        {
          name: "Summer Getaway",
          mediaFile: "./images/ATT-OCTET-ST4.JPG"
        },
        {
          name: "Great Photos",
          mediaFile: "/images/ATT-OCTET-ST3.JPG"
        },
        {
          name: "My Spring Vacation",
          mediaFile: "/images/ATT-OCTET-ST1.JPG"
        },
        {
          name: "My Spring Vacation",
          mediaFile: "/images/ATT-OCTET-ST4.JPG"
        },
        {
          name: "My Spring Vacation",
          mediaFile: "/images/ATT-OCTET-ST3.JPG"
        }
      ]
    };
  }

  render() {
    // T.B.D: Do i need key and index?
    const albums = this.state.albums.map((album, index) => (
      <li key={index} className="col-3">
        <AlbumTile index={index} {...album} />
      </li>
    ));

    return (
      <div className="centered-container">
        <h2>My Albums</h2>
        <div>
          <a href="">Add a New Album</a>
        </div>
        <div className="search-wrapper">
          <input type="text" className="" />
          <button type="submit">
            <FaSearch />
          </button>
        </div>
        <ul className="row albums-container">{albums}</ul>
      </div>
    );
  }
}
