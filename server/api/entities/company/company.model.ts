import * as mongoose from 'mongoose';
import ICompany from './ICompany';
import regex from '../../util/regex';

const companySchema: mongoose.Schema = new mongoose.Schema({
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

	users: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],

	registries: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Registry'
	}],

	assets: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Asset'
	}]
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model <ICompany> ('Company', companySchema, 'Companies');
