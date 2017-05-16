import * as express from 'express';
import * as session from 'express-session';
import userModel from './user.model';
import BaseHandler from '../../services/BaseHandler';

class UserHandler extends BaseHandler {
	constructor() {
		super(userModel);
	}

	public getLogged(req: express.Request & session, res: express.Response, next: express.NextFunction): void {
		res.json(req.session.logged);
	}
}

export default new UserHandler();