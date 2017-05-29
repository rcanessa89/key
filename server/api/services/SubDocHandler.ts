import * as express from 'express';
import * as session from 'express-session';
import { ParsedAsJson } from 'body-parser';
import * as mongoose from 'mongoose';
import BaseHandler from './BaseHandler';

export default class SubDocHandler extends BaseHandler {
	constructor(schemaModel: mongoose.Model<mongoose.Document>) {
		super(schemaModel);
		this.query = this.query.bind(this);
	}

	public query(req: express.Request & ParsedAsJson & session, res: express.Response, queryData): void {
		this.model.findById(queryData.id, (error, result) => {
			if (error) {
				return res.json(error);
			}

			queryData.apply(result)
				.then(newResult => {
					newResult.save((error, result) => {
						if (error) {
							return res.json(error);
						}

						res.json(result);
					});
				});
		});
	}

	public runQuery(req: express.Request & ParsedAsJson & session, res: express.Response, queryData): void {
		const queryApply = result => new Promise((resolve, reject) => {
			resolve(queryData.apply(result));
		});

		this.query(req, res, {
			id: queryData.id,
			apply: queryApply
		});
	}
}