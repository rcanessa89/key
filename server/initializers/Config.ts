import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as path from 'path';
import * as logger from 'winston';
import constants from '../constants';

export default class Config {
	constructor(app: express.Application) {
		this.app = app;
	}

	private app: express.Application;

	public run() {
		this.app.use(morgan(constants.MORGAN));
		this.app.use(bodyParser.urlencoded({extended: true}));
		this.app.use(bodyParser.json());
		this.app.use(this.onAppError);
		this.app.use(express.static(path.join(constants.CLIENT_ROOT)));
		this.app.use(compression());

		logger.info('[APP] Configuring...');
	}

	private onAppError(error, req, res, next) {
		res.status(error.status || 500);

		res.json({
			message: error.message
		});

		next(error);
	}
}