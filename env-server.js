var env = {
	dev: {
		environment: 'dev',
		server_port: 8000,
		db_name: 'key',
		db_uri: 'mongodb://localhost:27017/key',
		token_secret: 'x0wq3p01',
		session_secret: 'Xowq3p01',
		session_cookie_name: 'key_session',
		recaptcha_site_key: '6LdPXCAUAAAAAEs1a3KzqtlLpaOnDZn8EW3HwTWZ',
		recaptcha_secret_key: '6LdPXCAUAAAAAHhRFTbGFWa2MEPdWPdA12bZUbtz',
		cors_origins: [
			'http://localhost:8000',
			'http://localhost:3000'
		]
	},

	test: {
		environment: 'test',
		server_port: 8000,
		db_name: 'key-test',
		morgan: 'dev',
		db_uri: 'mongodb://localhost:27017/key-test',
		token_secret: 'x0wq3p01',
		session_secret: 'Xowq3p01',
		session_cookie_name: 'key_session',
		recaptcha_site_key: '6LdPXCAUAAAAAEs1a3KzqtlLpaOnDZn8EW3HwTWZ',
		recaptcha_secret_key: '6LdPXCAUAAAAAHhRFTbGFWa2MEPdWPdA12bZUbtz',
		cors_origins: [
			'http://localhost:8000',
			'http://localhost:3000'
		]
	},

	prod: {
		environment: 'prod',
		server_port: 0,
		db_name: '',
		morgan: '',
		db_uri: '',
		token_secret: '',
		session_secret: '',
		session_cookie_name: '',
		recaptcha_site_key: '',
		recaptcha_secret_key: '',
		cors_origins: []
	}
};

module.exports = env;