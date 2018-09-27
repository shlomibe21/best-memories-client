import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';

import {albumsReducer} from './reducers';

export default createStore(albumsReducer, applyMiddleware(thunk));
