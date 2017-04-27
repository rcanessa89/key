import * as express from 'express';
import logger from '../api/util/logger';

export default (app: express.Application) => {
	logger('[APP] Views routes configuring...');

	app.get('/', (req, res) => res.render('home'));
	app.get('/login', (req, res) => res.render('login'));
	app.get('/signin', (req, res) => res.render('signin'));
}