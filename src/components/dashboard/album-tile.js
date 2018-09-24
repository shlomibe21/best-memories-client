import React from "react";
import {Link} from 'react-router-dom';
import "./album-tile.css";
import Tooltip from "../tooltip";

import { MdPhotoAlbum, MdModeEdit, MdDeleteForever } from "react-icons/md";

export default function AlbumTile(props) {
  return (
    <div>
      <div id={`album-${props.index}`} className="album-tile-container">
        <p className="album-name">{props.name}</p>
        <a className="thumbnail">
          <img
            className="media-file"
            src={props.mediaFile}
            alt={`${props.name}`}
          />
        </a>
      </div>
      <div className="ctrl-icons-wrapper">
        <div>
          <button>
            <Tooltip message={"Display Album"} position={"top"}>
              <Link className="link" to="/album"><MdPhotoAlbum /></Link>
            </Tooltip>
          </button>
          <button>
            <Tooltip message={"Edit Album"} position={"top"}>
              <MdModeEdit />
            </Tooltip>
          </button>
          <button>
            <Tooltip message={"Delete Album"} position={"top"}>
              <MdDeleteForever />
            </Tooltip>
          </button>
        </div>
      </div>
    </div>
  );
}

AlbumTile.defaultProps = {
  name: "[Album Name...] "
};
