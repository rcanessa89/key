import * as express from 'express';
import * as session from 'express-session';

export default (req: express.Request & session, res: express.Response, next: express.NextFunction) => {
	if (process.env.ENVIRONMENT === 'test') {
		req.session.logged = {
			name: 'Rodolfo',
			last_name: 'Canessa',
			email: 'rcanessa89@hotmail.com',
			company: {
				name: 'google'
			},
			photo: null,
			rol: 'super_admin'
		};
		return next();
	}

	if (!req.session.logged) {
		return res.status(401).end();
	}

	return next();
};