import * as express from 'express';
import envVariables from '../../env-variables';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (envVariables.environment === 'test') {
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