import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSingleAlbum } from "../actions/albums";
import { deleteSingleAlbum } from "../actions/albums";

export class DeleteAlbum extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleAlbum(this.props.match.params.index));
  }
  deleteAlbum() {
    this.props.dispatch(deleteSingleAlbum(this.props.match.params.index));
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
  album: state.bestmemories.album,
});

export default connect(mapStateToProps)(DeleteAlbum);
