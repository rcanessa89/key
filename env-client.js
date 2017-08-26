var env = {
	dev: {
		environment: 'dev',
		apiBaseUrl: 'http://localhost:8000/api'
	},

	test: {
		environment: 'test',
		apiBaseUrl: ''
	},

	prod: {
		environment: 'prod',
		apiBaseUrl: ''
	}
};

module.exports = env;