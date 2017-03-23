import * as changeCase from 'change-case';
import * as express from 'express';

export default class Routes {
	constructor(app) {
		this.app = app;
	}

	app;

	public setRoutes() {
		const routes = require('require-dir')();

		Object.keys(routes).forEach(routeName => {
			const router = express.Router();

			require('./' + routeName)(router);

			this.app.use('/api/' + changeCase.paramCase(routeName), router);
		});
	}
}