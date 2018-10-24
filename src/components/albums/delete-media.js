import React from "react";
import { connect } from "react-redux";
import {
  deleteSingleFileRequest,
  deleteSingleFile,
  awsS3DeleteFile
} from "../../actions/albums";
import requiresLogin from "../authorization/requires-login";

import "./delete-media.css";

let file;
export class DeleteMedia extends React.Component {
  deleteFile() {
    return this.props.dispatch(awsS3DeleteFile(file.fileName)).then(res => {
      return this.props.dispatch(
        deleteSingleFile(`${this.props.albumId}`, `${file._id}`)
      );
    });
  }

  cancelDeleteFileReq() {
    this.props.dispatch(deleteSingleFileRequest(false));
  }

  render() {
    file = this.props[this.props.index].props.children.props;
    let fileName = this.props[this.props.index].props.children.props.fileName;
    return (
      <div className="centered-container centered-text">
        <header>
          <h1>Delete File</h1>
        </header>
        <h2>Do you really want to delete this file?</h2>
        <div className="delete-file-info">
          <p>{fileName}</p>
        </div>
        <button type="submit" className="btn" onClick={() => this.deleteFile()}>
          Submit
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => this.cancelDeleteFileReq()}
        >
          Cancel
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.bestmemories.file
});

export default requiresLogin()(connect(mapStateToProps)(DeleteMedia));
