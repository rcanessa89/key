import * as express from 'express';
import hostHandler from '../entities/host/Host.handler';

module.exports = function(router: express.Router) {
	router.route('')
		.get(hostHandler.get)
		.post(hostHandler.create)
		.patch(hostHandler.update);

	router.route('/id/:id')
		.get(hostHandler.getById)
		.delete(hostHandler.deleteById);
};