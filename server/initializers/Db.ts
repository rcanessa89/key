import * as mongoose from 'mongoose';
import logger from '../api/util/logger';
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
			this.db.once('open', () => { logger('[DB] Connected to ' + constants.DB_NAME); this.onOpen(); });

			logger('[DB] Connecting...');

			this.dbConnected = mongoose.connect(constants.DB_URI);
		} else {
			logger('[DB] Data base is not defined');
		}
	}

	public disconnect(): void {
		if (this.dbConnected) {
			this.dbConnected.disconnect();

			logger('[DB] Disconnect');
		} else {
			logger('[DB] Not Connection defined');
		}
	}
}