import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../authorization/requires-login";
import {
  fetchSingleAlbum,
  deleteSingleAlbum,
  awsS3DeleteFile
} from "../../actions/albums";

import "./delete-album.css";

export class DeleteAlbum extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleAlbum(this.props.match.params.index));
  }
  deleteAlbum() {
    let promises = [];
    // If there are files in this album delete them first and only then delete the
    // album's data from the DB
    if (this.props.album.files) {
      promises = this.props.album.files.map((file, i) => {
        return this.props.dispatch(awsS3DeleteFile(file.fileName));
      });
    }
    Promise.all(promises).then(() => {
      this.props
        .dispatch(deleteSingleAlbum(this.props.match.params.index))
        .then(() => this.props.history.push("/dashboard"));
    });
  }

  render() {
    return (
      <div className="centered-container centered-text">
        <header>
          <h1>Delete Album</h1>
        </header>
        <h2>Do you really want to delete this album?</h2>
        <div className="delete-album-info">
          <p>{this.props.album.albumName}</p>
        </div>
        <button
          type="submit"
          className="btn"
          onClick={() => this.deleteAlbum()}
        >
          Submit
        </button>
        <Link to="/dashboard">
          <button type="button" className="btn">
            Cancel
          </button>
        </Link>
      </div>
    );
  }
}

DeleteAlbum.defaultProps = {
  album: {}
};

const mapStateToProps = state => ({
  album: state.bestmemories.album
});

export default requiresLogin()(connect(mapStateToProps)(DeleteAlbum));
