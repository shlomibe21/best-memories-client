import React from "react";
import { withRouter, Link } from "react-router-dom";
import moment from "moment";
import LinesEllipsis from "react-lines-ellipsis";
import Tooltip from "../common/tooltip";
import { MdPhotoAlbum, MdModeEdit, MdDeleteForever } from "react-icons/md";

import requiresLogin from "../authorization/requires-login";

import "./album-tile.css";

class AlbumTile extends React.Component {
  handleDisplayAlbum = () => {
    this.props.history.push(`/album/${this.props.id}`);
  };

  handleEditAlbum = () => {
    this.props.history.push(`/edit-album/${this.props.id}`);
  };

  handleDeleteAlbum = () => {
    this.props.history.push(`/delete-album/${this.props.id}`);
  };

  render() {
    let filesToDisplay;
    let thumbnailsDisplay;

    // Check if this album has at least one media file
    // and if yes display up to 3 thumbnails on the album tile
    if (this.props.files.length > 0) {
      let thumbnails = [];
      filesToDisplay = this.props.files.slice(0, 3);
      filesToDisplay.map((file, index) => {
        if (index === 0) {
          thumbnails[index] = <img
            src={file.storageLocation}
            alt="Thumbnail"
            key={index}
            className="image1"
          />
        }
        else if (index === 1) {
          thumbnails[index] = <img
            src={file.storageLocation}
            alt="Thumbnail"
            key={index}
            className="image2"
          />
        }
        else if (index === 2) {
          thumbnails[index] = <img
            src={file.storageLocation}
            alt="Thumbnail"
            key={index}
            className="image3"
          />
        }
        return thumbnailsDisplay =
          <div className="flexdiv">
            <div>
              {thumbnails[0]}
            </div>
            <div>
              {thumbnails[1]}
              {thumbnails[2]}
            </div>
          </div>
      });
    } else {
      thumbnailsDisplay = <div className="album-empty-msg">Album is empty!</div>
    }

    let dateCreated = this.props.dateCreated
      ? moment(this.props.dateCreated).format("MM-DD-YYYY")
      : "";
    return (
      <div className="album-tile-container">
        <div id={`album-${this.props.index}`} className="album-tile-content-wrapper">
          <div className="thumbnail-container">
            <div className="thumbnail">
              <Link
                className="album-tile-link"
                to={`/album/${this.props.id}`}
                aria-label="album tile link"
              >
                <Tooltip
                  message={"Click to display album: " + this.props.albumName}
                  position={"top"}
                >
                  {thumbnailsDisplay}
                </Tooltip>
              </Link>
            </div>
          </div>
          <div className="album-meta-data">
            <div className="album-name">{this.props.albumName}</div>
            <div className="album-info">
              <p className="album-date-created">{dateCreated}</p>
              <div className="album-comment">
                <Tooltip message={this.props.comment} position={"top"}>
                  <LinesEllipsis
                    text={this.props.comment}
                    maxLine="4"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="ctrl-icons-wrapper">
          <button
            className="action-icon"
            aria-label="Display Album"
            onClick={this.handleDisplayAlbum}
          >
            <Tooltip message={"Display Album"} position={"top"}>
              <MdPhotoAlbum />
            </Tooltip>
          </button>
          <button
            className="action-icon"
            aria-label="Edit Album"
            onClick={this.handleEditAlbum}
          >
            <Tooltip message={"Edit Album"} position={"top"}>
              <MdModeEdit />
            </Tooltip>
          </button>
          <button
            className="action-icon"
            aria-label="Delete Album"
            onClick={this.handleDeleteAlbum}
          >
            <Tooltip message={"Delete Album"} position={"top"}>
              <MdDeleteForever />
            </Tooltip>
          </button>
        </div>
      </div>
    );
  }
}

AlbumTile.defaultProps = {
  albumName: "[Album Name...] "
};

export default requiresLogin()(withRouter(AlbumTile));
