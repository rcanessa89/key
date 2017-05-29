import * as express from 'express';
import * as session from 'express-session';
import { ParsedAsJson } from 'body-parser';
import companyModel from './company.model';
import SubDocHandler from '../../services/SubDocHandler';

const companySubDoc = new SubDocHandler(companyModel);

const addDepartment = (req: express.Request & ParsedAsJson & session, res: express.Response): void => {
	companySubDoc.runQuery(req, res, {
		id: req.session.logged.company._id,
		apply: result => {
			result.departments.push(req.body);

			return result;
		}
	});
};

const editDepartment = (req: express.Request & ParsedAsJson & session, res: express.Response): void => {
	companySubDoc.runQuery(req, res, {
		id: req.session.logged.company._id,
		apply: result => {
			const department = Object.assign(result.departments['id'](req.body.departmentId), req.body);

			return result;
		}
	});
}

const deleteDepartmentById = (req: express.Request & ParsedAsJson & session, res: express.Response): void => {
	companySubDoc.runQuery(req, res, {
		id: req.session.logged.company._id,
		apply: result => {
			result.departments['id'](req.params.id).remove();

			return result;
		}
	});
};

export default {
	addDepartment,
	deleteDepartmentById,
	editDepartment,
};