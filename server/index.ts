import * as express from 'express';
import * as async from 'async';
import * as logger from 'winston';
import Server from './initializers/Server';
import Db from './initializers/Db';
import Config from './initializers/Config';
import Routes from './api/routes/index';
import cors from './initializers/cors';
import helmet from './initializers/helmet';
import appSession from './initializers/session';
import viewsRoutes from './initializers/views-routes';

const server = Server.bootstrap();
const db = new Db(() => server.run(), server.app);
const config = new Config(server.app, db);
const apiRoutes = new Routes(server.app);

async.series(
	[
		cb => { config.run(); cb(null); },
		cb => { appSession(server.app); cb(null); },
		cb => { apiRoutes.setRoutes(); cb(null); },
		cb => { viewsRoutes(server.app); cb(null); },
		cb => { cors(server.app); cb(null); },
		cb => { helmet(server.app); cb(null); },
		cb => {  db.connect(); cb(null); }
	]
);

export default server.app;