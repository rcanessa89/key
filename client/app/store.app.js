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
import company from './pages/company/reducer';
import users from './pages/users/reducer';
import { userReducer } from './services/set-current-logged';
import { fetchReducer } from './services/Api';

let middleware = applyMiddleware(thunk);

if (constants.environment === 'dev') {
	middleware = applyMiddleware(thunk, logger);
}

const reducers = combineReducers({
	modal,
	forms,
	mobileNav,
	header,
	company,
	users,
	user: userReducer,
	fetching: fetchReducer,
});

const store = createStore(reducers, middleware);

const unsubscribe = store.subscribe(() => {
	const state = store.getState();

	storeSubscribeEvents(state);
});

export { unsubscribe };
export default store;
