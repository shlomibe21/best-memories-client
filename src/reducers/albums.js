import * as actions from "../actions/albums";

const initialState = {
  albums: [],
  album: {files: []}
};

export const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_ALBUM:
      return Object.assign({}, state, {
        albums: [
          ...state.albums,
          {
            albumName: action.albumName,
            files: []
          }
        ]
      });
    case actions.FETCH_ALBUMS_SUCCESS:
      return Object.assign({}, state, {
        albums: action.albums
      });
    case actions.FETCH_SINGLE_ALBUM_SUCCESS:
      return Object.assign({}, state, {
        album: action.album
      });
    default:
      return state;
  }
};
