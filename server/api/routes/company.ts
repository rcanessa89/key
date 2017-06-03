import * as express from 'express';
import companyHandler from '../entities/company/company.handler';
import departmentHandler from '../entities/company/department.handler';
import hostHandler from '../entities/company/host.handler';
import authApiMiddleware from '../util/auth-api-middleware';

module.exports = function(router: express.Router) {
	// Company
	router.route('')
		.get(authApiMiddleware, companyHandler.get)
		.post(authApiMiddleware, companyHandler.create)
		.patch(authApiMiddleware, companyHandler.update);

	router.route('/id/:id')
		.get(authApiMiddleware, companyHandler.getById)
		.delete(authApiMiddleware, companyHandler.deleteById);

	// Creat company and super admin account
	router.route('/company-admin')
		.post(companyHandler.createCompanyUser.bind(companyHandler));

	// Company departments
	router.route('/department')
		.post(authApiMiddleware, departmentHandler.addDepartment)
		.patch(authApiMiddleware, departmentHandler.editDepartment);

	router.route('/department/:departmentId')
		.delete(authApiMiddleware, departmentHandler.deleteDepartmentById);

	// Company hosts
	router.route('/host')
		.post(authApiMiddleware, hostHandler.addHost)
		.patch(authApiMiddleware, hostHandler.editHost);

	router.route('/host/:departmentId/:hostId')
		.delete(authApiMiddleware, hostHandler.deleteHostById);
};