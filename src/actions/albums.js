import { API_BASE_URL } from "../config";
import { SubmissionError } from "redux-form";

export const FETCH_ALBUMS_SUCCESS = "FETCH_ALBUMS_SUCCESS";
export const fetchAlbumsSuccess = albums => ({
  type: FETCH_ALBUMS_SUCCESS,
  albums
});

export const fetchAlbums = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/albums`, {
    method: "GET",
    headers: {
      // Provide user's auth token as credentials
      Authorization: `Bearer ${authToken}`
    }
  })
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
      dispatch(fetchSingleAlbumSuccess(album));
    })
    .catch(err => {
      dispatch(fetchSingleAlbumError(err));
    });
};

export const ADD_ALBUM = "ADD_ALBUM";
export const addAlbum = albumName => ({
  type: ADD_ALBUM,
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

export const updateSingleAlbum = (id, albumName, comment, files) => (
  dispatch,
  getState
) => {
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

export const updateSingleFile = (albumId, fileId, fileName, comment) => (
  dispatch,
  getState
) => {
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
      fileName,
      comment
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

export const awsS3GetSignedRequest = file => dispach => {
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `${API_BASE_URL}/albums/sign-s3?file-name=${encodeURIComponent(
      file.name
    )}&file-type=${encodeURIComponent(file.type)}`
  );
  xhr.setRequestHeader("authorization", "bearer " + localStorage.authToken);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        awsS3UploadFile(file, response.signedRequest, response.url);
      } else {
        alert("Could not get signed URL.");
      }
    }
  };
  xhr.send();
};

export const awsS3UploadFile = (file, signedRequest, url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", signedRequest);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
      } else {
        alert("Could not upload file.");
      }
    }
  };
  xhr.send(file);
};

// TODO: Delete always returns status=200 even if object is not there.
// Therefore we need to check the object's head to confirm that the
// object is not there anymore
export const awsS3DeleteFile = fileName => (dispach) => {
  return fetch(`${API_BASE_URL}/albums/delete-object-s3`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
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
