import * as express from 'express';
import * as cors from 'cors';
import * as logger from 'winston';
import constants from '../constants';

const corsOptions = {
	origin: function(origin: string, callback){
		const originIsWhitelisted = constants.ORIGINS.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	}
};

export default (app) => {
	logger.info('[APP] CORS Configuring...');

	app.use(cors(corsOptions));
};