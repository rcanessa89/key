import * as express from 'express';
import companyHandler from '../entities/company/company.handler';
import authApiMiddleware from '../util/auth-api-middleware';

module.exports = function(router: express.Router) {
	router.route('')
		.get(authApiMiddleware, companyHandler.get)
		.post(authApiMiddleware, companyHandler.create)
		.patch(authApiMiddleware, companyHandler.update);

	router.route('/:id')
		.get(authApiMiddleware, companyHandler.getById)
		.delete(authApiMiddleware, companyHandler.deleteById);

	router.route('/company-admin')
		.post(companyHandler.createCompanyUser.bind(companyHandler));
};