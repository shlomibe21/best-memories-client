import {API_BASE_URL} from '../config';

export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const fetchAlbumsSuccess = albums => ({
    type: FETCH_ALBUMS_SUCCESS,
    albums
});

export const fetchAlbums = () => dispatch => {
    fetch(`${API_BASE_URL}/albums`) 
    .then(res => {
        if(!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    })
    .then(albums => {
        dispatch(fetchAlbumsSuccess(albums));
    });
};