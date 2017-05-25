import * as express from 'express';
import { ParsedAsJson } from 'body-parser';
import * as session from 'express-session';
import Token from '../services/Token';
import User from '../entities/user/user.model';
import hourDifference from '../util/hour-difference';
import userModel from '../entities/user/user.model';
import BaseHandler from '../services/BaseHandler';
import email from '../services/Email';
import constants from '../../constants';

module.exports = function(router: express.Router) {
	router.route('')
		.post((req: express.Request & ParsedAsJson & session, res: express.Response, next: express.NextFunction) => {
			const userId = new Token({ token: req.body.userToken }).payload;

			User.findById(userId, (error, user) => {
				if (error) {
					return res.json(error);
				}

				if (user.verified) {
					return res.json({
						errors: {
							password: 'Password account already verified'
						}
					});
				}

				const compareHour: Date = user.updated_at || user.created_at;
				const hours: number = hourDifference(compareHour);

				if (hours < 24) {
					user.password = req.body.password;
					user.verified = true;

					user.save((error, newUser) => {
						req.session.logged = {
							_id: newUser._id,
							name: newUser.name,
							last_name: newUser.last_name,
							email: newUser.email,
							company: newUser.company,
							photo: newUser.photo,
							rol: newUser.rol
						};

						return res.end();
					});
				} else {
					return res.json({
						errors: {
							verified: 'Account verification expired'
						}
					});
				}
			}).populate({
				path: 'company',
				select: 'name'
			});
		});

	router.route('/forgot')
		.post((req: express.Request & ParsedAsJson & session, res: express.Response, next: express.NextFunction) => {
			User.findOne({ email: req.body.email }, (error, user) => {
				if (error) {
					res.json(error);
				}

				if (user) {
					user.verified = false;

					user.save((error, userSaved) => {
						if (error) {
							res.json(error);
						}

						const token = new Token({ payload: userSaved._id }).token;
						const emailLink: string = `http://${req.headers.host}/password?user_token=${token}`;

						email.send({
							to: req.body.email,
							subject: 'Password change',
							text: 'A link to change your password',
							html: `<h1>Key App</h1><p>You are receiving this because you (or someone else) have requested a password change for your account.Please click on the following link, or paste this into your browser to complete the process: <a href="${emailLink}">${emailLink}</a> </p>`
						})
						.then(info => res.end());
					});
				} else {
					return res.json({
						errors: {
							email: 'Email is invalid'
						}
					});
				}
			});
		});
};