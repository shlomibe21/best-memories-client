import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../authorization/requires-login";
import MediaFile from "./media-file";
import { searchSingleAlbum, setLoading } from "../../actions/albums";

import "./album.css";

import { FaSearch } from "react-icons/fa";
import MediaLightbox from "./media-lightbox";

export class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      displayLightbox: false,
      index: 0
    };
  }

  componentWillMount() {
    this.props.dispatch(setLoading(true));
  }

  componentDidMount() {
    return fetch(
      this.props
        .dispatch(
            searchSingleAlbum(
            this.props.match.params.index,
            this.state.searchQuery
          )
        )
        .then(() => {
          this.props.dispatch(setLoading(false));
        })
    );
  }

  search(query) {
    console.log("search");
    this.props.dispatch(searchSingleAlbum(this.props.match.params.index, this.state.searchQuery));
  }

  updateInputValue(evt) {
    this.setState({
      searchQuery: evt.target.value
    });
    this.props.dispatch(
        searchSingleAlbum(this.props.match.params.index, evt.target.value)
    );
  }

  displayLightboxHandler(index) {
    console.log(index);
    this.setState({
      displayLightbox: true,
      index: index
    });
  }

  closeLightboxHandler() {
    this.setState({
      displayLightbox: false
    });
  }
  render() {
    let files;
    if (this.props.album.files) {
      files = this.props.album.files.map((file, index) => (
        <li key={index} className="col-3">
          <MediaFile
            index={index}
            albumIndex={this.props.match.params.index}
            {...file}
            displayLightboxClicked={this.displayLightboxHandler.bind(
              this,
              index
            )}
          />
        </li>
      ));
    }

    let lightBox;
    if (this.state.displayLightbox) {
      lightBox = (
        <MediaLightbox
          index={this.state.index}
          {...files}
          hideLightboxClicked={this.closeLightboxHandler.bind(this)}
        />
      );
    }

    if (this.props.loading) {
      return <div className="spinnerModal" />;
    }
    return (
      <div className="centered-container centered-text">
        <header role="banner">
          <h1>{this.props.album.albumName}</h1>
        </header>
        <div className="selection-area">
          <Link to="/dashboard">Dashboard</Link>
          <Link to={`/new-files/${this.props.album.id}`}>Add Files</Link>
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            className=""
            placeholder="Search by media name"
            value={this.state.searchQuery}
            onChange={evt => this.updateInputValue(evt)}
          />
          <button type="submit" onClick={() => this.search()}>
            <FaSearch />
          </button>
        </div>
        <ul className="row album-container">{files} </ul>
        {lightBox}
      </div>
    );
  }
}

Album.defaultProps = {
  album: { files: [] }
};

const mapStateToProps = state => ({
  loading: state.bestmemories.loading,
  album: state.bestmemories.album
});

export default requiresLogin()(connect(mapStateToProps)(Album));
