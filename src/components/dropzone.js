import React from "react";
import Dropzone from "react-dropzone";

import "./dropzone.css";

export const renderDropzoneInput = field => {
  const files = field.input.value;
  if (files) {
    files.map(file => console.log("file name: ", file.name));
  }
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
        className="dropzone"
      >
        <div>Drop files here, or click to select files to upload.</div>
        {field.meta.touched &&
          field.meta.error && <span className="error">{field.meta.error}</span>}
        {files &&
          Array.isArray(files) && (
            <ul>
              {files.map((file, i) => (
                <li className="media-file-wrapper" key={i}>
                  <div>
                    <img src={file.preview} alt="file preview" />
                  </div>
                  <div>{file.name}</div>
                </li>
              ))}
            </ul>
          )}
      </Dropzone>
    </div>
  );
};
