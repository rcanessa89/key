import * as express from 'express';
import companyModel from './company.model';
import SubDocHandler from '../../services/SubDocHandler';

const companySubDoc = new SubDocHandler(companyModel);

const addDepartment = (req: express.Request, res: express.Response): void => {
	companySubDoc.runQuery(req, res, {
		id: req.session.logged.company._id,
		apply: result => {
			result.departments.push(req.body);

			return result;
		}
	});
};

const editDepartment = (req: express.Request, res: express.Response): void => {
	companySubDoc.runQuery(req, res, {
		id: req.session.logged.company._id,
		apply: result => {
			const department = Object.assign(result.departments['id'](req.body.departmentId), req.body);

			return result;
		}
	});
};

const deleteDepartmentById = (req: express.Request, res: express.Response): void => {
	companySubDoc.runQuery(req, res, {
		id: req.session.logged.company._id,
		apply: result => {
			result.departments['id'](req.params.departmentId).remove();

			return result;
		}
	});
};

export default {
	addDepartment,
	deleteDepartmentById,
	editDepartment,
};