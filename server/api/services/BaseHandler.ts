import * as express from 'express';
import { ParsedAsJson } from 'body-parser';
import * as session from 'express-session';
import * as mongoose from 'mongoose';
import saveBase64 from '../util/saveBase64';

export default class BaseHandler {
	constructor(schemaModel: mongoose.Model<mongoose.Document>) {
		this.model = schemaModel;
		this.get = this.get.bind(this);
		this.getById = this.getById.bind(this);
		this.create = this.create.bind(this);
		this.update = this.update.bind(this);
		this.deleteById = this.deleteById.bind(this);
	}

	private queryCallback(error, data): any {
		let resData = null;

		if (error) {
			resData = error;
		} else {
			resData = data;
		}

		return resData;
	}

	public model: mongoose.Model<mongoose.Document>;

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
		let query = this.model.findById(req.params.id);

		if (req.query.populate) {
			const population = req.query.populate.replace(/,/g, ' ');

			if (req.query.populateSelect) {
				const populationSelect = req.query.populateSelect.replace(/,/g, ' ');

				query = query.populate(population, populationSelect);
			} else {
				query = query.populate(population);
			}
		}

		if (req.query.select) {
			const select = req.query.select.replace(/,/g, ' ');

			query = query.select(select);
		}

		query.exec((error, data)  => res.json(this.queryCallback(error, data)));
	}

	public create(req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction): void {
		const newEntity = new this.model(req.body);

		newEntity.save((error, data) => res.json(this.queryCallback(error, data)));
	}

	public update(req: express.Request & ParsedAsJson & session, res: express.Response, next: express.NextFunction): void {
		req.body.updated_at = new Date();

		if (req.body.photo) {
			req.body.photo = saveBase64(req.body.photo.base64, req.body.photo.format);
		}

		let query = this.model.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });

		if (req.originalUrl === '/api/company') {
			query.exec((error, company) => {
				if (error) {
					res.json(error);
				}

				req.session.logged.company.name = company['name'];

				res.json(company);
			});

		} else if (req.originalUrl === '/api/user') {
			query.populate({
				path: 'company',
				select: 'name'
			})
			.exec((error, user) => {
				if (error) {
					return res.json(error);
				}

				req.session.logged = user;

				res.json(req.session.logged);
			});

		} else {
			query.exec((error, data) => res.json(this.queryCallback(error, data)));
		}
	}

	public deleteById(req: express.Request & ParsedAsJson, res: express.Response, next: express.NextFunction): void {
		this.model.remove({ _id: req.params.id }, (error, data?) => res.json(this.queryCallback(error, {_id: req.params.id, message: 'Entity deleted.'})));
	}
}