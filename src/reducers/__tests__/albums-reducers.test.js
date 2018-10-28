import { albumsReducer } from "../albums";
import * as actions from "../../actions/albums";

const albumName1 = "album 1 test";
const fileName1 = "file 1 test";
const fileName2 = "file 2 test";

const album1 = {
  albumName: albumName1,
  files: []
};

const album2 = {
  albumName: albumName1,
  files: [fileName1, fileName2]
};

const albums = [album1, album2];

const file1 = {
  fileName: fileName1
};

const file2 = {
  fileName: fileName2
};

describe("albumsReducer", () => {
  it("Should set the initial state when nothing is passed in", () => {
    const state = albumsReducer(undefined, { type: "__UNKNOWN" });
    expect(state).toEqual({
      albums: [],
      loading: false
    });
  });

  it("Should return the current state on an unknown action", () => {
    let currentState = {};
    const state = albumsReducer(currentState, { type: "__UNKNOWN" });
    expect(state).toBe(currentState);
  });

  describe("fetchAlbumsSuccess", () => {
    it("Should handle fetch albums success", () => {
      let state;
      state = albumsReducer(state, actions.fetchAlbumsSuccess(albums));
      expect(state.albums).toEqual(albums);
    });
  });

  describe("fetchSingleAlbumSuccess", () => {
    it("Should handle fetch album success", () => {
      const album = {albumName: "name", dateAdded:12/12/2012, files:[]};
      let state;
      state = albumsReducer(state, actions.fetchSingleAlbumSuccess(album));
      expect(state.loading).toEqual(false);
      expect(state.album).toEqual(album);
    });
  });

  describe("fetchSingleAlbumError", () => {
    it("Should handle fetch album error", () => {
      const error = "Error";
      let state;
      state = albumsReducer(state, actions.fetchSingleAlbumError(error));
      expect(state.error).toEqual("Error");
    });
  });

  describe("updateSingleAlbumSuccess", () => {
    it("Should handle update album success", () => {
      const album = {albumName: "name", dateAdded:12/12/2012, files:[]};
      let state;
      state = albumsReducer(state, actions.updateSingleAlbumSuccess(album));
      expect(state.loading).toEqual(false);
      expect(state.album).toEqual(album);
    });
  });

  describe("updateSingleFileRequest", () => {
    it("Should handle update single file request", () => {
      let state;
      state = albumsReducer(state, actions.updateSingleFileRequest(true));
      expect(state.updatingFile).toEqual(true);
    });
  });

  describe("updateSingleFileSuccess", () => {
    it("Should handle update single file success", () => {
      let state;
      state = albumsReducer(state, actions.updateSingleFileSuccess(false));
      expect(state.updatingFile).toEqual(false);
    });
  });

  describe("deleteSingleFileRequest", () => {
    it("Should handle delete single file request", () => {
      let state;
      state = albumsReducer(state, actions.deleteSingleFileRequest(true));
      expect(state.deletingFile).toEqual(true);
    });
  });

  describe("setLoading", () => {
    it("Should replace the loading state", () => {
      let state;
      state = albumsReducer(state, actions.setLoading(false));
      expect(state.loading).toEqual(false);
    });
  });
});
