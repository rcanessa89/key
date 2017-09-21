import * as express from 'express';
import * as cors from 'cors';
import logger from '../api/util/logger';
import envVariables from '../env-variables';

const corsOptions = {
	origin: function(origin: string, callback){
		const originIsWhitelisted = envVariables.cors_origins.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	}
};

export default (app: express.Application): void => {
	logger('[APP] CORS Configuring...');

	app.use(cors(corsOptions));
};