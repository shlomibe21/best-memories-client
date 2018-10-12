import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchSingleFile,
  deleteSingleFile,
  awsS3DeleteFile
} from "../../actions/albums";
import requiresLogin from "../authorization/requires-login";

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
      fileName = this.props.file.files[0].fileName;
    }
    return (
      <div>
        <p>Delete File</p>
        <p>Do you really want to delete this file?</p>
        <p>File Name: {fileName}</p>
        <button type="submit" onClick={() => this.deleteFile()}>
          Submit
        </button>
        <Link to={`/album/${this.props.match.params.albumId}`}>
          <button type="button">Cancel</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  file: state.bestmemories.file
});

export default requiresLogin()(connect(mapStateToProps)(DeleteMedia));
