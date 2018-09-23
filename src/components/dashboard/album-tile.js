import React from "react";

import "./album-tile.css";

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
            <MdPhotoAlbum />
          </button>
          <button>
            <MdModeEdit />
          </button>
          <button>
            <MdDeleteForever />
          </button>
        </div>
      </div>
    </div>
  );
}
