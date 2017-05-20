import * as express from 'express';
import * as bodyParser from 'body-parser';
import companyHandler from '../entities/company/company.handler';
import authApiMiddleware from '../util/auth-api-middleware';

module.exports = function(router: express.Router) {
	router.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
	router.use(bodyParser.json({ limit: '5mb' }));
	
	router.route('')
		.get(authApiMiddleware, companyHandler.get)
		.post(authApiMiddleware, companyHandler.create)
		.patch(authApiMiddleware, companyHandler.update);

	router.route('/id/:id')
		.get(authApiMiddleware, companyHandler.getById)
		.delete(authApiMiddleware, companyHandler.deleteById);

	router.route('/company-admin')
		.post(companyHandler.createCompanyUser.bind(companyHandler));
};