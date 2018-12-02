import React from "react";
import Dropzone from "react-dropzone";

import Tooltip from "./tooltip";

export default class dropzoneArea extends React.Component {
  constructor() {
    super();
    this.state = {
      acceptedFiles: [],
      rejectedFiles: []
    };
  }

  handleDropFiles = (acceptedFiles, rejectedFiles) => {
    this.setState({ acceptedFiles, rejectedFiles });
    this.props.dropzoneAcceptedFiles(acceptedFiles, rejectedFiles);
  };

  render() {
    let rejectedFileList = [];
    if ((this.state.rejectedFiles) && (this.state.rejectedFiles.length > 0)) {
      rejectedFileList = (
        <aside>
          <h2>Rejected files</h2>
          <ul>
            {this.state.rejectedFiles.map((file, i) => (
              <li key={i}>{file.name} bytes</li>
            ))}
          </ul>
        </aside>
      );
    }
    return (
      <section className="dropzone-area">
        <legend>Dropzone</legend>
        <div className="centered-text">
          <Dropzone
            accept="image/*"
            onDrop={this.handleDropFiles}
            className="dropzone"
          >
            <div>Drop files here, or click to select files to upload.</div>
            <hr />
            <ul className="row">
              {this.state.acceptedFiles.map((file, i) => (
                <li className="media-file-wrapper col-3" key={i}>
                  <Tooltip message={file.name} position={"top"}>
                    <div>
                      <img
                        src={file.preview}
                        alt={file.name}
                        key={file.preview}
                      />
                    </div>
                  </Tooltip>
                  <div className="fileName">{file.name}</div>
                </li>
              ))}
            </ul>
          </Dropzone>
          {rejectedFileList}
        </div>
      </section>
    );
  }
}
