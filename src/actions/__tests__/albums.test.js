import * as actions from "../albums.js";

describe("fetchAlbumsSuccess", () => {
  it("Should return the action", () => {
    const albums = {};
    const action = actions.fetchAlbumsSuccess(albums);
    expect(action.type).toEqual(actions.FETCH_ALBUMS_SUCCESS);
    expect(action.albums).toEqual(albums);
  });
});

describe("fetchSingleAlbumSuccess", () => {
  it("Should return the action", () => {
    const album = {
      files: []
    };
    const action = actions.fetchSingleAlbumSuccess(album);
    expect(action.type).toEqual(actions.FETCH_SINGLE_ALBUM_SUCCESS);
    expect(action.album).toEqual(album);
  });
});

describe("fetchSingleAlbumError", () => {
  it("Should return the action", () => {
    const error = "Error";
    const action = actions.fetchSingleAlbumError(error);
    expect(action.type).toEqual(actions.FETCH_SINGLE_ALBUM_ERROR);
    expect(action.error).toEqual(error);
  });
});

describe("addAlbumSuccess", () => {
  it("Should return the action", () => {
    const albumName = "Album Name";
    const action = actions.addAlbumSuccess(albumName);
    expect(action.type).toEqual(actions.ADD_ALBUM_SUCCESS);
    expect(action.albumName).toEqual(albumName);
  });
});

describe("updateSingleAlbumSuccess", () => {
  it("Should return the action", () => {
    const album = {};
    const action = actions.updateSingleAlbumSuccess(album);
    expect(action.type).toEqual(actions.UPDATE_SINGLE_ALBUM_SUCCESS);
    expect(action.album).toEqual(album);
  });
});

describe("deleteSingleAlbumSuccess", () => {
  it("Should return the action", () => {
    const album = {};
    const action = actions.deleteSingleAlbumSuccess(album);
    expect(action.type).toEqual(actions.DELETE_SINGLE_ALBUM_SUCCESS);
    expect(action.album).toEqual(album);
  });
});

describe("addNewFilesSuccess", () => {
    it("Should return the action", () => {
      const files = {};
      const action = actions.addNewFilesSuccess(files);
      expect(action.type).toEqual(actions.ADD_NEW_FILES_SUCCESS);
      expect(action.files).toEqual(files);
    });
  });