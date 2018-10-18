import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../authorization/requires-login";
import AlbumTile from "./album-tile";
import { fetchAlbums } from "../../actions/albums";
import { FaSearch } from "react-icons/fa";

import "./dashboard.css";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchAlbums(this.state.searchValue));
  }

  search(query) {
    console.log("search");
    this.props.dispatch(fetchAlbums(this.state.searchValue));
  }

  updateInputValue(evt) {
    this.setState({
        searchValue: evt.target.value
    });
    this.props.dispatch(fetchAlbums(evt.target.value));
  }

  render() {
    const albums = this.props.albums.map((album, index) => (
      <li key={index} className="col-3">
        <AlbumTile index={index} {...album} />
      </li>
    ));

    return (
      <div className="dashboard centered-container centered-text">
        <p>My Albums</p>
        <div className="dashboard-username">
          Username: {this.props.username}
        </div>
        <div>
          <Link to="/new-album">Add a New Album</Link>
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            className=""
            placeholder="Search by album name"
            value={this.state.searchValue}
            onChange={evt => this.updateInputValue(evt)}
          />
          <button type="submit" onClick={() => this.search()}>
            <FaSearch />
          </button>
        </div>
        <ul className="row albums-container">{albums}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    albums: state.bestmemories.albums
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
