import userModel from './user.model';
import BaseHandler from '../../services/BaseHandler';

class UserHandler extends BaseHandler {
	constructor() {
		super(userModel);
	}
}

export default new UserHandler();