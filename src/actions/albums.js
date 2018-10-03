import { API_BASE_URL } from "../config";
import { SubmissionError } from "redux-form";

export const FETCH_ALBUMS_SUCCESS = "FETCH_ALBUMS_SUCCESS";
export const fetchAlbumsSuccess = albums => ({
  type: FETCH_ALBUMS_SUCCESS,
  albums
});

export const fetchAlbums = () => dispatch => {
  fetch(`${API_BASE_URL}/albums`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(albums => {
      dispatch(fetchAlbumsSuccess(albums.albums));
    });
};

export const FETCH_SINGLE_ALBUM_SUCCESS = "FETCH_SINGLE_ALBUM_SUCCESS";
export const fetchSingleAlbumSuccess = album => ({
  type: FETCH_SINGLE_ALBUM_SUCCESS,
  album
});

export const fetchSingleAlbum = id => dispatch => {
  fetch(`${API_BASE_URL}/albums/${id}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(album => {
      dispatch(fetchSingleAlbumSuccess(album));
    })
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
      return Promise.reject(
        new SubmissionError({
          _error: "Error: couldn't delete album"
        })
      );
    });
};

export const ADD_ALBUM = "ADD_ALBUM";
export const addAlbum = albumName => ({
  type: ADD_ALBUM,
  albumName
});

export const addNewAlbum = (
  albumName,
  dateCreated,
  comment,
  files
) => dispatch => {
  return fetch(`${API_BASE_URL}/albums`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      albumName,
      dateCreated,
      comment,
      files
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
    })
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
      return Promise.reject(
        new SubmissionError({
          _error: "Error: couldn't create a new album"
        })
      );
    });
};

export const UPDATE_SINGLE_ALBUM_SUCCESS = "UPDATE_SINGLE_ALBUM_SUCCESS";
export const updateSingleAlbumSuccess = album => ({
  type: UPDATE_SINGLE_ALBUM_SUCCESS,
  album
});

export const updateSingleAlbum = (id, albumName, comment, files) => dispatch => {
  return fetch(`${API_BASE_URL}/albums/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id,
      albumName,
      comment,
      files
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
    })
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
      return Promise.reject(
        new SubmissionError({
          _error: "Error: couldn't update album"
        })
      );
    });
};

export const DELETE_SINGLE_ALBUM_SUCCESS = "DELETE_SINGLE_ALBUM_SUCCESS";
export const deleteSingleAlbumSuccess = album => ({
  type: DELETE_SINGLE_ALBUM_SUCCESS,
  album
});

export const deleteSingleAlbum = id => dispatch => {
  return fetch(`${API_BASE_URL}/albums/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
    })
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
      return Promise.reject(
        new SubmissionError({
          _error: "Error: couldn't delete album"
        })
      );
    });
};
