import * as actions from "../actions/albums";

const initialState = {
  albums: [],
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
        album: action.album
      });
    case actions.UPDATE_SINGLE_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        album: action.album
      });
    case actions.DELETE_SINGLE_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        album: action.album
      });
    default:
      return state;
  }
};
