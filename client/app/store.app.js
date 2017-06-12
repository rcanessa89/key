import { applyMiddleware, createStore, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import env from './env-variables.app';
import storeSubscribeEvents from './services/store-subscribe-events';

// Reducers
import modal from './components/modal/reducer';
import buttonMenus from './components/button-menu/reducer';
import forms from './components/app-form/reducer';
import mobileNav from './components/mobile-nav/reducer';
import header from './components/app-header/reducer';
import collapse from './components/collapse/reducer';
import { userReducer } from './services/set-current-logged';
import { fetchReducer } from './services/Api';

// Pages reducers
import company from './pages/company/reducer';
import users from './pages/users/reducer';
import people from './pages/people/reducer';

let middleware = applyMiddleware(thunk);

if (env.environment === 'dev') {
	middleware = applyMiddleware(thunk, logger);
}

const reducers = combineReducers({
	modal,
	forms,
	mobileNav,
	header,
	buttonMenus,
	collapse,
	companyPage: company,
	usersPage: users,
	peoplePage: people,
	userLogged: userReducer,
	fetching: fetchReducer,
});

const store = createStore(reducers, middleware);

const unsubscribe = store.subscribe(() => {
	const state = store.getState();

	storeSubscribeEvents(state);
});

export { unsubscribe };
export default store;
