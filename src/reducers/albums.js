import * as actions from "../actions/albums";

const initialState = {
  albums: [],
  loading: false
};

export const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ALBUM_SUCCESS:
      return state;
    case actions.FETCH_ALBUMS_SUCCESS:
      return Object.assign({}, state, {
        albums: action.albums
      });
    case actions.FETCH_SINGLE_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        album: action.album
      });
    case actions.FETCH_SINGLE_ALBUM_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });
    case actions.SEARCH_SINGLE_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        album: action.album
      });
    case actions.UPDATE_SINGLE_FILE_REQUEST:
      return Object.assign({}, state, {
        updatingFile: action.updatingFile
      });
    case actions.UPDATE_SINGLE_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        album: action.album
      });
    case actions.DELETE_SINGLE_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        album: action.album
      });
    case actions.FETCH_SINGLE_FILE_LOCAL:
      return Object.assign({}, state, {
        file: action.file
      });
    case actions.FETCH_SINGLE_FILE_SUCCESS:
      return Object.assign({}, state, {
        file: action.file
      });
    case actions.UPDATE_SINGLE_FILE_SUCCESS:
      return Object.assign({}, state, {
        updatingFile: false
      });
    case actions.DELETE_SINGLE_FILE_REQUEST:
      return Object.assign({}, state, {
        deletingFile: action.deletingFile
      });
    case actions.DELETE_SINGLE_FILE_SUCCESS:
      return Object.assign({}, state, {
        deletingFile: false
      });
    case actions.SET_LOADING:
      return Object.assign({}, state, {
        loading: action.loading
      });
    default:
      return state;
  }
};
