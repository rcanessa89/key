import * as mongoose from 'mongoose';
import ICompany from './ICompany';
import regex from '../../util/regex';

const userSchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	departments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Department'
	}],

	registries: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Registry'
	}],

	assets: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Asset'
	}],

	created_at: {
		type: Date,
		default: Date.now
	},

	updated_at: {
		type: Date,
		default: null
	}
});

export default mongoose.model <ICompany> ('Company', userSchema, 'Companies');