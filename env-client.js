var env = {
	develop: {
		environment: 'dev',
		apiBaseUrl: 'http://localhost:8000/api'
	},

	test: {
		environment: 'test',
		apiBaseUrl: ''
	},

	production: {
		environment: 'prod',
		apiBaseUrl: ''
	}
};

module.exports = env;