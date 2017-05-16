import * as express from 'express';
import assetHandler from '../entities/asset/Asset.handler';

module.exports = function(router: express.Router) {
	router.route('')
		.get(assetHandler.get)
		.post(assetHandler.create)
		.patch(assetHandler.update);

	router.route('/id/:id')
		.get(assetHandler.getById)
		.delete(assetHandler.deleteById);
};