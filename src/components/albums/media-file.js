import React from "react";
import moment from "moment";
//import ExifOrientationImg from "react-exif-orientation-img";

import Tooltip from "../common/tooltip";
import {
  MdPhoto,
  MdModeEdit,
  MdDeleteForever,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp
} from "react-icons/md";

import "./media-file.css";

export default class MediaFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extendedMode: false,
      displayCtrlIcons: false,
      displayExtendedInfo: false
    };
  }

  setExtendedMode(state) {
    //console.log("exted:", state);
    this.setState({
      extendedMode: state,
      displayCtrlIcons: state,
      displayExtendedInfo: state
    });
  }

  //const mediaFile = props.storageLocation;
  render() {
    let extendedInfo;

    if (this.state.displayExtendedInfo) {
      let dateAdded = this.props.dateAdded
        ? moment(this.props.dateAdded).format("MM-DD-YYYY")
        : "";
      let comment;
      if (this.props.comment) {
        comment = <p className="file-description">{this.props.comment}</p>;
      }
      extendedInfo = (
        <div>
          <p className="file-date">{dateAdded}</p>
          {comment}
        </div>
      );
    }
    let ctrlIcons;
    if (this.state.displayCtrlIcons) {
      ctrlIcons = (
        <div className="ctrl-icons-wrapper">
          <button onClick={this.props.displayLightboxClicked}>
            <Tooltip message={"Display"} position={"top"}>
              <MdPhoto />
            </Tooltip>
          </button>
          <button
            className="action-icon"
            onClick={this.props.updateFileButtonClicked}
          >
            <Tooltip message={"Edit"} position={"top"}>
              <MdModeEdit />
            </Tooltip>
          </button>
          <Tooltip message={"Delete"} position={"top"}>
            <button
              className="action-icon"
              onClick={this.props.deleteFileButtonClicked}
            >
              <MdDeleteForever />
            </button>
          </Tooltip>
        </div>
      );
    }
    let openCloseIcon;
    if (!this.state.extendedMode) {
      openCloseIcon = (
        <MdKeyboardArrowDown
          className="action-icon"
          onClick={() => this.setExtendedMode(true)}
        />
      );
    } else {
      openCloseIcon = (
        <MdKeyboardArrowUp
          className="action-icon"
          onClick={() => this.setExtendedMode(false)}
        />
      );
    }

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
          {/*<ExifOrientationImg*/}
          <Tooltip
            message={"Click to open:" + this.props.frontEndFileName}
            position={"top"}
          >
            <img
              src={this.props.storageLocation}
              alt="media file"
              onClick={this.props.displayLightboxClicked}
            />
          </Tooltip>
        </a>
        <p className="file-name">{this.props.frontEndFileName}</p>
        <div>{extendedInfo}</div>
        {ctrlIcons}
        {openCloseIcon}
      </div>
    );
  }
}
