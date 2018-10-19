import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import LinesEllipsis from "react-lines-ellipsis";

import "./album-tile.css";
import Tooltip from "../common/tooltip";

import { MdPhotoAlbum, MdModeEdit, MdDeleteForever } from "react-icons/md";

export default function AlbumTile(props) {
  // Check if this album has at least one media file
  // and if yes display thumbnail of it on the album tile
  let storageLocation;
  if (props.files[0] && props.files[0].storageLocation) {
    storageLocation = props.files[0].storageLocation;
  }
  let dateCreated = props.dateCreated
    ? moment(props.dateCreated).format("MM-DD-YYYY")
    : "";
  return (
    <div className="album-tile">
      <div id={`album-${props.index}`} className="album-tile-container">
        <Link className="album-tile-link" to={`/album/${props.id}`}>
          <div className="album-name">{props.albumName}</div>
          <div className="thumbnail-container">
            <div className="thumbnail">
              <Tooltip message={"Display Album: " + props.albumName} position={"top"}>
                <img
                  src={storageLocation ? storageLocation : ""}
                  alt="Thumbnail"
                />
              </Tooltip>
            </div>
          </div>
          <div className="album-info">
            <p className="album-date-created">{dateCreated}</p>
            <div className="album-comment">
              <Tooltip message={props.comment} position={"top"}>
                <LinesEllipsis
                  text={props.comment}
                  maxLine="5"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              </Tooltip>
            </div>
          </div>
        </Link>
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
