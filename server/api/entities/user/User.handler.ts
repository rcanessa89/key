import userSchema from './user.model';
import BaseHandler from '../../services/BaseHandler';

class UserHandler extends BaseHandler {
	constructor() {
		super(userSchema);
	}
}

export default new UserHandler();