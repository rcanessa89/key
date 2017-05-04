import * as express from 'express';
import { ParsedAsJson } from 'body-parser';
import * as session from 'express-session';
import User from '../entities/user/user.model';

module.exports = function(router: express.Router) {
	router.route('')
		.post((req: express.Request & ParsedAsJson & session, res: express.Response, next: express.NextFunction) => {
			User.findOne({ email: req.body.email }, '+password', (error, user) => {
				if (error) {
					console.log('user find error');
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

							return res.json({
								user: sessionUser,
								message: 'Log in success',
								status: true
							});
						} else {
							return res.json({
								message: 'Password invalid',
								status: false
							});
						}
					});
				} else {
					return res.json({
						message: 'Email invalid',
						status: false
					});
				}

			}).populate({
				path: 'company',
				select: 'name'
			});;
		});
};