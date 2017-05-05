import * as express from 'express';
import { ParsedAsJson } from 'body-parser';
import * as mongoose from 'mongoose';

export default class BaseHandler {
	constructor(schemaModel: mongoose.Model<mongoose.Document>) {
		this.model = schemaModel;
		this.get = this.get.bind(this);
		this.getById = this.getById.bind(this);
		this.create = this.create.bind(this);
		this.update = this.update.bind(this);
		this.deleteById = this.deleteById.bind(this);
	}

	private model: mongoose.Model<mongoose.Document>;

	private queryCallback(error, data): any {
		let resData = null;

		if (error) {
			resData = error;
		} else {
			resData = data;
		}

		return resData;
	}

	public ifExist(query: any, model?: mongoose.Model<mongoose.Document>): Promise<boolean> {
		if (!model) {
			model = this.model;
		}

		return new Promise((resolve, reject) => {
			model.find(query, (error, docs) => {
				resolve(!!docs.length);
			});
		});
	}

	public get(req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction): void {
		this.model.find({}, (error, data) => res.json(this.queryCallback(error, data)));
	}

	public getById(req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction): void {
		this.model.findById(req.params.id, (error, data) => res.json(this.queryCallback(error, data)));
	}

	public create(req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction): void {
		const newEntity = new this.model(req.body);

		newEntity.save((error, data) => res.json(this.queryCallback(error, data)));
	}

	public update(req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction): void {
		req.body.updated_at = new Date();
		this.model.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (error, data) => res.json(this.queryCallback(error, data)));
	}

	public deleteById(req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction): void {
		this.model.remove({ _id: req.params.id }, (error, data?) => res.json(this.queryCallback(error, {_id: req.params.id, message: 'Entity deleted.'})));
	}
}