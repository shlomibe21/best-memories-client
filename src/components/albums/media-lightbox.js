import React from "react";
import ExifOrientationImg from 'react-exif-orientation-img'

import requiresLogin from "../authorization/requires-login";

import "./media-lightbox.css";

export class mediaLightBox extends React.Component {
  render() {
    return (
      <div className="modal">
        <div className="centered-content">
          <div className="media-wrapper">
            <ExifOrientationImg
              src={
                this.props[this.props.index].props.children.props
                  .storageLocation
              }
              alt="media file"
            />
          </div>
        </div>
        <button
          type="button"
          className="modal-close"
          onClick={this.props.hideLightboxClicked}
        >
          X
        </button>
      </div>
    );
  }
}

export default requiresLogin()(mediaLightBox);
