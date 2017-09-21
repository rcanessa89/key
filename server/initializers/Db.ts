import * as express from 'express';
import * as mongoose from 'mongoose';
import logger from '../api/util/logger';
import envVariables from '../env-variables';

export default class Db {
	constructor(onOpen: () => any, app: express.Application) {
		(<any>mongoose).Promise = global.Promise;
		this.onOpen = onOpen;
		this.app = app;
	}

	private app: express.Application;
	private dbConnected;
	private onOpen: () => any;

	public connect(): void {
		if (envVariables.db_name && envVariables.db_uri) {
			mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
			mongoose.connection.once('open', () => {
				logger('[DB] Connected to ' + envVariables.db_name);

				if (this.onOpen) {
					this.onOpen();
				}
			});

			logger('[DB] Connecting...');

			this.dbConnected = mongoose.connect(envVariables.db_uri);
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