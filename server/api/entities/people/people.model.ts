import * as mongoose from 'mongoose';
import IPeople from './IPeople';

const registrySchema: mongoose.Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},

	last_name_1: {
		type: String,
		required: true,
		trim: true
	},

	last_name_2: {
		type: String,
		required: true,
		trim: true
	},

	document_id: {
		type: String,
		requried: true,
		trim: true
	},

	company: {
		type: String,
		trim: true,
	},

	department: {
		type: String,
		required: true,
		trim: true
	},

	host: {
		type: String,
		required: true
	},

	date: {
		type: Date,
		required: true
	},

	check_in: {
		type: Date,
		required: true
	},

	check_out: {
		type: Date,
		required: true
	},

	sign: {
		type: String,
		required: true
	}
}, {
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model <IPeople> ('People', registrySchema, 'People');