import React from "react";
import { connect } from "react-redux";

import AlbumTile from "./album-tile";
import { Link } from "react-router-dom";

import { fetchAlbums } from "../../actions/albums";

import "./dashboard.css";

import { FaSearch } from "react-icons/fa";

export class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAlbums());
  }

  render() {
    const albums = this.props.albums.map((album, index) => (
      <li key={index} className="col-3">
        <AlbumTile index={index} {...album} />
      </li>
    ));

    return (
      <div className="dashboard centered-container">
        <p>My Albums</p>
        <div>
          <Link to="/newAlbum">Add a New Album</Link>
        </div>
        <div className="search-wrapper">
          <input type="text" className="" placeholder="Search" />
          <button type="submit">
            <FaSearch />
          </button>
        </div>
        <ul className="row albums-container">{albums}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums
});

export default connect(mapStateToProps)(Dashboard);
