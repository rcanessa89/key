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
	SECRET: 'Xowq3p01',
	GMAIL_USER: 'rcanessa@konradgroup.com',
	GMAIL_CLIENT_ID: '136326480449-6d91qk6otacp2rlg4p9tb48qv245tn71.apps.googleusercontent.com',
	GMAIL_CLIENT_SECRET: '5-NBDh5HQPOi8sw4xdY71eu1',
	GMAIL_ACCESS_TOKEN: 'ya29.Gls_BA-S4H1haS4IBH-j165s40lOb3Z5KGfAFWRSgtfwuQWWG7d9UpACbRoNwOqVheCbHVb2IIg3B9TperbCvUF8RBtU8pEQUBwX7kpV91dpVGJBnssXgDDzJ2l4',
	GMAIL_REFRESH_TOKEN: '1/IUFejBA5vv7dsEScQWafCeVIqYAbF3kt5wBtp3NAO0xhmFAHrV8KQOYTB5oz5zS8'
};