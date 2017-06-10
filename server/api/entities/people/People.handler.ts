import peopleModel from './people.model';
import BaseHandler from '../../services/BaseHandler';

class PeopleHandler extends BaseHandler {
	constructor() {
		super(peopleModel);
	}
}

export default new PeopleHandler();