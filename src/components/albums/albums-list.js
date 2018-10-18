import React from "react";

import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function albumsList(props) {
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
      <ul className="row album-container">{this.props.files} </ul>
    </div>
  );
}
