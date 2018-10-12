import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../authorization/requires-login";
import MediaFile from "./media-file";
import { fetchSingleAlbum } from "../../actions/albums";

import "./album.css";

import { FaSearch } from "react-icons/fa";

export class Album extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleAlbum(this.props.match.params.index));
  }

  render() {
    const files = this.props.album.files.map((file, index) => (
      <li key={index} className="col-3">
        <MediaFile index={index} albumIndex = {this.props.match.params.index} {...file} />
      </li>
    ));

    return (
      <div className="centered-container">
        <p>{this.props.album.albumName}</p>
        <div className="selection-area">
          <Link to="/dashboard">Dashboard</Link>
          <Link to={`/new-files/${this.props.album.id}`}>Add Files</Link>
        </div>
        <div className="search-wrapper">
          <input type="text" className="" placeholder="Search" />
          <button type="submit">
            <FaSearch />
          </button>
        </div>
        <ul className="row album-container">{files}</ul>
      </div>
    );
  }
}

Album.defaultProps = {
  album: { files: [] }
};

const mapStateToProps = state => ({
  album: state.bestmemories.album
});

export default requiresLogin()(connect(mapStateToProps)(Album));
