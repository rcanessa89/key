import * as express from 'express';
import registryHandler from '../entities/registry/Registry.handler';

module.exports = function(router: express.Router) {
	router.route('')
		.get(registryHandler.get)
		.post(registryHandler.create)
		.patch(registryHandler.update);

	router.route('/id/:id')
		.get(registryHandler.getById)
		.delete(registryHandler.deleteById);
};