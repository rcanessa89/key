import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import constants from './constants.app';

// Reducers
import modal from './components/modal/reducer';
import forms from './components/app-form/reducer';

// import textInput from './components/app-form/text-input/reducer';
// import selectInput from './components/app-form/select-input/reducer';

let middleware = applyMiddleware(thunk);

if (constants.environment === 'dev') {
	middleware = applyMiddleware(thunk, logger);
}

const reducers = combineReducers({
	modal,
	forms,
});

export default createStore(reducers, middleware);
