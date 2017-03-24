import * as mongoose from 'mongoose';
import * as logger from 'winston';
import constants from '../constants';

export default class Db {
	constructor() {
		(<any>mongoose).Promise = global.Promise;
		this.db = mongoose.connection;
	}

	public connect() {
		if (constants.DB_NAME && constants.DB_URI) {
			this.db.on('error', console.error.bind(console, 'connection error:'));
			this.db.once('open', this.onOpenConnection);

			logger.info('[DB] Setting...');

			this.dbConnected = mongoose.connect(constants.DB_URI);
		} else {
			logger.info('[DB] Data base is not defined');
		}
	}

	public disconnect() {
		if (this.dbConnected) {
			this.dbConnected.disconnect();

			logger.info('[DB] Disconnect');
		} else {
			logger.info('[DB] Not Connection defined');
		}
	}

	private dbConnected;
	private db: mongoose.Connection;

	private onOpenConnection() {
		logger.info('[DB] Connected to DB');
	}
}