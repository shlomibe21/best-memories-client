import React from "react";
import { Link } from "react-router-dom";
import "./album-tile.css";
import Tooltip from "../common/tooltip";

import { MdPhotoAlbum, MdModeEdit, MdDeleteForever } from "react-icons/md";

export default function AlbumTile(props) {
    // Check if this album has at least one media file
    // and if yes display thumbnail of it on the album tile
    let storageLocation
    if((props.files[0]) && (props.files[0].storageLocation)) {
        storageLocation = props.files[0].storageLocation;
    }
  return (
    <div className="album-tile">
      <div id={`album-${props.index}`} className="album-tile-container">
        <p className="album-name">{props.albumName}</p>
        <a className="thumbnail">
          <img className="media-file" src={storageLocation ? storageLocation : ""} alt="Thumbnail" />
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
              <Link className="link-icon" to={`/edit-album/${props.id}`}>
                <MdModeEdit />
              </Link>
            </Tooltip>
          </button>
          <button>
            <Tooltip message={"Delete Album"} position={"top"}>
              <Link className="link-icon" to={`/delete-album/${props.id}`}>
                <MdDeleteForever />
              </Link>
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
