import * as express from 'express';
import * as mongoose from 'mongoose';
import * as session from 'express-session';
import logger from '../api/util/logger';
import constants from '../constants';

const MongoStore = require('connect-mongo')(session);

export default (app: express.Application): void => {
	logger('[APP] Session Configuring...');

	app.use(session({
		secret: constants.SECRET,
		resave: false,
		saveUninitialized: false,
		maxAge: 60000,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	}));
};