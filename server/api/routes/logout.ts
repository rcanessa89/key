import * as express from 'express';
import { ParsedAsJson } from 'body-parser';
import * as session from 'express-session';

module.exports = function(router: express.Router) {
	router.route('')
		.get((req: express.Request & ParsedAsJson & session, res: express.Response, next: express.NextFunction) => {
			req.session.destroy();
			delete req.session;
			res.redirect('/');
		});
};