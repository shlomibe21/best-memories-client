import React from "react";

import Tooltip from "../tooltip";

import { Link } from "react-router-dom";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import "./media-file.css";

export default function MediaFile(props) {
  return (
    <div
      id={`file-${props.index}`}
      className="media-file-container"
      style={{ position: "absolute", top: props.top, left: props.left }}
    >
      <a className="thumbnail">
        <img
          className="media-file"
          src={props.mediaFile}
          alt={`${props.name}`}
        />
      </a>
      <div>
        <p className="file-name">{props.name}</p>
        <p className="file-date">{props.date}</p>
        <p className="file-date">{props.description}</p>
      </div>
      <div className="ctrl-icons-wrapper">
        <button>
          <Tooltip message={"Edit"} position={"top"}>
            <Link to="/editMedia" className="link-icon">
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
