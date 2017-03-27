import * as express from 'express';
import departmentHandler from '../entities/department/Department.handler';

module.exports = function(router: express.Router) {
	router.route('')
		.get(departmentHandler.get)
		.post(departmentHandler.create)
		.patch(departmentHandler.update);

	router.route('/:id')
		.get(departmentHandler.getById)
		.delete(departmentHandler.deleteById);
};