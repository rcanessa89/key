import * as mongoose from 'mongoose';
import * as logger from 'winston';
import constants from '../constants';

export default class Db {
	constructor(onOpen: () => any) {
		(<any>mongoose).Promise = global.Promise;
		this.db = mongoose.connection;
		this.onOpen = onOpen;
	}

	private dbConnected;
	private db: mongoose.Connection;
	private onOpen: () => any;

	public connect(): void {
		if (constants.DB_NAME && constants.DB_URI) {
			this.db.on('error', console.error.bind(console, 'connection error:'));
			this.db.once('open', () => { logger.info('[DB] Connected to DB'); this.onOpen(); });

			logger.info('[DB] Connecting...');

			this.dbConnected = mongoose.connect(constants.DB_URI);
		} else {
			logger.info('[DB] Data base is not defined');
		}
	}

	public disconnect(): void {
		if (this.dbConnected) {
			this.dbConnected.disconnect();

			logger.info('[DB] Disconnect');
		} else {
			logger.info('[DB] Not Connection defined');
		}
	}
}