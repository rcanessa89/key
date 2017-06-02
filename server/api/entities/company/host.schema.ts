import * as mongoose from 'mongoose';
import regex from '../../util/regex';

export default new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},

	last_name: {
		type: String,
		required: true,
		trim: true
	},

	departmentName: {
		type: String,
		required: true,
		trim: true
	}
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});