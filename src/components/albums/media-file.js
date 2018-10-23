import React from "react";
import ExifOrientationImg from "react-exif-orientation-img";

import Tooltip from "../common/tooltip";
import { MdPhoto, MdModeEdit, MdDeleteForever } from "react-icons/md";

import "./media-file.css";

export default class MediaFile extends React.Component {
  //const mediaFile = props.storageLocation;
  render() {
    return (
      <div
        id={`file-${this.props.albumIndex}`}
        className="media-file"
        style={{
          /*position: "absolute",*/ top: this.props.top,
          left: this.props.left
        }}
      >
        <a className="image-wrapper">
          <ExifOrientationImg
            src={this.props.storageLocation}
            alt="media file"
          />
        </a>
        <div>
          <p className="file-name">{this.props.frontEndFileName}</p>
          <p className="file-date">{this.props.dateAdded}</p>
          <p className="file-description">{this.props.description}</p>
        </div>
        <div className="ctrl-icons-wrapper">
          <button onClick={this.props.displayLightboxClicked}>
            <Tooltip message={"Display"} position={"top"}>
              <MdPhoto />
            </Tooltip>
          </button>
          <button
            className="link-icon"
            onClick={this.props.updateFileButtonClicked}
          >
            <Tooltip message={"Edit"} position={"top"}>
              <MdModeEdit />
            </Tooltip>
          </button>
          <Tooltip message={"Delete"} position={"top"}>
            <button
              className="link-icon"
              onClick={this.props.deleteFileButtonClicked}
            >
              <MdDeleteForever />
            </button>
          </Tooltip>
        </div>
      </div>
    );
  }
}
