import React from "react";

import Tooltip from "../common/tooltip";

import { Link } from "react-router-dom";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import "./media-file.css";

export default function MediaFile(props) {
  const mediaFile = props.storageLocation;

  return (
    <div
      id={`file-${props.albumIndex}`}
      className="media-file"
      style={{ /*position: "absolute",*/ top: props.top, left: props.left }}
    >
      <a className="image-wrapper">
        <img className="" src={mediaFile} alt="media file" />
      </a>
      <div>
        <p className="file-name">{props.fileName}</p>
        <p className="file-date">{props.dateAdded}</p>
        <p className="file-description">{props.description}</p>
      </div>
      <div className="ctrl-icons-wrapper">
        <button>
          <Tooltip message={"Edit"} position={"top"}>
            <Link
              to={`/editMedia/${props.albumIndex}/${props._id}`}
              className="link-icon"
            >
              <MdModeEdit />
            </Link>
          </Tooltip>
        </button>
        <button>
          <Tooltip message={"Delete"} position={"top"}>
            <Link
              to={`/deleteMedia/${props.albumIndex}/${props._id}`}
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
