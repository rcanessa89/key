import * as changeCase from 'change-case';
import * as express from 'express';

export default class Routes {
	constructor(app: express.Application) {
		this.app = app;
	}

	app: express.Application;

	public setRoutes() {
		const routes = require('require-dir')();

		Object.keys(routes).forEach((routeName: string) => {
			const router: express.Router = express.Router();

			require('./' + routeName)(router);

			this.app.use('/api/' + changeCase.paramCase(routeName), router);
		});
	}
}