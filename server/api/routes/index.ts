import * as changeCase from 'change-case';
import * as express from 'express';

const routes = require('require-dir')();

export default class Routes {
	public static setRoutes(app: express.Application) {
		Object.keys(routes).forEach(routeName => {
			let router = express.Router();

			require('./' + routeName)(router);

			app.use('/api/' + changeCase.paramCase(routeName), router);
		});
	}
}