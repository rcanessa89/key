var env = {
	dev: {
		environment: 'dev',
		apiBaseUrl: 'http://localhost:8000/api'
	},

	prod: {
		environment: 'prod',
		apiBaseUrl: ''
	}
};

module.exports = env;