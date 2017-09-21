import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// Reducers
// import user from './reducers/user';
import { RegistryReducer } from './pages/registry/reducer';
import { HomeReducer } from './pages/home/reducer';

const middleware = applyMiddleware(thunk, logger);

const reducers = combineReducers({
    RegistryReducer,
    HomeReducer,
});

export default createStore(reducers, middleware);