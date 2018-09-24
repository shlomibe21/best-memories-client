import React from "react";

import "./new-album.css";

export default function NewAlbum(props) {
  return (
    <form
      method="post"
      enctype="multipart/form-data"
      className="new-album centered-container"
    >
      <div>
        <label for="album-name">Album Name:</label>
        <input type="text" id="album-name" className="form-input" required/>
      </div>
      <div>
        <label for="file">Add New Media:</label>
        <input
          type="file"
          id="file"
          className="form-input btn"
          name="file"
          multiple
        />
      </div>
      <div>
        <button className="btn">Submit</button>
      </div>
      <div className="dragdrop-container">
        To add new media, click on the 'Choose Files' button or drag and drop
        media here!
      </div>
    </form>
  );
}
