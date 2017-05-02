let dbName = process.env.DB_NAME || 'key';

const origins = [
	'http://localhost:8000',
	'http://localhost:3000'
];

if (process.env.ENVIRONMENT === 'test') {
	dbName = 'key-test';
}

export default {
	ENV: process.env.ENVIRONMENT || 'dev',
	SERVER_PORT: process.env.PORT || 8000,
	DB_NAME: dbName,
	DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/' + dbName,
	ORIGINS: origins,
	CLIENT_ROOT: __dirname + '/../../client/dist',
	MORGAN: process.env.ENVIRONMENT || 'dev',
	SESSION_SECRET: 'Xowq3p01',
};