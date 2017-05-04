import { NextFunction } from 'express';
import * as mongoose from 'mongoose';

export default class PreHook {
	constructor(schema: mongoose.Schema) {
		this.schema = schema;
	}

	public schema: mongoose.Schema;

	setHook(cb): void {
		this.schema.pre('save', function(next) {
			cb(this, next);
		});
	}
}