import * as actions from "../actions/albums";

const initialState = {
  albums: []
};

export const albumsReducer = (state = initialState, action) => {
  if (action.type === actions.FETCH_ALBUMS_SUCCESS) {
    return action.albums;
  }
  return state;
};
