import React from "react";
import { Link } from "react-router-dom";
import "./album-tile.css";
import Tooltip from "../tooltip";

import { MdPhotoAlbum, MdModeEdit, MdDeleteForever } from "react-icons/md";

export default function AlbumTile(props) {
  return (
    <div className="album-tile">
      <div id={`album-${props.index}`} className="album-tile-container">
        <p className="album-name">{props.albumName}</p>
        <a className="thumbnail">
          <img className="media-file" src={props.mediaFile} alt="Thumbnail" />
        </a>
        <p className="album-date-created">{props.dateCreated}</p>
      </div>
      <div className="ctrl-icons-wrapper">
        <div>
          <button>
            <Tooltip message={"Display Album"} position={"top"}>
              <Link className="link-icon" to={`/album/${props.id}`}>
                <MdPhotoAlbum />
              </Link>
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
  albumName: "[Album Name...] "
};
