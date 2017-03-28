import React from 'react';
import { render } from 'react-dom';
import { UIRouter, UIView, hashLocationPlugin } from 'ui-router-react';
import routerStates from './routes.app';

const configRouter = (router) => {
	router.urlRouter.otherwise('/not-found');
	router.urlRouter.when('/', '/company');
	router.urlRouter.when('', '/company');
};

const routerDefinition = (
	<UIRouter
		plugins={[hashLocationPlugin]}
		states={routerStates}
		config={configRouter}
	>
		<UIView />
	</UIRouter>
);

render(routerDefinition, document.getElementById('app-main'));
