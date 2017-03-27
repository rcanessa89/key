import departmentModel from './department.model';
import BaseHandler from '../../services/BaseHandler';

class DepartmentHandler extends BaseHandler {
	constructor() {
		super(departmentModel);
	}
}

export default new DepartmentHandler();