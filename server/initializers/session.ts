import * as express from 'express';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import logger from '../api/util/logger';
import envVariables from '../env-variables';
import constants from '../constants';

const MongoStore = require('connect-mongo')(session);

export default (app: express.Application): void => {
	logger('[APP] Session Configuring...');

	app.use(session({
		name: envVariables.session_cookie_name,
		secret: envVariables.session_secret,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		cookie: {
			maxAge: constants.COOKIE_MAX_AGE
		}
	}));
};