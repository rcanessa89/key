import * as express from 'express';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import logger from '../api/util/logger';
import constants from '../constants';

const MongoStore = require('connect-mongo')(session);

export default (app: express.Application): void => {
	logger('[APP] Session Configuring...');
	
	app.use(session({
		name: constants.SESSION_COOKIE_NAME,
		secret: constants.SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		cookie: {
			maxAge: 3600000
		}
	}));
};