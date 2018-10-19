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
      searchValue: "",
      uploading: true
    };
  }

  componentDidMount() {
    return fetch(this.props.dispatch(fetchAlbums(this.state.searchValue))).then(
      () => {
        this.setState({
          uploading: false
        });
      }
    );
  }

  search(query) {
    //console.log("search");
    this.props.dispatch(fetchAlbums(this.state.searchValue));
  }

  updateInputValue(evt) {
    this.setState({
      searchValue: evt.target.value
    });
    this.props.dispatch(fetchAlbums(evt.target.value));
  }

  render() {
    let addNewAlbumLink;
    let searchComponent;
    let emptyPageMsg;
    const albums = this.props.albums.map((album, index) => (
      <li key={index} className="col-3">
        <AlbumTile index={index} {...album} />
      </li>
    ));
    if (albums.length > 0 || this.state.searchValue.length > 0) {
      addNewAlbumLink = (
        <div>
          <Link to="/new-album">Add a New Album</Link>
        </div>
      );
      searchComponent = (
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
      );
    } else {
      emptyPageMsg = (
        <div className="emapty-page-msg">
          <p>Hey, It is empty in here! </p>
          <p> click on the image below to start building your best memories.</p>
          <Link to="/new-album">
            <img
              src={require("../../images/pic_the_scream.png")}
              alt="Empty page"
            />
          </Link>
        </div>
      );
    }

    if (this.state.uploading) {
      return <div className="spinnerModal" />;
    }
    return (
      <div className="dashboard centered-container centered-text">
        <header role="banner">
          <h1>My Albums</h1>
        </header>
        {addNewAlbumLink}
        {searchComponent}
        {emptyPageMsg}
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
