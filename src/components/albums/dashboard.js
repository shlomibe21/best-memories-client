import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../authorization/requires-login";
import AlbumTile from "./album-tile";
import { fetchAlbums, setLoading } from "../../actions/albums";
import { FaSearch } from "react-icons/fa";

import "./dashboard.css";

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        searchQuery: "",
    };
  }

  componentWillMount() {
    this.props.dispatch(setLoading(true));
  }

  componentDidMount() {
    return fetch(this.props.dispatch(fetchAlbums(this.state.searchQuery))).then(
      () => {
        this.props.dispatch(setLoading(false));
      }
    );
  }

  search(query) {
    //console.log("search");
    this.props.dispatch(fetchAlbums(this.state.searchQuery));
  }

  updateQueryValue(evt) {
    this.setState({
        searchQuery: evt.target.value
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
    if (albums.length > 0 || this.state.searchQuery.length > 0) {
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
            aria-label="Search by album name"
            placeholder="Search by album name"
            value={this.state.searchQuery}
            onChange={evt => this.updateQueryValue(evt)}
          />
          <button type="submit" aria-label="Search Albums" onClick={() => this.search()}>
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

    if (this.props.loading) {
      return <div className="spinnerModal" />;
    }
    return (
      <div className="dashboard centered-container centered-text" aria-live="polite">
        <header>
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
    loading: state.bestmemories.loading,
    albums: state.bestmemories.albums
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
