import * as express from 'express';
import * as helmet from 'helmet';
import * as logger from 'winston';

export default app => {
	logger.info('[APP] Helmet Configuring...');

	app.use(helmet());
};