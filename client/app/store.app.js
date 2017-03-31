import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import constants from './constants.app';

// Reducers
import modal from './components/modal/reducer';
import form from './components/app-form/text-input/reducer';

let middleware = applyMiddleware(thunk);

if (constants.environment === 'dev') {
	middleware = applyMiddleware(thunk, logger);
}

const reducers = combineReducers({
	modal,
	form,
});

export default createStore(reducers, middleware);
