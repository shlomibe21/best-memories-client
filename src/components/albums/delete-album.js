import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import requiresLogin from "../authorization/requires-login";
import { fetchSingleAlbum, deleteSingleAlbum, awsS3DeleteFile } from "../../actions/albums";

export class DeleteAlbum extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleAlbum(this.props.match.params.index));
  }
  deleteAlbum() {
    let promises = [];
    // If there are files in this album delete then first and only then delete the 
    // album's data from the DB
    if (this.props.album.files.length > 0) {
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
      <div>
        <p>Delete Album</p>
        <p>Do you really want to delete this album?</p>
        <p>{this.props.album.albumName}</p>
        <button type="submit" onClick={() => this.deleteAlbum()}>
          Submit
        </button>
        <Link to="/dashboard">
          <button type="button">Cancel</button>
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
