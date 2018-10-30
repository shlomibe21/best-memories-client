import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import requiresLogin from "../authorization/requires-login";
import MediaFile from "./media-file";
import EditeMedia from "./edit-media";
import DeleteMedia from "./delete-media";
import {
  searchSingleAlbum,
  setLoading,
  updateSingleFileRequest,
  deleteSingleFileRequest
} from "../../actions/albums";

import "./album.css";

import { FaSearch } from "react-icons/fa";
import MediaLightbox from "./media-lightbox";

export class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      displayLightbox: false,
      index: 0,
    };
  }

  componentWillMount() {
    this.props.dispatch(setLoading(true));
    this.props.dispatch(deleteSingleFileRequest(false));
    this.props.dispatch(updateSingleFileRequest(false));
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
    this.props.dispatch(
      searchSingleAlbum(this.props.match.params.index, this.state.searchQuery)
    );
  }

  updateQueryValue(evt) {
    this.setState({
      searchQuery: evt.target.value
    });
    this.props.dispatch(
      searchSingleAlbum(this.props.match.params.index, evt.target.value)
    );
  }

  displayLightboxHandler(index) {
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

  handleUpdateFile(index) {
    this.setState({
      index: index
    });
    this.props.dispatch(updateSingleFileRequest(true));
  }

  handleDeleteFile(index) {
    this.setState({
      index: index
    });
    this.props.dispatch(deleteSingleFileRequest(true));
  }

  render() {
    let files;
    if (this.props.album.files) {
      files = this.props.album.files.map((file, index) => (
        <li key={index}>
          <MediaFile
            index={index}
            albumIndex={this.props.match.params.index}
            {...file}
            displayLightboxClicked={() => this.displayLightboxHandler(index)}
            updateFileButtonClicked={() =>
              this.handleUpdateFile(index, ...file)
            }
            deleteFileButtonClicked={() =>
              this.handleDeleteFile(index, ...file)
            }
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
          hideLightboxClicked={() => this.closeLightboxHandler()}
        />
      );
    }

    if (this.props.loading) {
      return <div className="spinnerModal" />;
    } else if (this.props.updatingFile) {
      return (
        <EditeMedia
          albumId={this.props.match.params.index}
          index={this.state.index}
          {...files}
        />
      );
    } else if (this.props.deletingFile) {
      return (
        <DeleteMedia
          albumId={this.props.match.params.index}
          index={this.state.index}
          {...files}
        />
      );
    }
    return (
      <div className="centered-container centered-text" aria-live="polite">
        <header>
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
            aria-label="Search by media name"
            value={this.state.searchQuery}
            onChange={evt => this.updateQueryValue(evt)}
          />
          <button type="submit" aria-label="submit" onClick={() => this.search()}>
            <FaSearch />
          </button>
        </div>
        <ul className="album-container">{files} </ul>
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
  updatingFile: state.bestmemories.updatingFile,
  deletingFile: state.bestmemories.deletingFile,
  album: state.bestmemories.album
});

export default requiresLogin()(connect(mapStateToProps)(Album));
