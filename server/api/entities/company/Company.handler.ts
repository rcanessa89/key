import * as express from 'express';
import { ParsedAsJson } from 'body-parser';
import companyModel from './company.model';
import userModel from '../user/user.model';
import BaseHandler from '../../services/BaseHandler';

class CompanyHandler extends BaseHandler {
	constructor() {
		super(companyModel);
	}

	public createCompanyUser(req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction): void {
		const newCompany = new companyModel({
			name: req.body.company,
			departments: [],
			registries: [],
			assets: []
		});

		newCompany.save((error, company) => {
			if (error) {
				res.send(error);
			}

			const newUserAdmin = new userModel({
				name: req.body.name,
				last_name: req.body.last_name,
				rol: 'user_admin',
				email: req.body.email,
				company: company._id
			});

			newUserAdmin.save(error => {
				if (error) {
					res.send(error)
				}
			});
		});
	}
}

export default new CompanyHandler();