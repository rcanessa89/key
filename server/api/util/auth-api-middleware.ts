import * as express from 'express';
import * as session from 'express-session';

export default (req: express.Request & session, res: express.Response, next: express.NextFunction) => {
	if (!req.session.logged) {
		return res.status(401).end();
	}

	return next();
}