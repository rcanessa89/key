import * as express from 'express';
import companyHandler from '../entities/company/company.handler';
import departmentHandler from '../entities/company/department.handler';
import hostHandler from '../entities/company/host.handler';
import authApiMiddleware from '../util/auth-api-middleware';

module.exports = function(router: express.Router) {
	router.route('')
		.get(authApiMiddleware, companyHandler.get)
		.post(authApiMiddleware, companyHandler.create)
		.patch(authApiMiddleware, companyHandler.update);

	router.route('/id/:id')
		.get(authApiMiddleware, companyHandler.getById)
		.delete(authApiMiddleware, companyHandler.deleteById);

	router.route('/company-admin')
		.post(companyHandler.createCompanyUser.bind(companyHandler));

	router.route('/department')
		.post(authApiMiddleware, departmentHandler.addDepartment)
		.patch(authApiMiddleware, departmentHandler.editDepartment);

	router.route('/department/:id')
		.delete(authApiMiddleware, departmentHandler.deleteDepartmentById);

	router.route('/host')
		.post(authApiMiddleware, hostHandler.addHost);
};