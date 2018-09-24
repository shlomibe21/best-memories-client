import React from "react";

import "./edit-media.css"

export default function EditMedia(props) {
  return (
    <div className="edit-media-file centered-container">
      <img
        className="media-file"
        src="./images/ATT-OCTET-ST1.JPG"
        alt="Media File"
      />
      <div>
        <input type="text" className="form-input" placeholder="Name" />
      </div>
      <div>
        <input type="date" className="form-input" placeholder="date" />
      </div>
      <div>
        <textarea className="form-input" placeholder="Description" />
      </div>
      <div>
        <button className="btn">Submit</button>
      </div>
    </div>
  );
}

//<img className="media-file" src={props.mediaFile} alt="Media File" />
