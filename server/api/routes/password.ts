import * as express from 'express';
import { ParsedAsJson } from 'body-parser';
import Token from '../services/Token';
import User from '../entities/user/user.model';
import hourDifference from '../util/hour-difference';

module.exports = function(router: express.Router) {
	router.route('')
		.post((req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction) => {
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

				const hours = hourDifference(user.created_at);

				user.password = req.body.password;
				user.verified = true;

				user.save((error, newUser) => {
					res.json({
						user: newUser,
						status,
						message
					});
				});
			});
		});
};