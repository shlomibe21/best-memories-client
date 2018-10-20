import * as actions from "../actions/albums";

const initialState = {
  albums: [],
  loading: false
};

export const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ALBUM_SUCCESS:
      return state;
    /*return Object.assign({}, state, {
        albums: [
          ...state.albums,
          {
            albumName: action.albumName,
            files: []
          }
        ]
      });*/
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
    case actions.UPDATE_SINGLE_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        album: action.album
      });
    case actions.DELETE_SINGLE_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        album: action.album
      });
    case actions.FETCH_SINGLE_FILE_SUCCESS:
      return Object.assign({}, state, {
        file: action.file
      });
    /*case actions.DELETE_SINGLE_FILE_SUCCESS:
      let files = state.album.files.map(file => {
        if (file.id !== action.fileId) {
          return file;
        }
        return Object.assign({}, file, {
          album: [...file]
        });
      });
      return Object.assign({}, state, {
        album: [
          state.album,
          {
            files
          }
        ]
      });*/
    case actions.SET_LOADING:
      return Object.assign({}, state, {
        loading: action.loading
      });
    default:
      return state;
  }
};
