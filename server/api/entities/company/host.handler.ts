import * as express from 'express';
import * as session from 'express-session';
import { ParsedAsJson } from 'body-parser';
import companyModel from './company.model';

const addHost = (req: express.Request & ParsedAsJson & session, res: express.Response) => {
	companyModel.findById(req.session.logged.company._id, (error, company) => {
		if (error) {
			return res.json(error);
		}

		company.departments['id'](req.body.departmentId).hosts.push({
			name: req.body.name,
			last_name: req.body.last_name,
		});

		company.save((error, company) => {
			if (error) {
				return res.json(error);
			}

			res.json(company);
		});
	});
};

export default {
	addHost
};
