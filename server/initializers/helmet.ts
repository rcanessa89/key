import * as express from 'express';
import * as helmet from 'helmet';
import logger from '../api/util/logger';

export default (app: express.Application): void => {
	logger('[APP] Helmet Configuring...');

	app.use(helmet());
};