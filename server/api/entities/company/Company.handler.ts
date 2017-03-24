import companySchema from './company.model';
import BaseHandler from '../../services/BaseHandler';

class UserHandler extends BaseHandler {
	constructor() {
		super(companySchema);
	}
}

export default new UserHandler();