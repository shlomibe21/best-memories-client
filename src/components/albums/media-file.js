import React from "react";

import Tooltip from "../common/tooltip";
import { Link } from "react-router-dom";
import { MdPhoto, MdModeEdit, MdDeleteForever } from "react-icons/md";

import "./media-file.css";

export default class MediaFile extends React.Component {
  //const mediaFile = props.storageLocation;
  render() {
    return (
      <div
        id={`file-${this.props.albumIndex}`}
        className="media-file"
        style={{ /*position: "absolute",*/ top: this.props.top, left: this.props.left }}
      >
        <a className="image-wrapper">
          <img className="" src={this.props.storageLocation} alt="media file" />
        </a>
        <div>
          <p className="file-name">{this.props.fileName}</p>
          <p className="file-date">{this.props.dateAdded}</p>
          <p className="file-description">{this.props.description}</p>
        </div>
        <div className="ctrl-icons-wrapper">
          <button onClick={this.props.displayLightboxClicked}>
            <Tooltip message={"Display"} position={"top"}>
              <MdPhoto />
            </Tooltip>
          </button>
          <button>
            <Tooltip message={"Edit"} position={"top"}>
              <Link
                to={`/editMedia/${this.props.albumIndex}/${this.props._id}`}
                className="link-icon"
              >
                <MdModeEdit />
              </Link>
            </Tooltip>
          </button>
          <button>
            <Tooltip message={"Delete"} position={"top"}>
              <Link
                to={`/deleteMedia/${this.props.albumIndex}/${this.props._id}`}
                className="link-icon"
              >
                <MdDeleteForever />
              </Link>
            </Tooltip>
          </button>
        </div>
      </div>
    );
  }
};
