import { API_BASE_URL } from "../config";
import { SubmissionError } from 'redux-form';

export const ADD_ALBUM = "ADD_ALBUM";
export const addAlbum = albumName => ({
  type: ADD_ALBUM,
  albumName
});

export const addNewAlbum = (albumName, dateCreated, comment, files) => dispatch => {
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
      dispatch(fetchAlbumsSuccess(albums));
    });
};
