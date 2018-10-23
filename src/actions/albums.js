import { API_BASE_URL } from "../config";
import { SubmissionError } from "redux-form";

import { normalizeResponseErrors } from "./utils";

export const FETCH_ALBUMS_SUCCESS = "FETCH_ALBUMS_SUCCESS";
export const fetchAlbumsSuccess = albums => ({
  type: FETCH_ALBUMS_SUCCESS,
  albums
});

export const SET_LOADING = "SET_LOADING";
export const setLoading = loading => ({
  type: SET_LOADING,
  loading
});

export const fetchAlbums = searchQuery => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/albums?text=${searchQuery}`, {
    method: "GET",
    headers: {
      // Provide user's auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        dispatch(setLoading(false));
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

export const FETCH_SINGLE_ALBUM_ERROR = "FETCH_SINGLE_ALBUM_ERROR";
export const fetchSingleAlbumError = error => ({
  type: FETCH_SINGLE_ALBUM_ERROR,
  error
});

export const fetchSingleAlbum = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/albums/${id}`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(album => {
      dispatch(setLoading(false));
      dispatch(fetchSingleAlbumSuccess(album));
    })
    .catch(err => {
      dispatch(setLoading(false));
      dispatch(fetchSingleAlbumError(err));
    });
};

export const SEARCH_SINGLE_ALBUM_SUCCESS = "SEARCH_SINGLE_ALBUM_SUCCESS";
export const searchSingleAlbumSuccess = album => ({
  type: SEARCH_SINGLE_ALBUM_SUCCESS,
  album
});

export const SEARCH_SINGLE_ALBUM_ERROR = "SEARCH_SINGLE_ALBUM_ERROR";
export const searchSingleAlbumError = error => ({
  type: SEARCH_SINGLE_ALBUM_ERROR,
  error
});

export const searchSingleAlbum = (id, searchQuery) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/albums/search/${id}?text=${searchQuery}`, {
    method: "GET",
    headers: {
      // Provide our auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(album => {
      dispatch(setLoading(false));
      dispatch(searchSingleAlbumSuccess(album));
    })
    .catch(err => {
      dispatch(setLoading(false));
      dispatch(searchSingleAlbumError(err));
    });
};

export const ADD_ALBUM_SUCCESS = "ADD_ALBUM_SUCCESS";
export const addAlbumSuccess = albumName => ({
  type: ADD_ALBUM_SUCCESS,
  albumName
});

export const addNewAlbum = (albumName, dateCreated, comment, files) => (
  dispatch,
  getState
) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/albums`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      albumName,
      dateCreated,
      comment,
      files
    })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      res.json();
      dispatch(setLoading(false));
    })
    .catch(err => {
      const { reason, message } = err;
      dispatch(setLoading(false));
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            _error: message
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

export const updateSingleAlbum = (
  id,
  albumName,
  frontEndFileName,
  comment,
  files
) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/albums/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      id,
      albumName,
      frontEndFileName,
      comment,
      files
    })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
      const { reason, message } = err;
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            _error: message
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

export const deleteSingleAlbum = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/albums/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
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

export const ADD_NEW_FILES_SUCCESS = "ADD_NEW_FILES_SUCCESS";
export const addNewFilesSuccess = files => ({
  type: ADD_NEW_FILES_SUCCESS,
  files
});

export const addNewFiles = (id, files) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  if (files.length === 0) {
    dispatch(setLoading(false));
    return Promise.reject(
      new SubmissionError({
        _error: "Please add files below!"
      })
    );
  }
  return fetch(`${API_BASE_URL}/albums/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      id,
      files
    })
  })
    .then(res => {
      if (!res.ok) {
        dispatch(setLoading(false));
        return Promise.reject(res.statusText);
      }
    })
    .catch(err => {
      const { reason, message } = err;
      if (reason === "ValidationError") {
        // Convert ValidationErrors into SubmissionErrors for Redux Form
        return Promise.reject(
          new SubmissionError({
            _error: message
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

export const FETCH_SINGLE_FILE_LOCAL = "FETCH_SINGLE_FILE_LOCAL";
export const fetchSingleFileLocal = (file, albumId, fileId) => ({
  type: FETCH_SINGLE_FILE_LOCAL,
  file,
  albumId,
  fileId
});

export const FETCH_SINGLE_FILE_SUCCESS = "FETCH_SINGLE_FILE_SUCCESS";
export const fetchSingleFileSuccess = (file, albumId, fileId) => ({
  type: FETCH_SINGLE_FILE_SUCCESS,
  file,
  albumId,
  fileId
});

export const fetchSingleFile = (albumId, fileId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/albums/${albumId}/${fileId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(file => {
      dispatch(fetchSingleFileSuccess(file));
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
          _error: "Error: couldn't delete file"
        })
      );
    });
};

export const UPDATE_SINGLE_FILE_REQUEST = "UPDATE_SINGLE_FILE_REQUEST";
export const updateSingleFileRequest = updatingFile => ({
  type: UPDATE_SINGLE_FILE_REQUEST,
  updatingFile
});

export const UPDATE_SINGLE_FILE_SUCCESS = "UPDATE_SINGLE_FILE_SUCCESS";
export const updateSingleFileSuccess = updatingFile => ({
  type: UPDATE_SINGLE_FILE_SUCCESS,
  updatingFile
});

export const updateSingleFile = (
  albumId,
  fileId,
  frontEndFileName,
  comment
) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/albums/${albumId}/${fileId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      albumId,
      fileId,
      frontEndFileName,
      comment
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      dispatch(fetchSingleAlbum(albumId));
    })
    .then(() => {
        dispatch(updateSingleFileSuccess(albumId, fileId));
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

export const DELETE_SINGLE_FILE_REQUEST = "DELETE_SINGLE_FILE_REQUEST";
export const deleteSingleFileRequest = deletingFile => ({
  type: DELETE_SINGLE_FILE_REQUEST,
  deletingFile
});

export const DELETE_SINGLE_FILE_SUCCESS = "DELETE_SINGLE_FILE_SUCCESS";
export const deleteSingleFileSuccess = (albumId, fileId) => ({
  type: DELETE_SINGLE_FILE_SUCCESS,
  albumId,
  fileId
});

export const deleteSingleFile = (albumId, fileId) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/albums/${albumId}/${fileId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({
      albumId,
      fileId
    })
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      dispatch(fetchSingleAlbum(albumId));
    })
    .then(() => {
      dispatch(deleteSingleFileSuccess(albumId, fileId));
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
          _error: "Error: couldn't delete file"
        })
      );
    });
};

export const awsS3GetSignedRequest = (file, fileName) => dispatch => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      `${API_BASE_URL}/albums/sign-s3?file-name=${encodeURIComponent(
        fileName
      )}&file-type=${encodeURIComponent(file.type)}`
    );
    xhr.setRequestHeader("authorization", "bearer " + localStorage.authToken);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          awsS3UploadFile(
            file,
            response.signedRequest,
            response.url,
            resolve,
            reject
          );
        } else {
          dispatch(setLoading(false));
          reject("Could not get signed URL.");
        }
      }
    };
    xhr.send();
  });
};

export const awsS3UploadFile = (file, signedRequest, url, resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve();
      } else {
        reject(xhr.responseText);
      }
    }
  };
  xhr.send(file);
};

// TODO: Delete always returns status=200 even if object is not there.
// Therefore we need to check the object's head to confirm that the
// object is not there anymore
export const awsS3DeleteFile = fileName => dispatch => {
  return fetch(`${API_BASE_URL}/albums/delete-object-s3`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fileName
    })
  })
    .then(res => {
      if (res.status !== 200) {
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
      return Promise.reject();
    });
};
