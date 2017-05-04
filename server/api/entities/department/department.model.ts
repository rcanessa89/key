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
	}]
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model <IDepartment> ('Department', departmentSchema);