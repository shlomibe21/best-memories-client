import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../authorization/requires-login";
import MediaFile from "./media-file";
import { fetchSingleAlbum } from "../../actions/albums";

import "./album.css";

import { FaSearch } from "react-icons/fa";
import MediaLightbox from "./media-lightbox";

export class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      displayLightbox: false,
      index: 0
    };
  }

  componentDidMount() {
    this.props.dispatch(
      fetchSingleAlbum(this.props.match.params.index)
    );
  }

  search(query) {
    console.log("search");
    fetchSingleAlbum(this.props.match.params.index);
  }

  updateInputValue(evt) {
    this.setState({
      searchValue: evt.target.value
    });
    this.props.dispatch(
      fetchSingleAlbum(this.props.match.params.index)
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
    console.log("DONT DISPLAY!!!");
    this.setState({
      displayLightbox: false
    });
  }
  render() {
    const files = this.props.album.files.map((file, index) => (
      <li key={index} className="col-3">
        <MediaFile
          index={index}
          albumIndex={this.props.match.params.index}
          {...file}
          displayLightboxClicked={this.displayLightboxHandler.bind(this, index)}
        />
      </li>
    ));

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

    return (
      <div className="centered-container centered-text">
        <p>{this.props.album.albumName}</p>
        <div className="selection-area">
          <Link to="/dashboard">Dashboard</Link>
          <Link to={`/new-files/${this.props.album.id}`}>Add Files</Link>
        </div>
        <div className="search-wrapper">
          <input
            type="text"
            className=""
            placeholder="Search by media name"
            value={this.state.searchValue}
            onChange={evt => this.updateInputValue(evt)}
          />
          <button type="submit">
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
  album: state.bestmemories.album
});

export default requiresLogin()(connect(mapStateToProps)(Album));
