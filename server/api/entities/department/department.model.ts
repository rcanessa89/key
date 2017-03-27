import * as mongoose from 'mongoose';
import IDepartment from './IDepartment';

const departmentSchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},

	hosts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Host'
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

export default mongoose.model <IDepartment> ('Department', departmentSchema);