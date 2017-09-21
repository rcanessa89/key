import * as express from 'express';

module.exports = function(router: express.Router) {
	router.route('')
		.get((req: express.Request, res: express.Response, next: express.NextFunction) => {
			req.session.destroy(error => console.log(error));
			delete req.session;
			res.redirect('/');
		});
};