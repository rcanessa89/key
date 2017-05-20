import * as express from 'express';
import * as session from 'express-session';
import { ParsedAsJson } from 'body-parser';
import axios from 'axios';
import companyModel from './company.model';
import userModel from '../user/user.model';
import BaseHandler from '../../services/BaseHandler';
import Token from '../../services/Token';
import email from '../../services/Email';
import constants from '../../../constants';

class CompanyHandler extends BaseHandler {
	constructor() {
		super(companyModel);
	}

	public createCompanyUser(req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction): void {
		let ifCompanyExist: boolean;
		let ifEmailExist: boolean;

		const recaptchaPromise: Promise<boolean> = new Promise((resolve, reject) => {
			axios({
				method: 'POST',
				url: constants.RECAPTCHA.endpoint,
				params: {
					secret: constants.RECAPTCHA.secret,
					response: req.body.recaptcha
				}
			})
			.then(recaptchaRes => {
				if (recaptchaRes.data.success) {
					resolve(resolve);
				} else {
					reject(recaptchaRes.data.success);
				}
			})
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
						company: ifCompanyExist ? 'That company name already exist' : undefined,
						email: ifEmailExist ? 'That email is already registered' : undefined
					}));
				} else {
					this.saveCompanyUser(req, res);
				}
			});
	}

	private saveCompanyUser(req: express.Request & ParsedAsJson, res: express.Response): void {
		const newCompany = new companyModel({
			name: req.body.company
		});

		newCompany.save((error, company) => {
			if (error) {
				res.send(error);
			}

			const newUserAdmin = new userModel({
				name: req.body.name,
				last_name: req.body.last_name,
				rol: 'super_admin',
				email: req.body.email,
				company: company._id,
				photo: req.body.photo
			});

			newUserAdmin.save((error, user) => {
				if (error) {
					res.send(error);
				}

				const token = new Token({ payload: user._id }).token;
				const emailLink: string = `http://${req.headers.host}/password?user_token=${token}`;

				email.send({
					to: req.body.email,
					subject: 'Password setting',
					text: 'A link to setup your password',
					html: `<h1>Key App</h1><p>You are receiving this because you (or someone else) have requested the setup of the password for your account.Please click on the following link, or paste this into your browser to complete the process: <a href="${emailLink}">${emailLink}</a> </p>`
				})
				.then(info => res.end());
			});
		});
	}
}

export default new CompanyHandler();