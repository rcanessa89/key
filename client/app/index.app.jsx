import React from 'react';
import { render } from 'react-dom';
import { UIRouter, UIView, hashLocationPlugin } from 'ui-router-react';
import { Provider } from 'react-redux';
import routerStates from './routes.app';
import store from './store.app';

const configRouter = (router) => {
	router.urlRouter.otherwise('/not-found');
	router.urlRouter.when('/', '/company');
	router.urlRouter.when('', '/company');
};

const appRoot = (
	<Provider store={store}>
		<UIRouter
			plugins={[hashLocationPlugin]}
			states={routerStates}
			config={configRouter}
		>
			<UIView />
		</UIRouter>
	</Provider>
);

render(appRoot, document.getElementById('app-main'));
