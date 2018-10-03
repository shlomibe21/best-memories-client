import React from "react";

import Tooltip from "../common/tooltip";

import { Link } from "react-router-dom";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import "./media-file.css";

export default function MediaFile(props) {
  return (
    <div
      id={`file-${props.index}`}
      className="media-file"
      style={{ /*position: "absolute",*/ top: props.top, left: props.left }}
    >
      <a className="image-wrapper">
        <img
          className=""
          src={props.mediaFile}
          alt='media file'
        />
      </a>
      <div>
        <p className="file-name">{props.fileName}</p>
        <p className="file-date">{props.dateAdded}</p>
        <p className="file-description">{props.description}</p>
      </div>
      <div className="ctrl-icons-wrapper">
        <button>
          <Tooltip message={"Edit"} position={"top"}>
            <Link to={`/editMedia/${props.id}`} className="link-icon">
              <MdModeEdit />
            </Link>
          </Tooltip>
        </button>
        <button>
          <Tooltip message={"Delete"} position={"top"}>
            <MdDeleteForever />
          </Tooltip>
        </button>
      </div>
    </div>
  );
}
