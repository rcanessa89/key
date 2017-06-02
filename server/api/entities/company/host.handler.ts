import * as express from 'express';
import * as session from 'express-session';
import { ParsedAsJson } from 'body-parser';
import companyModel from './company.model';
import SubDocHandler from '../../services/SubDocHandler';

const companySubDoc = new SubDocHandler(companyModel);

const addHost = (req: express.Request & ParsedAsJson & session, res: express.Response): void => {
	companySubDoc.runQuery(req, res, {
		id: req.session.logged.company._id,
		apply: result => {
			result.departments['id'](req.body.departmentId).hosts.push({
				name: req.body.name,
				last_name: req.body.last_name,
				departmentName: result.departments['id'](req.body.departmentId).name
			});

			return result;
		}
	});
};

const editHost = (req: express.Request & ParsedAsJson & session, res: express.Response): void => {
	companySubDoc.runQuery(req, res, {
		id: req.session.logged.company._id,
		apply: result => {
			const host = Object.assign(result.departments['id'](req.body.departmentId).hosts['id'](req.body.hostId), req.body);

			return result;
		}
	});
};

const deleteHostById = (req: express.Request & ParsedAsJson & session, res: express.Response): void => {
	companySubDoc.runQuery(req, res, {
		id: req.session.logged.company._id,
		apply: result => {
			result.departments['id'](req.params.departmentId).hosts['id'](req.params.hostId).remove();

			return result;
		}
	});
};

export default {
	addHost,
	editHost,
	deleteHostById
};
