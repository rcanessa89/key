import * as express from 'express';
import * as session from 'express-session';
import userModel from './user.model';
import companyModel from '../company/company.model';
import BaseHandler from '../../services/BaseHandler';
import Token from '../../services/Token';
import email from '../../services/Email';

class UserHandler extends BaseHandler {
	constructor() {
		super(userModel);
	}

	public getLogged(req: express.Request, res: express.Response, next: express.NextFunction): void {
		res.json(req.session.logged);
	}

	public createUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
		this.ifExist({ name: req.body.email })
			.then((ifExistEmail: boolean) => new Promise((resolve, reject) => {
				if (!ifExistEmail) {
					const newUser = new this.model(req.body);

					newUser.save((error, user) => {
						if (error) {
							reject(error);
						} else {
							resolve(user);
						}
					});
				} else {
					reject({
						errors: [{
							message: 'Email already exist',
							field: 'email'
						}]
					});
				}
			}), error => res.json(error))
			.then((user: any) => new Promise((resolve, reject) => {
				companyModel.findById(req.body.company, (error, company) => {
					if (error) {
						reject(error);
					}

					company.users.push(user);
					company.save((error, companyEdited) => {
						if (error) {
							res.json(error);
						}

						resolve(user);
					});
				});
			}), error => res.json(error))
			.then((user: any) => new Promise((resolve, reject) => {
				const token = new Token({ payload: user._id }).token;
				const emailLink: string = `http://${req.headers.host}/password?user_token=${token}`;

				email.send({
					to: user.email,
					subject: 'Password setting',
					text: 'A link to setup your password',
					html: `<h1>Key App</h1><p>You are receiving this because you (or someone else) have requested the setup of the password for your account.Please click on the following link, or paste this into your browser to complete the process: <a href="${emailLink}">${emailLink}</a> </p>`
				})
				.then((emailInfo: any) => {
					resolve(user);
				}, error => reject(error));
			}), error => res.json(error))
			.then((user: any) => res.json(user));
	}
}

export default new UserHandler();