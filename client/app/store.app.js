import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import constants from './constants.app';

// Reducers
import modal from './components/modal/reducer';

let middleware = applyMiddleware(thunk);

if (constants.environment === 'dev') {
	middleware = applyMiddleware(thunk, logger);
}

const reducers = combineReducers({
	modal,
});

export default createStore(reducers, middleware);
