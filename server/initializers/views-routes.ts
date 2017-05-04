import * as express from 'express';
import * as session from 'express-session';
import logger from '../api/util/logger';

export default (app: express.Application) => {
	logger('[APP] Views routes configuring...');

	const render = (view: string, otherData?: any) => (req: express.Request & session, res: express.Response): void => {
		const logged = req.session.logged || null;
		const data = otherData || {};
		const renderData = Object.assign({}, { logged }, data);

		res.render(view, renderData);
	};

	app.get('/', render('home'));
	app.get('/login', render('login'));
	app.get('/signin', render('signin'));
	app.get('/password', render('password'));
};