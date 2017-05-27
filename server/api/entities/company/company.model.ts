import * as mongoose from 'mongoose';
import ICompany from './ICompany';
import regex from '../../util/regex';
import departmentSchema from './department.schema';

const companySchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	departments: [departmentSchema],

	users: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}],
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model <ICompany> ('Company', companySchema, 'companies');
