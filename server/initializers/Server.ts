import * as cluster from 'cluster';
import * as os from 'os';
import * as express from 'express';
import * as logger from 'winston';
import constants from '../constants';

export default class Server {
	public app: express.Application = express();

	public static bootstrap(): Server {
		return new Server();
	}

	public runServer() {
		this.app.listen(constants.SERVER_PORT, () => {
			logger.info('[SERVER] Listening on port ' + constants.SERVER_PORT);
		});
	}

	public runCluster() {
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
}