import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Reducers
import user from './reducers/user';
import registry from './pages/registry/reducer';
import responsive from './reducers/responsive';

const middleware = applyMiddleware(thunk, logger);

const initialNavState = {
    index: 0,
    routes: [
        { key: 'Registry', routeName: 'Registry' },
    ],
};

const reducers = combineReducers({
    user,
    registry,
    responsive,
    nav: (state = initialNavState, action) => state
});

export default createStore(reducers, middleware);