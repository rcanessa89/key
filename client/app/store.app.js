import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import constants from './constants.app';
import storeSubscribeEvents from './services/store-subscribe-events';

// Reducers
import modal from './components/modal/reducer';
import forms from './components/app-form/reducer';
import mobileNav from './components/mobile-nav/reducer';
import header from './components/app-header/reducer';
import loading from './components/loading/reducer';
import { loggedReducer } from './services/user-logged';
import { companyLoggedReducer } from './services/company-logged';

let middleware = applyMiddleware(thunk);

if (constants.environment === 'dev') {
	middleware = applyMiddleware(thunk, logger);
}

const reducers = combineReducers({
	modal,
	forms,
	mobileNav,
	header,
	loading,
	user: loggedReducer,
	company: companyLoggedReducer,
});

const store = createStore(reducers, middleware);

const unsubscribe = store.subscribe(() => {
	const state = store.getState();

	storeSubscribeEvents(state);
});

export { unsubscribe };
export default store;
