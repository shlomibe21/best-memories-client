import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchSingleFile,
  deleteSingleFile,
  awsS3DeleteFile
} from "../../actions/albums";
import requiresLogin from "../authorization/requires-login";

import "./delete-media.css";

export class DeleteMedia extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      fetchSingleFile(
        `${this.props.match.params.albumId}`,
        `${this.props.match.params.fileId}`
      )
    );
  }

  // TODO: change name to deleteMedia
  deleteFile() {
    return this.props
      .dispatch(awsS3DeleteFile(this.props.file.files[0].fileName))
      .then(res => {
        return this.props.dispatch(
          deleteSingleFile(
            `${this.props.match.params.albumId}`,
            `${this.props.match.params.fileId}`
          )
        );
      })
      .then(() =>
        this.props.history.push(`/album/${this.props.match.params.albumId}`)
      );
  }
  render() {
    let fileName;
    if (this.props.file && this.props.file) {
      fileName = this.props.file.files[0].frontEndFileName;
    }
    return (
      <div className="centered-container centered-text">
        <header role="banner">
          <h1>Delete File</h1>
        </header>
        <h2>Do you really want to delete this file?</h2>
        <div className="delete-file-info">
          <p>{fileName}</p>
        </div>
        <button type="submit" className="btn" onClick={() => this.deleteFile()}>
          Submit
        </button>
        <Link to={`/album/${this.props.match.params.albumId}`}>
          <button type="button" className="btn">
            Cancel
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.bestmemories.file
});

export default requiresLogin()(connect(mapStateToProps)(DeleteMedia));
