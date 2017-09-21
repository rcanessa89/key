import * as express from 'express';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (!req.session.logged) {
		return res.redirect('/login');
	}

	return next();
};