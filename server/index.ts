/// <reference path="../typings-custom/index.d.ts" />
/// <reference path="../typings/index.d.ts" />

import * as express from 'express';
import * as async from 'async';
import * as logger from 'winston';
import Server from './initializers/Server';
import Db from './initializers/Db';
import Config from './initializers/Config';
import Routes from './api/routes/index';
import cors from './initializers/cors';
import helmet from './initializers/helmet';
import constants from './constants';

const server = Server.bootstrap();
const config = new Config(server.app);
const routes = new Routes(server.app);

async.series(
	[
		cb => { config.run(); cb(null); },
		cb => { routes.setRoutes(); cb(null); },
		cb => { cors(server.app); cb(null); },
		cb => { helmet(server.app); cb(null); },
		cb => { const db = new Db(() => server.run()); db.connect(); cb(null); }
	]
);