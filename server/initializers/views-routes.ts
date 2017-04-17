import * as express from 'express';
import logger from '../api/util/logger';
import Auth from './auth';

export default (app: express.Application) => {
	logger('[APP] Views routes configuring...');

	const auth = new Auth();

	app.get('/', (req, res) => {console.log(req.session); res.render('home')});
	app.get('/login', (req, res) => res.render('login'));
	app.get('/signin', (req, res) => res.redirect(auth.redirectUrl));
	app.get('/auth/google/callback', auth.resHandler.bind(auth));
}