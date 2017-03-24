import * as express from 'express';
import companyHandler from '../entities/company/company.handler';

module.exports = function(router: express.Router) {
	router.route('')
		.get(companyHandler.get)
		.post(companyHandler.create)
		.patch(companyHandler.update);

	router.route('/:id')
		.get(companyHandler.getById)
		.delete(companyHandler.deleteById);
};