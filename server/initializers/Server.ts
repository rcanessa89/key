import * as cluster from 'cluster';
import * as os from 'os';
import * as express from 'express';
import logger from '../api/util/logger';
import constants from '../constants';

export default class Server {
	private runServer(): void {
		this.app.listen(constants.SERVER_PORT, () => {
			logger('[SERVER] Listening on port ' + constants.SERVER_PORT);
			logger('[APP] initialized SUCCESSFULLY');
		});
	}

	private runCluster(): void {
		if (cluster.isMaster) {
			const cpuCount = os.cpus().length;

			for (let i = 0; i < cpuCount; i += 1) {
				cluster.fork();
			}

			cluster.on('exit', () => cluster.fork());

		} else {
			this.runServer();
		}
	}

	public app: express.Application = express();

	public static bootstrap(): Server {
		return new Server();
	}

	public run(): void {
		if (constants.ENV === 'dev') {
			this.runServer();
		} else {
			this.runCluster();
		}
	}
}