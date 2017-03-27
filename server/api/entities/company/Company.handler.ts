import companyModel from './company.model';
import BaseHandler from '../../services/BaseHandler';

class CompanyHandler extends BaseHandler {
	constructor() {
		super(companyModel);
	}
}

export default new CompanyHandler();