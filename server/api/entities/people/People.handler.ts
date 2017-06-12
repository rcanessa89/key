import * as express from 'express';
import peopleModel from './people.model';
import BaseHandler from '../../services/BaseHandler';

class PeopleHandler extends BaseHandler {
	constructor() {
		super(peopleModel);
	}

	getByPage(req: express.Request, res: express.Response, next: express.NextFunction): void {
		const options = {
			page: req.params.page,
			limit: 30,
			select: '-updated_at -created_at',
			sort: {
				date: 'desc'
			}
		};

		this.model['paginate']({ company_id: req.params.company }, options, (error, result) => {
			if (error) {
				return res.json(error);
			}

			res.json(result);
		});
	}
}

export default new PeopleHandler();