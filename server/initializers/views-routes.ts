import * as express from 'express';
import * as session from 'express-session';
import * as path from 'path';
import logger from '../api/util/logger';
import constants from '../constants';

export default (app: express.Application): void => {
	logger('[APP] Views routes configuring...');

	const render = (view: string, otherData?: any) => (req: express.Request & session, res: express.Response): void => {
		const logged = req.session.logged || null;
		const data = otherData || {};
		const renderData = Object.assign({}, { logged }, data);

		res.render(view, renderData);
	};

	const authHandle = (req: express.Request & session, res: express.Response, next: express.NextFunction) => {
		if (!req.session.logged) {
			return res.redirect('/login');
		}

		return next();
	}

	app.use('/app', authHandle, express.static(path.join(constants.CLIENT_ROOT)));
	app.get('/', render('home'));
	app.get('/login', render('login'));
	app.get('/signin', render('signin'));
	app.get('/password', render('password'));
	app.get('/account', authHandle, render('account'));
};