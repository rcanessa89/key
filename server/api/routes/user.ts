import * as express from 'express';
import userHandler from '../entities/user/User.handler';

module.exports = function(router: express.Router) {
	router.route('')
		.get(userHandler.get)
		.post(userHandler.createUser.bind(userHandler))
		.patch(userHandler.update);

	router.route('/id/:id')
		.get(userHandler.getById)
		.delete(userHandler.deleteById);

	router.route('/logged')
		.get(userHandler.getLogged);
};