import * as express from 'express';
import constants from '../../constants';
import envVariables from '../../env-variables';

export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (!req.session.logged && envVariables.environment === constants.ENVIRONMENTS.prod) {
		return res.status(401).end();
	}

	return next();
};