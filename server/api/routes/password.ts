import * as express from 'express';
import { ParsedAsJson } from 'body-parser';
import * as session from 'express-session';
import Token from '../services/Token';
import User from '../entities/user/user.model';
import hourDifference from '../util/hour-difference';

module.exports = function(router: express.Router) {
	router.route('')
		.post((req: express.Request & ParsedAsJson & session, res: express.Response, next: express.NextFunction) => {
			const userId = new Token({ token: req.body.userToken }).payload;

			User.findById(userId, (error, user) => {
				let message: string = 'Password saved';
				let status: boolean = true;

				if (error) {
					return res.json(error);
				}

				if (user.verified) {
					message = 'Password account already verified';
					status = false;

					return res.json({ message, status });
				}

				const hours: number = hourDifference(user.created_at);

				user.password = req.body.password;
				user.verified = true;

				user.save((error, newUser) => {
					const sessionUser = Object.assign({}, {
						_id: newUser._id,
						name: newUser.name,
						last_name: newUser.last_name,
						email: newUser.email,
						company: newUser.company,
						photo: newUser.photo,
						rol: newUser.rol
					});

					req.session.logged = sessionUser;

					res.json({
						user: sessionUser,
						status,
						message
					});
				});
			}).populate({
				path: 'company',
				select: 'name'
			});
		});
};