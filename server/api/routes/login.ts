import * as express from 'express';
import { ParsedAsJson } from 'body-parser';
import * as session from 'express-session';
import User from '../entities/user/user.model';

module.exports = function(router: express.Router) {
	router.route('')
		.post((req: express.Request & ParsedAsJson & session, res: express.Response, next: express.NextFunction) => {
			User.findOne({ email: req.body.email }, '+password', (error, user) => {
				if (error) {
					res.json(error);
				}

				if (user) {
					user.comparePassword(req.body.password)
					.then(match => {
						if (match) {
							const sessionUser = Object.assign({}, {
								_id: user._id,
								name: user.name,
								last_name: user.last_name,
								email: user.email,
								company: user.company,
								photo: user.photo,
								rol: user.rol
							});

							req.session.logged = sessionUser;

							return res.end();
						} else {
							return res.json(Object.assign({}, {
								Password: 'Password is invalid'
							}));
						}
					});
				} else {
					return res.json(Object.assign({}, {
						email: 'Email is invalid'
					}));
				}

			}).populate({
				path: 'company',
				select: 'name'
			});;
		});
};