import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import {albumsReducer} from './reducers/albums';

//const store = createStore(albumsReducer, applyMiddleware(thunk));
const store = createStore(
    combineReducers({
        form: formReducer,
        albums: albumsReducer
    }),
    applyMiddleware(thunk)
);

export default store;