import * as changeCase from 'change-case';
import * as express from 'express';
import authApiMiddleware from '../util/auth-api-middleware';
import constants from '../../constants';

export default class Routes {
	constructor(app: express.Application) {
		this.app = app;
	}

	app: express.Application;

	public setRoutes() {
		const routes = require('require-dir')();

		Object.keys(routes).forEach((routeName: string) => {
			const router: express.Router = express.Router();

			if (constants.NO_ROUTE_AUTH.indexOf(routeName) < 0) {
				router.use(authApiMiddleware);
			}

			require('./' + routeName)(router);

			this.app.use('/api/' + changeCase.paramCase(routeName), router);
		});
	}
}