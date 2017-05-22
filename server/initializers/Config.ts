import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as expressReactViews from 'express-react-views';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import logger from '../api/util/logger';
import constants from '../constants';

export default class Config {
	constructor(app: express.Application, db: any) {
		this.app = app;
	}

	private app: express.Application;

	private onAppError(error, req, res, next): void {
		res.status(error.status || 500);

		res.json({
			message: error.message
		});

		next(error);
	}

	public run(): void {
		if (constants.ENV !== 'test') {
			this.app.use(morgan(constants.MORGAN));
		}

		this.app.use(this.onAppError);
		this.app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }));
		this.app.use(bodyParser.json({ limit: '2mb' }));
		this.app.use(cookieParser());
		this.app.use(express.static(path.join(__dirname + '/../public')));
		this.app.engine('js', expressReactViews.createEngine());
		this.app.set('views', __dirname + '/../public/views');
		this.app.set('view engine', 'js');
		this.app.use(compression());

		logger('[APP] Configuring...');
	}
}