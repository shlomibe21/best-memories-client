import React from "react";
import Dropzone from "react-dropzone";

import MediaFile from "../albums/media-file";
let files;
export default class FilesUploadScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      filesToBeSent: [],
      filesUploadLimit: 10000
    };
  }

  handleDropFiles = (acceptedFiles, rejectedFiles) => {
    var filesToBeSent = this.state.filesToBeSent;
    if (rejectedFiles) {
      // TODO: display a message with the rejected files
      rejectedFiles.map(file => console.log("Rejected files: ", file.name));
    }
    if (acceptedFiles) {
      if (filesToBeSent.length < this.state.filesUploadLimit) {
        acceptedFiles.map((file, i) => {
          console.log("Accepted files: ", file.name);
          filesToBeSent.push({ file });
          return filesToBeSent;
        });
        this.setState({ filesToBeSent });
      } else {
        alert(
          `Maximum number of files to add is: ${this.state.filesUploadLimit}`
        );
      }
    }
  };

  handleSubmit() {
    console.log("add file on submit", this.state.filesToBeSent);
    this.props.onAdd(this.state.filesToBeSent);
    this.setState({
      editing: false
    });
  }

  toggleEditing(editing) {
    this.setState({
      editing
    });
  }

  initEditing() {
    this.setState({
      editing: true,
      filesToBeSent: []
    });
  }

  render() {
    if (!this.state.editing) {
      if (this.state.filesToBeSent) {
        /*this.props.initialValues.dateCreated = moment(
          this.props.initialValues.dateCreated
        ).format("YYYY-MM-DD");*/
        files = this.state.filesToBeSent.map((file, index) => (
          <li key={index} className="col-3">
            <MediaFile index={index} {...file} />
          </li>
        ));
      }
      return (
        <div>
          <ul className="row album-container">{files}</ul>
          <button
            type="button"
            className="add-button"
            onClick={() => this.initEditing()}
          >
            New Files {this.props.type}
          </button>
        </div>
      );
    }
    return (
      <div className="App">
        <Dropzone
          onSubmit={this.onSubmit}
          onDrop={this.handleDropFiles}
          multiple
          accept="image/jpeg, image/png"
          className="dropzone"
        >
          <div>Drop files here, or click to select files to upload.</div>
          {this.state.filesToBeSent &&
            Array.isArray(this.state.filesToBeSent) && (
              <ul>
                {this.state.filesToBeSent.map((file, i) => (
                  <li className="media-file-wrapper" key={i}>
                    <div>
                      <img src={file.file.preview} alt="file preview" />
                    </div>
                    <div>{file.file.name}</div>
                  </li>
                ))}
              </ul>
            )}
        </Dropzone>
        <button type="button" onClick={() => this.handleSubmit(false)}>
          Add
        </button>
        <button type="button" onClick={() => this.toggleEditing(false)}>
          Cancel
        </button>
      </div>
    );
  }
}
