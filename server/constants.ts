import envVariables from './env-variables';

export default {
	CLIENT_ROOT: __dirname + '/../../client/dist',
	COOKIE_MAX_AGE: 3600000,
	GMAIL_USER: 'rcanessa@konradgroup.com',
	GMAIL_CLIENT_ID: '136326480449-6d91qk6otacp2rlg4p9tb48qv245tn71.apps.googleusercontent.com',
	GMAIL_CLIENT_SECRET: '5-NBDh5HQPOi8sw4xdY71eu1',
	GMAIL_ACCESS_TOKEN: 'ya29.Gls_BA-S4H1haS4IBH-j165s40lOb3Z5KGfAFWRSgtfwuQWWG7d9UpACbRoNwOqVheCbHVb2IIg3B9TperbCvUF8RBtU8pEQUBwX7kpV91dpVGJBnssXgDDzJ2l4',
	GMAIL_REFRESH_TOKEN: '1/IUFejBA5vv7dsEScQWafCeVIqYAbF3kt5wBtp3NAO0xhmFAHrV8KQOYTB5oz5zS8',
	SALT_WORK_FACTOR: 10,
	RECAPTCHA_ENDPOINT: 'https://www.google.com/recaptcha/api/siteverify',
	ROL: {
		super_admin: 'super_admin',
		admin: 'admin',
		viewer: 'viewer'
	},
	NO_ROUTE_AUTH: [
		'login',
		'password',
		'company'
	]
};