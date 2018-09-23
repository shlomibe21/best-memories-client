import React from "react";
import MediaFile from "./media-file";

import "./album.css";

import { FaSearch } from "react-icons/fa";

export default class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [
        {
          name: "Art Trip",
          date: "02/23/2018",
          description:
            "This is the photo decription and it can be a long one very long...",
          mediaFile: "./images/ATT-OCTET-ST1.JPG",
          top: "0px",
          left: "50px"
        },
        {
          name: "Summer Getaway and a lot of more text to",
          date: "02/23/2018",
          description:
            "This is the photo decription and it can be a long one very long...",
          mediaFile: "./images/pic_the_scream.png",
          top: "100px",
          left: "400px"
        },
        {
          name: "My Spring Vacation",
          date: "02/23/2018",
          description:
            "This is the photo decription and it can be a long one very long...",
          mediaFile: "/images/ATT-OCTET-ST2.JPG",
          top: "50px",
          left: "750px"
        },
        {
          name: "Art Trip",
          mediaFile: "./images/woman-1459220_1280.png",
          top: "130px",
          left: "1100px"
        },
        {
          name: "Summer Getaway",
          mediaFile: "./images/ATT-OCTET-ST4.JPG",
          top: "10px",
          left: "1450px"
        }
      ]
    };
  }

  render() {
    // T.B.D: Do i need key and index?
    const files = this.state.files.map((file, index) => (
      <li key={index} className="">
        <MediaFile index={index} {...file} />
      </li>
    ));

    return (
      <div className="centered-container">
        <p>Album Name...</p>
        <div>
          <a href="">Add a New File</a>
        </div>
        <div className="search-wrapper">
          <input type="text" className="" placeholder="Search" />
          <button type="submit">
            <FaSearch />
          </button>
        </div>
        <ul className="album-container">{files}</ul>
      </div>
    );
  }
}
