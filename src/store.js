import {createStore, applyMiddleware, combineReducers, compose } from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';

import {albumsReducer} from './reducers/albums';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    combineReducers({
        form: formReducer,
        bestmemories: albumsReducer
    }),
    composeEnhancers (applyMiddleware(thunk))
);

export default store;