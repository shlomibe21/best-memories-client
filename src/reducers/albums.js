import * as actions from "../actions/albums";

const initialState = {
  albums: []
};

export const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ALBUM:
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
        album: action.album,
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
    default:
      return state;
  }
};
