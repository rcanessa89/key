import * as express from 'express';
import axios from 'axios';
import companyModel from './company.model';
import userModel from '../user/user.model';
import BaseHandler from '../../services/BaseHandler';
import Token from '../../services/Token';
import email from '../../services/Email';
import constants from '../../../constants';
import envVariables from '../../../env-variables';

class CompanyHandler extends BaseHandler {
	constructor() {
		super(companyModel);
	}

	public createCompanyUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
		let ifCompanyExist: boolean;
		let ifEmailExist: boolean;

		const recaptchaPromise: Promise<boolean> = new Promise((resolve, reject) => {
			axios({
				method: 'POST',
				url: constants.RECAPTCHA_ENDPOINT,
				params: {
					secret: envVariables.recaptcha_secret_key,
					response: req.body.recaptcha
				}
			})
			.then((recaptchaRes: any) => {
				if (envVariables.environment === 'test') {
					resolve(recaptchaRes);
				}

				if (recaptchaRes.data.success) {
					resolve(recaptchaRes);
				} else {
					reject(recaptchaRes);
				}
			});
		});

		recaptchaPromise
			.then(recaptchaRes => {
				return this.ifExist({ name: req.body.company });
			}, () => res.redirect(400, '/'))
			.then((companyExist: boolean) => {
				ifCompanyExist = companyExist;

				return this.ifExist({ email: req.body.email }, userModel);
			})
			.then((emailExist: boolean) => {
				ifEmailExist = emailExist;

				if (ifCompanyExist || ifEmailExist) {
					res.json(Object.assign({}, {
						errors: {
							company: ifCompanyExist ? 'That company name already exist' : undefined,
							email: ifEmailExist ? 'That email is already registered' : undefined
						}
					}));
				} else {
					this.saveCompanyUser(req, res);
				}
			});
	}

	private saveCompanyUser(req: express.Request, res: express.Response): void {
		const newUserAdmin = new userModel({
			name: req.body.name,
			last_name: req.body.last_name,
			rol: 'super_admin',
			email: req.body.email,
			photo: req.body.photo
		});

		const newCompany = new companyModel({
			name: req.body.company,
			users: [newUserAdmin._id]
		});

		newUserAdmin.save()
			.then(user => {
				user.company = newCompany._id;

				return user.save();
			}, error => res.send(error))
			.then(user => {

				return new Promise((resolve, reject) => {
					const data: any = {
						user
					};

					newCompany.save((error, company) => {
						if (error) {
							reject(error);
						}

						data.company = company;

						resolve(data);
					});
				});
			}, error => res.send(error))
			.then((data: any) => {
				const token = new Token({ payload: data.user._id }).token;
				const emailLink: string = `http://${req.headers.host}/password?user_token=${token}`;

				return email.send({
					to: req.body.email,
					subject: 'Password setting',
					text: 'A link to setup your password',
					html: `<h1>Key App</h1><p>You are receiving this because you (or someone else) have requested the setup of the password for your account.Please click on the following link, or paste this into your browser to complete the process: <a href="${emailLink}">${emailLink}</a> </p>`
				});
			}, error => res.send(error))
			.then(emailInfo => res.end());
	}
}

export default new CompanyHandler();