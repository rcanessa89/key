import * as express from 'express';
import * as session from 'express-session';
import { ParsedAsJson } from 'body-parser';
import companyModel from './company.model';

const addDepartment = (req: express.Request & ParsedAsJson & session, res: express.Response) => {
	companyModel.findById(req.session.logged.company._id, (error, company) => {
		if (error) {
			return res.json(error);
		}

		company.departments.push(req.body);

		company.save((error, company) => {
			if (error) {
				return res.json(error);
			}

			res.json(company);
		});
	});
};

const deleteDepartmentById = (req: express.Request & ParsedAsJson & session, res: express.Response) => {
	companyModel.findById(req.session.logged.company._id, (error, company) => {
		if (error) {
			return res.json(error);
		}

		company.departments['id'](req.params.id).remove();

		company.save((error, company) => {
			if (error) {
				return res.json(error);
			}

			res.json(company);
		});
	});
};

export default {
	addDepartment,
	deleteDepartmentById,
};